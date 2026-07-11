"""Swarm orchestration patterns powered by delegate_task sub-agent spawning.

All 10 patterns use the native sub-agent system (up to 250 concurrent workers)
instead of the external swarms library. Each worker runs as a full AIAgent with
all tools, spawned via delegate_task internally.
"""

import json
import logging
import re
import time
from typing import Any, Dict, List, Optional, Tuple

from tools.registry import registry, tool_error

logger = logging.getLogger(__name__)

# Module-level stagger delay set by swarm_router_task before calling handlers.
# Read by _run_tasks to avoid hammering API rate limits with concurrent workers.
_spawn_delay_ms: int = 0


def _set_spawn_delay(ms: int) -> None:
    global _spawn_delay_ms
    _spawn_delay_ms = ms


def _get_spawn_delay() -> int:
    return _spawn_delay_ms


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _build_worker_goal(
    worker_name: str,
    system_prompt: str,
    task: str,
    previous_output: Optional[str] = None,
    extra_context: Optional[str] = None,
) -> str:
    """Build a goal string for a sub-agent worker with context."""
    parts = [
        f"## Your Role: {worker_name}",
        system_prompt,
        "",
        f"## Task",
        task,
    ]
    if extra_context:
        parts.extend(["", "## Context", extra_context])
    if previous_output:
        parts.extend(["", "## Previous Stage Output (use as input)", previous_output])
    parts.extend([
        "",
        "Complete this task from your assigned role. Provide a thorough, well-structured response "
        "with your findings, analysis, and any output you produced.",
    ])
    return "\n".join(parts)


def _detect_document_workload(task: str) -> Optional[Dict[str, Any]]:
    """Detect if task is about processing a document, returns slice info or None."""
    q = task.lower()
    total_pages = None
    page_patterns = [
        (r"(\d+)\s*pages?", lambda m: int(m.group(1))),
        (r"(\d+)-page", lambda m: int(m.group(1))),
        (r"(\d+)\s*page\s*(document|report|file|pdf)", lambda m: int(m.group(1))),
    ]
    for pattern, extractor in page_patterns:
        match = re.search(pattern, q)
        if match:
            total_pages = extractor(match)
            break

    is_document = any(w in q for w in [
        "document", "report", "pdf", "file", "chapter", "section",
        "manual", "specification", "spec", "analysis", "research paper",
        "thesis", "book", "handbook", "guideline",
    ])

    if not is_document and total_pages is None:
        return None

    return {
        "total_pages": total_pages,
        "is_document": is_document,
        "document_keywords": [w for w in ["document", "report", "pdf", "file", "chapter",
                              "section", "manual", "specification", "spec",
                              "analysis", "research paper", "thesis", "book"]
                              if w in q],
    }


def _split_work_for_workers(workers: List[Dict[str, str]], task: str) -> List[Dict[str, str]]:
    """Assign page/section slices to each worker when processing a large document."""
    doc_info = _detect_document_workload(task)
    if not doc_info or not workers:
        return workers

    count = len(workers)
    total_pages = doc_info.get("total_pages")

    if total_pages and count > 1:
        pages_per_worker = max(1, total_pages // count)
        remainder = total_pages % count
        start = 1
        for i, w in enumerate(workers):
            extra = 1 if i < remainder else 0
            end = start + pages_per_worker + extra - 1
            w["system_prompt"] += (
                f"\n\n## Assigned Workload\n"
                f"You are assigned pages {start}-{end} of {total_pages} total pages. "
                f"Focus your complete analysis on ONLY these pages. "
                f"At the end of your response, briefly note if any of your assigned "
                f"pages were out of scope."
            )
            start = end + 1
    else:
        for i, w in enumerate(workers):
            w["system_prompt"] += (
                f"\n\n## Assigned Workload\n"
                f"You are worker {i+1} of {count}. Focus on your assigned portion "
                f"of this document/task to ensure full coverage."
            )

    return workers


def _run_tasks(tasks: List[Dict[str, Any]], parent_agent,
               spawn_delay_ms: Optional[int] = None) -> dict:
    """Run sub-agent tasks via delegate_task, auto-batching if needed. Returns merged results.
    
    When spawn_delay_ms > 0, tasks are submitted with staggered delays to avoid 
    hammering API rate limits. Each task runs as a full parallel sub-agent once 
    spawned — the delay only staggers the START time.
    Falls back to the module-level _spawn_delay_ms when not provided.
    """
    from tools.delegate_tool import delegate_task, _get_max_concurrent_children

    if spawn_delay_ms is None:
        spawn_delay_ms = _get_spawn_delay()

    max_children = _get_max_concurrent_children()

    if spawn_delay_ms > 0 and len(tasks) > 1:
        # Staggered: submit one-by-one to spread rate-limit load
        all_results = []
        for i, single_task in enumerate(tasks):
            if i > 0 and spawn_delay_ms > 0:
                time.sleep(spawn_delay_ms / 1000.0)
            result_str = delegate_task(tasks=[single_task], parent_agent=parent_agent)
            try:
                result = json.loads(result_str)
            except (json.JSONDecodeError, TypeError):
                return {"error": f"Task {i} failed: {result_str[:200]}"}
            if isinstance(result, dict) and "error" in result:
                return {"error": f"Task {i}: {result['error']}"}
            batch_results = result.get("results", [])
            all_results.extend(batch_results)

        return {
            "status": "ok",
            "results": all_results,
            "staggered": True,
            "spawn_delay_ms": spawn_delay_ms,
        }

    if len(tasks) <= max_children:
        result_str = delegate_task(tasks=tasks, parent_agent=parent_agent)
        try:
            result = json.loads(result_str)
        except (json.JSONDecodeError, TypeError):
            return {"error": f"Failed to parse delegate_task result: {result_str[:200]}"}
        if isinstance(result, dict) and "error" in result:
            return {"error": result["error"]}
        return result

    # Batch into max_children-sized chunks and merge
    all_results = []
    for i in range(0, len(tasks), max_children):
        batch = tasks[i : i + max_children]
        result_str = delegate_task(tasks=batch, parent_agent=parent_agent)
        try:
            result = json.loads(result_str)
        except (json.JSONDecodeError, TypeError):
            return {"error": f"Batch {i // max_children} failed: {result_str[:200]}"}
        if isinstance(result, dict) and "error" in result:
            return {"error": f"Batch {i // max_children}: {result['error']}"}
        batch_results = result.get("results", [])
        all_results.extend(batch_results)
        if i + max_children < len(tasks) and spawn_delay_ms > 0:
            time.sleep(spawn_delay_ms / 1000.0)

    return {"status": "ok", "results": all_results, "batched": True, "batches": (len(tasks) + max_children - 1) // max_children}


def _parse_workers(
    workers: Optional[List[Dict[str, Any]]] = None,
    defaults: Optional[List[tuple]] = None,
) -> List[Dict[str, str]]:
    """Parse worker definitions with fallback defaults."""
    if workers:
        return [
            {
                "name": w.get("name", f"worker-{i}"),
                "system_prompt": w.get("system_prompt", "You are a helpful AI assistant."),
            }
            for i, w in enumerate(workers)
        ]
    if defaults:
        return [{"name": name, "system_prompt": prompt} for name, prompt in defaults]
    return [{"name": "worker", "system_prompt": "You are a helpful AI assistant."}]


# ===================================================================
# Swarm Pattern 1: ConcurrentWorkflow
# ===================================================================

def concurrent_swarm(task: str, workers: Optional[List[Dict]] = None,
                     max_loops: int = 1, parent_agent=None) -> str:
    """Run agents in parallel on the same task, aggregate all results."""
    if not parent_agent:
        return tool_error("concurrent_swarm requires parent_agent context.")

    worker_list = _parse_workers(workers, [
        ("worker-1", "You are worker 1. Analyze the task from a technical/analytical perspective."),
        ("worker-2", "You are worker 2. Analyze the task from a creative/innovative perspective."),
        ("worker-3", "You are worker 3. Analyze the task from a practical/action-oriented perspective."),
    ])

    effective_loops = max(1, min(max_loops, 5))
    current_context = task

    for loop in range(effective_loops):
        task_list = [
            {
                "goal": _build_worker_goal(w["name"], w["system_prompt"], task)
                + (f"\n\n## Previous Round Synthesis\n{current_context[:3000]}" if loop > 0 else "")
            }
            for w in worker_list
        ]
        result = _run_tasks(task_list, parent_agent)
        if "error" in result:
            return json.dumps({"error": result["error"], "type": "ConcurrentWorkflow", "loop": loop})

        summaries = [r.get("summary", "") for r in result.get("results", [])]
        combined = "\n\n---\n\n".join(
            f"[{w['name']}]\n{s}" for w, s in zip(worker_list, summaries) if s
        )
        current_context = combined

    return json.dumps({
        "status": "ok",
        "result": current_context,
        "worker_count": len(worker_list),
        "loops": effective_loops,
        "type": "ConcurrentWorkflow",
    })


# ===================================================================
# Swarm Pattern 2: SequentialWorkflow
# ===================================================================

def sequential_swarm(task: str, workers: Optional[List[Dict]] = None,
                     max_loops: int = 1, parent_agent=None) -> str:
    """Chain agents linearly where each agent's output feeds into the next."""
    if not parent_agent:
        return tool_error("sequential_swarm requires parent_agent context.")

    worker_list = _parse_workers(workers, [
        ("researcher", "You research the given topic. Provide comprehensive findings."),
        ("writer", "You take research findings and write polished, engaging content."),
        ("editor", "You review content for quality, accuracy, and clarity. Provide a clean final version."),
    ])

    effective_loops = max(1, min(max_loops, 5))
    final_output = ""

    for loop in range(effective_loops):
        previous_output = final_output if loop > 0 else None
        for w in worker_list:
            goal = _build_worker_goal(
                w["name"], w["system_prompt"], task,
                previous_output=previous_output,
            )
            if loop > 0:
                goal += f"\n\n## Iteration {loop + 1}/{effective_loops} — Refine based on previous run."
            result = _run_tasks([{"goal": goal}], parent_agent)
            if "error" in result:
                return json.dumps({"error": result["error"], "type": "SequentialWorkflow"})

            summaries = [r.get("summary", "") for r in result.get("results", [])]
            previous_output = summaries[0] if summaries else "(no output)"
        final_output = previous_output

    return json.dumps({
        "status": "ok",
        "result": final_output or "",
        "worker_count": len(worker_list),
        "loops": effective_loops,
        "type": "SequentialWorkflow",
    })


# ===================================================================
# Swarm Pattern 3: HierarchicalSwarm
# ===================================================================

def hierarchical_swarm(task: str, workers: Optional[List[Dict]] = None,
                       max_loops: int = 1, parent_agent=None) -> str:
    """Director sub-agent plans, delegates to workers, synthesizes results."""
    if not parent_agent:
        return tool_error("hierarchical_swarm requires parent_agent context.")

    worker_list = _parse_workers(workers, [
        ("researcher", "Research specialist. Gather and analyze information thoroughly."),
        ("analyst", "Analysis specialist. Break down complex data into actionable insights."),
        ("writer", "Writing specialist. Produce clear, polished output from analysis."),
    ])

    effective_loops = max(1, min(max_loops, 5))
    worker_names = ", ".join(w["name"] for w in worker_list)
    previous_result = ""

    for loop in range(effective_loops):
        # Step 1: Director plans (or refines)
        if loop == 0:
            plan_goal = (
                f"## Role: Director/Planner\n"
                f"You are the director of a hierarchical swarm. Your job is to analyze this task "
                f"and create a detailed work plan. Break it down into subtasks and specify what "
                f"each worker should focus on.\n\n"
                f"## Task\n{task}\n\n"
                f"Available workers: {worker_names}\n\n"
                f"Produce a work plan with specific assignments for each worker."
            )
        else:
            plan_goal = (
                f"## Role: Director/Planner (Iteration {loop + 1}/{effective_loops})\n"
                f"Review the previous synthesis and create a refined work plan addressing gaps.\n\n"
                f"## Task\n{task}\n\n"
                f"## Previous Synthesis\n{previous_result[:3000]}\n\n"
                f"Available workers: {worker_names}\n\n"
                f"Produce a refined work plan."
            )
        plan_result = _run_tasks([{"goal": plan_goal}], parent_agent)
        if "error" in plan_result:
            return json.dumps({"error": plan_result["error"], "type": "HierarchicalSwarm"})

        plan = plan_result.get("results", [{}])[0].get("summary", "")

        # Step 2: Workers run in parallel with the director's plan
        worker_tasks = [
            {
                "goal": _build_worker_goal(w["name"], w["system_prompt"], task),
                "context": f"Director's plan:\n{plan[:2000]}",
            }
            for w in worker_list
        ]
        worker_results = _run_tasks(worker_tasks, parent_agent)
        if "error" in worker_results:
            return json.dumps({"error": worker_results["error"], "type": "HierarchicalSwarm"})

        worker_summaries = "\n\n".join(
            f"[{w['name']}]\n{r.get('summary', '(no output)')}"
            for w, r in zip(worker_list, worker_results.get("results", []))
        )

        # Step 3: Synthesizer
        synth_goal = (
            f"## Role: Synthesizer\n"
            f"Combine all worker outputs into a cohesive final response.\n\n"
            f"## Original Task\n{task}\n\n"
            f"## Director's Plan\n{plan[:1000]}\n\n"
            f"## Worker Outputs\n{worker_summaries[:5000]}"
        )
        synth_result = _run_tasks([{"goal": synth_goal}], parent_agent)

        if "error" in synth_result:
            previous_result = worker_summaries
        else:
            previous_result = synth_result.get("results", [{}])[0].get("summary", worker_summaries)

    return json.dumps({
        "status": "ok",
        "result": previous_result,
        "plan": plan[:500] if plan else "",
        "worker_count": len(worker_list),
        "loops": effective_loops,
        "type": "HierarchicalSwarm",
    })


# ===================================================================
# Swarm Pattern 4: AgentRearrange
# ===================================================================

def agent_rearrange_swarm(task: str, workers: Optional[List[Dict]] = None,
                          flow: Optional[str] = None, parent_agent=None) -> str:
    """Custom flow between agents via DSL (e.g., 'researcher -> analyst, writer')."""
    if not parent_agent:
        return tool_error("agent_rearrange_swarm requires parent_agent context.")

    worker_list = _parse_workers(workers, [
        ("researcher", "Research specialist. Gather information on the given topic."),
        ("analyst", "Analysis specialist. Analyze and interpret data."),
        ("writer", "Writing specialist. Produce polished final content."),
    ])

    flow_str = flow or "researcher -> analyst -> writer"
    agent_map = {w["name"]: w for w in worker_list}

    # Parse flow DSL: "a -> b, c" (split by ->, each step may have comma-separated agents)
    steps = [s.strip() for s in flow_str.replace("\n", "").split("->")]
    outputs: Dict[str, str] = {}

    for step in steps:
        agents_in_step = [a.strip() for a in step.split(",")]
        step_tasks = []
        for agent_name in agents_in_step:
            w = agent_map.get(agent_name)
            if not w:
                continue
            context = "\n".join(
                f"[{k}]\n{v}" for k, v in outputs.items()
            ) if outputs else ""
            goal = _build_worker_goal(w["name"], w["system_prompt"], task)
            if context:
                goal += f"\n\n## Context from Previous Steps\n{context[:3000]}"
            step_tasks.append({"goal": goal})

        if step_tasks:
            result = _run_tasks(step_tasks, parent_agent)
            if "error" in result:
                return json.dumps({"error": result["error"], "type": "AgentRearrange"})
            for r, agent_name in zip(result.get("results", []), agents_in_step):
                if agent_name in agent_map:
                    outputs[agent_name] = r.get("summary", "")

    return json.dumps({
        "status": "ok",
        "result": "\n\n".join(f"[{k}]\n{v}" for k, v in outputs.items()),
        "flow": flow_str,
        "worker_count": len(worker_list),
        "type": "AgentRearrange",
    })


# ===================================================================
# Swarm Pattern 5: GraphWorkflow
# ===================================================================

def graph_swarm(task: str, workers: Optional[List[Dict]] = None,
                parent_agent=None) -> str:
    """Orchestrate agents as nodes in a directed acyclic graph with fan-out/fan-in."""
    if not parent_agent:
        return tool_error("graph_swarm requires parent_agent context.")

    worker_list = _parse_workers(workers, [
        ("researcher", "Research the topic. Produce key findings with data and sources."),
        ("analyst", "Analyze the research data for patterns, trends, and insights."),
        ("writer", "Write clear, engaging content from the analysis."),
        ("reviewer", "Review the content for accuracy, clarity, and completeness."),
    ])

    # Build a simple chain DAG: each step runs after the previous completes
    outputs: Dict[str, str] = {}

    for w in worker_list:
        context_parts = [f"[{k}]\n{v}" for k, v in outputs.items()]
        context = "\n\n".join(context_parts) if context_parts else None
        goal = _build_worker_goal(w["name"], w["system_prompt"], task)
        if context:
            goal += f"\n\n## Context from Upstream Nodes\n{context[:4000]}"

        result = _run_tasks([{"goal": goal}], parent_agent)
        if "error" in result:
            return json.dumps({"error": result["error"], "type": "GraphWorkflow"})

        summaries = [r.get("summary", "") for r in result.get("results", [])]
        outputs[w["name"]] = summaries[0] if summaries else ""

    return json.dumps({
        "status": "ok",
        "result": "\n\n".join(f"[{k}]\n{v}" for k, v in outputs.items()),
        "worker_count": len(worker_list),
        "type": "GraphWorkflow",
    })


# ===================================================================
# Swarm Pattern 6: MixtureOfAgents
# ===================================================================

def mixture_of_agents_swarm(task: str, workers: Optional[List[Dict]] = None,
                            layers: int = 3, parent_agent=None) -> str:
    """Multiple experts in parallel with layered aggregation."""
    if not parent_agent:
        return tool_error("mixture_of_agents_swarm requires parent_agent context.")

    worker_list = _parse_workers(workers, [
        ("expert-1", "Expert in critical analysis and logical reasoning. Provide rigorous, well-reasoned analysis."),
        ("expert-2", "Expert in creative and innovative solutions. Think outside the box and propose novel approaches."),
        ("expert-3", "Expert in practical and actionable recommendations. Focus on what works and how to implement it."),
    ])

    current_context = task
    effective_layers = min(layers, 5)

    for layer in range(effective_layers):
        # Run all experts in parallel
        expert_tasks = [
            {
                "goal": (
                    _build_worker_goal(w["name"], w["system_prompt"], task)
                    + f"\n\n## Current Aggregate Analysis\n{current_context[:3000]}"
                )
            }
            for w in worker_list
        ]
        result = _run_tasks(expert_tasks, parent_agent)
        if "error" in result:
            return json.dumps({"error": result["error"], "type": "MixtureOfAgents"})

        expert_outputs = "\n\n".join(
            f"[{w['name']}]\n{r.get('summary', '(no output)')}"
            for w, r in zip(worker_list, result.get("results", []))
        )

        # Aggregator: synthesize all expert outputs for the next layer
        if layer < effective_layers - 1:
            agg_goal = (
                f"## Role: Aggregator (Layer {layer + 1}/{effective_layers})\n"
                f"Synthesize the expert perspectives below into a refined analysis. "
                f"Identify consensus, note disagreements, and integrate insights.\n\n"
                f"## Task\n{task}\n\n"
                f"## Expert Outputs\n{expert_outputs[:4000]}"
            )
            agg_result = _run_tasks([{"goal": agg_goal}], parent_agent)
            if "error" not in agg_result:
                summaries = [r.get("summary", "") for r in agg_result.get("results", [])]
                current_context = summaries[0] if summaries else expert_outputs
            else:
                current_context = expert_outputs
        else:
            current_context = expert_outputs

    return json.dumps({
        "status": "ok",
        "result": current_context,
        "worker_count": len(worker_list),
        "layers": effective_layers,
        "type": "MixtureOfAgents",
    })


# ===================================================================
# Swarm Pattern 7: GroupChat
# ===================================================================

def group_chat_swarm(task: str, workers: Optional[List[Dict]] = None,
                     max_loops: int = 10, parent_agent=None) -> str:
    """Simulate a group conversation where agents take turns responding."""
    if not parent_agent:
        return tool_error("group_chat_swarm requires parent_agent context.")

    worker_list = _parse_workers(workers, [
        ("optimist", "You are an optimistic thinker. Highlight opportunities, benefits, and positive angles."),
        ("critic", "You are a critical thinker. Identify risks, flaws, downsides, and areas for improvement."),
        ("mediator", "You are a mediator. Find common ground, synthesize perspectives, and propose balanced solutions."),
    ])

    conversation = f"## Topic\n{task}\n\n## Discussion\n"
    total_turns = min(max_loops, 20)

    for turn in range(total_turns):
        speaker = worker_list[turn % len(worker_list)]
        goal = (
            f"## Role: {speaker['name']}\n{speaker['system_prompt']}\n\n"
            f"## Conversation So Far\n{conversation}\n\n"
            f"Add your perspective to this discussion. Respond directly to what others have said. "
            f"Keep your response concise (2-3 paragraphs max)."
        )
        result = _run_tasks([{"goal": goal}], parent_agent)
        if "error" in result:
            break

        summaries = [r.get("summary", "") for r in result.get("results", [])]
        reply = summaries[0] if summaries else ""
        if reply:
            conversation += f"\n[{speaker['name']}]:\n{reply}\n"

    return json.dumps({
        "status": "ok",
        "result": conversation,
        "worker_count": len(worker_list),
        "turns": total_turns,
        "type": "GroupChat",
    })


# ===================================================================
# Swarm Pattern 8: HeavySwarm (5-Phase Workflow)
# ===================================================================

def heavy_swarm_task(task: str, variant: str = "default", parent_agent=None, workers=None) -> str:
    """5-phase workflow: Research, Analysis, Alternatives, Verification, Synthesis."""
    if not parent_agent:
        return tool_error("heavy_swarm requires parent_agent context.")

    phases = {
        "research": {
            "name": "Phase 1: Research",
            "prompt": "You are a research specialist. Gather comprehensive information about this topic. "
                       "Find key facts, data points, sources, and relevant context.",
        },
        "analysis": {
            "name": "Phase 2: Analysis",
            "prompt": "You are an analyst. Break down the research findings, identify patterns, "
                       "and derive meaningful insights and conclusions.",
        },
        "alternatives": {
            "name": "Phase 3: Alternatives",
            "prompt": "You are a strategist. Based on the analysis, generate multiple alternative "
                       "approaches, solutions, or perspectives. Weigh pros and cons.",
        },
        "verification": {
            "name": "Phase 4: Verification",
            "prompt": "You are a verifier. Review all previous work for accuracy, completeness, "
                       "and logical consistency. Flag any issues or gaps.",
        },
        "synthesis": {
            "name": "Phase 5: Synthesis",
            "prompt": "You are a synthesizer. Combine all prior phases into a comprehensive, "
                       "well-structured final report with clear findings and recommendations.",
        },
    }

    if variant == "medium":
        selected_phases = {k: phases[k] for k in ["research", "alternatives", "synthesis"]}
    else:
        selected_phases = phases

    previous_output = ""
    phase_results: Dict[str, str] = {}

    for phase_key, phase_info in selected_phases.items():
        goal = (
            f"## Role: {phase_info['name']}\n{phase_info['prompt']}\n\n"
            f"## Task\n{task}\n"
        )
        if previous_output:
            goal += f"\n## Previous Phase Output\n{previous_output[:5000]}"

        result = _run_tasks([{"goal": goal}], parent_agent)
        if "error" in result:
            phase_results[phase_key] = f"ERROR: {result['error']}"
            previous_output += f"\n\n[{phase_info['name']} FAILED: {result['error']}]"
        else:
            summaries = [r.get("summary", "") for r in result.get("results", [])]
            phase_output = summaries[0] if summaries else ""
            phase_results[phase_key] = phase_output
            previous_output = phase_output

    return json.dumps({
        "status": "ok",
        "result": phase_results.get("synthesis",
                   phase_results.get("alternatives",
                       phase_results.get("analysis",
                           phase_results.get("research", previous_output)))),
        "phases": {k: v[:200] for k, v in phase_results.items()},
        "variant": variant,
        "type": "HeavySwarm",
    })


# ===================================================================
# Swarm Pattern 9: ForestSwarm
# ===================================================================

def forest_swarm_task(task: str, workers: Optional[List[Dict]] = None,
                      parent_agent=None) -> str:
    """Multiple hierarchical groups running in parallel, merged into one result."""
    if not parent_agent:
        return tool_error("forest_swarm requires parent_agent context.")

    worker_list = _parse_workers(workers, [
        ("tech-researcher", "Research the technical/engineering aspects of the task."),
        ("tech-analyst", "Analyze technical findings for feasibility and implementation."),
        ("business-researcher", "Research the business/market aspects of the task."),
        ("business-analyst", "Analyze business findings for ROI and strategic value."),
        ("user-researcher", "Research the user experience and human impact aspects."),
        ("user-analyst", "Analyze user impact findings for usability and accessibility."),
    ])

    # Group workers by prefix (everything before the first hyphen)
    groups: Dict[str, List[Dict[str, str]]] = {}
    for w in worker_list:
        prefix = w["name"].rsplit("-", 1)[0] if "-" in w["name"] else w["name"]
        groups.setdefault(prefix, []).append(w)

    group_results: Dict[str, str] = {}

    for group_name, group_workers in groups.items():
        # Each group runs as a mini-concurrent swarm
        group_tasks = [
            {"goal": _build_worker_goal(w["name"], w["system_prompt"], task)}
            for w in group_workers
        ]
        result = _run_tasks(group_tasks, parent_agent)
        if "error" not in result:
            summaries = [r.get("summary", "") for r in result.get("results", [])]
            group_results[group_name] = "\n".join(
                f"[{w['name']}]\n{s}" for w, s in zip(group_workers, summaries) if s
            )

    if not group_results:
        return json.dumps({"error": "All groups failed", "type": "ForestSwarm"})

    # Merge all group outputs into one final result
    merge_goal = (
        f"## Role: Forest Merger\n"
        f"You are the forest-level synthesizer. Merge the outputs from all research groups "
        f"into one cohesive final response that covers all perspectives.\n\n"
        f"## Original Task\n{task}\n\n"
        f"## Group Outputs\n" + "\n\n---\n\n".join(
            f"[{k}]\n{v[:2000]}" for k, v in group_results.items()
        )
    )
    merge_result = _run_tasks([{"goal": merge_goal}], parent_agent)

    if "error" in merge_result:
        final = "\n\n---\n\n".join(f"[{k}]\n{v}" for k, v in group_results.items())
    else:
        summaries = [r.get("summary", "") for r in merge_result.get("results", [])]
        final = summaries[0] if summaries else ""

    return json.dumps({
        "status": "ok",
        "result": final,
        "groups": len(groups),
        "worker_count": len(worker_list),
        "type": "ForestSwarm",
    })


# ===================================================================
# Swarm Pattern 10: SwarmRouter (with auto-detect)
# ===================================================================

def _auto_detect_swarm_type(task: str) -> str:
    """Inline heuristic — picks pattern based on task content. No sub-agent spawned."""
    q = task.lower()

    multi_aspect = any(w in q for w in ["compare", "contrast", "vs ", "versus",
        "multiple aspects", "from all angles", "multi-faceted", "different perspectives"])
    if multi_aspect and len(q) > 80:
        return "ForestSwarm"

    pipeline = any(w in q for w in ["step by step", "first then", "pipeline",
        "sequential", "chain", "process flow", "stages"])
    if pipeline:
        return "SequentialWorkflow"

    deep = any(w in q for w in ["deep research", "comprehensive analysis",
        "thorough investigation", "5-phase", "in-depth study", "detailed report"])
    if deep:
        return "HeavySwarm"

    debate = any(w in q for w in ["opinion", "debate", "discuss", "pros and cons",
        "arguments for", "different viewpoints", "roundtable"])
    if debate:
        return "GroupChat"

    technical = any(w in q for w in ["plan", "architect", "design", "implement",
        "build", "develop", "engineering", "system"])
    if technical:
        return "HierarchicalSwarm"

    if len(q) < 150:
        return "ConcurrentWorkflow"

    return "MixtureOfAgents"


def _auto_worker_count(task: str, swarm_type: str) -> int:
    """Multi-factor complexity analysis. Returns 1-250 based on task structure."""
    q = task.lower()
    length = len(task)

    sentences = task.count(".") + task.count("!") + task.count("?")
    questions = task.count("?")
    newlines = task.count("\n")
    list_items = task.count("\n-") + task.count("\n*") + task.count("\n1.")
    code_blocks = task.count("```") // 2
    urls = task.count("http://") + task.count("https://")
    domain_keywords = sum(
        1 for w in ["technical", "business", "user", "design", "architecture",
                     "security", "performance", "cost", "market", "strategy",
                     "research", "analysis", "development", "testing",
                     "deployment", "compliance", "legal", "ethical", "scale"]
        if w in q
    )
    action_verbs = sum(
        1 for w in ["build", "create", "design", "implement", "develop",
                     "analyze", "research", "compare", "evaluate", "plan",
                     "architect", "migrate", "optimize", "refactor",
                     "integrate", "deploy", "test", "document"]
        if w in q
    )

    score = (
        (sentences * 2)
        + (questions * 4)
        + (newlines * 3)
        + (list_items * 6)
        + (code_blocks * 10)
        + (urls * 3)
        + (domain_keywords * 4)
        + (action_verbs * 3)
        + (length / 80)
    )

    pattern_mult = {
        "ForestSwarm": 1.6,
        "MixtureOfAgents": 1.3,
        "HeavySwarm": 1.0,
        "GroupChat": 0.7,
        "ConcurrentWorkflow": 1.2,
        "SequentialWorkflow": 0.9,
        "HierarchicalSwarm": 1.1,
        "AgentRearrange": 0.8,
        "GraphWorkflow": 1.0,
    }.get(swarm_type, 1.0)

    raw = int(score * pattern_mult)
    if raw < 3:
        return 3
    if raw > 250:
        return 250
    return raw


def _generate_workers(count: int, swarm_type: str, task: str) -> Optional[List[Dict[str, str]]]:
    """Generate N pattern-appropriate workers with tailored prompts."""

    if swarm_type == "HeavySwarm":
        return None  # Fixed 5-phase pipeline — no dynamic workers

    if swarm_type == "ForestSwarm":
        groups = ["tech", "business", "user"]
        area_prompts = {
            "tech": "Analyze from a technical perspective — engineering, architecture, feasibility, performance.",
            "business": "Analyze from a business perspective — market, ROI, strategy, competition, value proposition.",
            "user": "Analyze from a user/human perspective — UX, accessibility, impact, adoption, satisfaction.",
        }
        return [
            {
                "name": f"{groups[i % 3]}-{i // 3 + 1}",
                "system_prompt": (
                    f"You are a {groups[i % 3]} domain analyst.\n"
                    f"{area_prompts[groups[i % 3]]}\n"
                    f"Produce thorough, specific findings for your area."
                ),
            }
            for i in range(count)
        ]

    if swarm_type == "GroupChat":
        personalities = [
            ("optimist", "Optimistic thinker. Highlight opportunities, benefits, and positive angles."),
            ("critic", "Critical thinker. Identify risks, flaws, downsides, and improvement areas."),
            ("mediator", "Mediator. Find common ground, synthesize perspectives, propose balanced solutions."),
            ("expert", "Domain expert. Provide deep factual knowledge, data, and real-world references."),
            ("strategist", "Strategic thinker. Focus on long-term implications and big-picture roadmap."),
        ]
        return [
            {
                "name": f"{personalities[i % 5][0]}" + (f"-{i // 5 + 2}" if i >= 5 else ""),
                "system_prompt": f"## Role: {personalities[i % 5][0].title()}\n{personalities[i % 5][1]}",
            }
            for i in range(count)
        ]

    if swarm_type in ("SequentialWorkflow", "AgentRearrange"):
        stages = [
            ("researcher", "Research the task thoroughly. Gather comprehensive information, data, sources, and context."),
            ("analyst", "Analyze the research findings. Identify patterns, insights, trends, and key conclusions."),
            ("writer", "Create polished, well-structured content from the analysis. Write in a clear professional style."),
            ("reviewer", "Review the output for accuracy, clarity, completeness, and consistency. Flag any issues."),
            ("synthesizer", "Synthesize all work into a coherent final deliverable with executive summary and recommendations."),
        ]
        return [
            {
                "name": f"{stages[i % 5][0]}" + (f"-{i // 5 + 2}" if i >= 5 else ""),
                "system_prompt": f"## Role: {stages[i % 5][0].title()}\n{stages[i % 5][1]}",
            }
            for i in range(count)
        ]

    if swarm_type == "HierarchicalSwarm":
        roles = [
            ("researcher", "Research specialist. Gather data, find sources, and compile comprehensive evidence."),
            ("analyst", "Analysis specialist. Break down complex data into actionable insights and patterns."),
            ("writer", "Writing specialist. Produce clear, polished output with proper structure and tone."),
            ("domain-expert", f"Domain expert knowledgeable about: {task[:150]}. Provide specialized deep expertise."),
            ("strategist", "Strategic advisor. Evaluate trade-offs, risks, and recommend optimal approaches."),
        ]
        return [
            {
                "name": f"{roles[i % 5][0]}" + (f"-{i // 5 + 2}" if i >= 5 else ""),
                "system_prompt": f"## Role: {roles[i % 5][0].replace('-', ' ').title()}\n{roles[i % 5][1]}",
            }
            for i in range(count)
        ]

    if swarm_type == "GraphWorkflow":
        nodes = [
            ("input-researcher", "Research and gather information from all relevant sources."),
            ("data-analyst", "Analyze data and research findings. Extract patterns and insights."),
            ("content-writer", "Write engaging, well-structured content from the analysis."),
            ("quality-reviewer", "Review content for quality, accuracy, and completeness. Verify all claims."),
            ("final-editor", "Edit and polish the final output. Ensure consistency and professional quality."),
        ]
        return [
            {
                "name": f"{nodes[i % 5][0]}" + (f"-{i // 5 + 2}" if i >= 5 else ""),
                "system_prompt": f"## Node: {nodes[i % 5][0].replace('-', ' ').title()}\n{nodes[i % 5][1]}",
            }
            for i in range(count)
        ]

    if swarm_type == "MixtureOfAgents":
        experts = [
            ("critical-analyst", "Expert in critical analysis and logical reasoning. Provide rigorous, evidence-based analysis."),
            ("creative-innovator", "Expert in creative and innovative solutions. Propose novel approaches and think outside the box."),
            ("practical-strategist", "Expert in practical, actionable recommendations. Focus on implementation and real-world feasibility."),
            ("domain-specialist", "Deep domain expert. Provide specialized knowledge, technical depth, and authoritative references."),
            ("ethical-advisor", "Consider ethical implications, risks, compliance, and responsible development practices."),
        ]
        return [
            {
                "name": f"{experts[i % 5][0]}" + (f"-{i // 5 + 2}" if i >= 5 else ""),
                "system_prompt": f"## Expert: {experts[i % 5][0].replace('-', ' ').title()}\n{experts[i % 5][1]}",
            }
            for i in range(count)
        ]

    # ConcurrentWorkflow (default) — diverse perspectives
    perspectives = [
        ("technical", "You specialize in technical/analytical thinking. Evaluate architecture, implementation details, and engineering trade-offs."),
        ("creative", "You specialize in creative/innovative thinking. Generate novel ideas, alternative approaches, and out-of-the-box solutions."),
        ("practical", "You specialize in practical/action-oriented thinking. Focus on feasibility, timelines, and concrete next steps."),
        ("strategic", "You specialize in strategic/long-term thinking. Consider business impact, growth, scalability, and future roadmap."),
        ("customer", "You specialize in customer/user-centric thinking. Prioritize user experience, accessibility, and satisfaction."),
        ("financial", "You specialize in financial/cost-aware thinking. Analyze budget, ROI, resource allocation, and cost optimization."),
        ("quality", "You specialize in quality/detail-oriented thinking. Ensure correctness, robustness, security, and best practices."),
        ("speed", "You specialize in speed/efficiency-focused thinking. Identify quick wins, minimum viable approaches, and rapid delivery."),
    ]
    return [
        {
            "name": f"{perspectives[i % 8][0]}-analyst" + (f"-{i // 8 + 2}" if i >= 8 else ""),
            "system_prompt": f"## Perspective: {perspectives[i % 8][0].title()}\n{perspectives[i % 8][1]}",
        }
        for i in range(count)
    ]


def swarm_router_task(task: str, workers: Optional[List[Dict]] = None,
                      swarm_type: str = "auto", parent_agent=None) -> str:
    """Universal entry point — auto-selects or routes to a specific swarm pattern."""
    if not parent_agent:
        return tool_error("swarm_router requires parent_agent context.")

    type_map = {
        "SequentialWorkflow": sequential_swarm,
        "ConcurrentWorkflow": concurrent_swarm,
        "HierarchicalSwarm": hierarchical_swarm,
        "AgentRearrange": agent_rearrange_swarm,
        "GraphWorkflow": graph_swarm,
        "MixtureOfAgents": mixture_of_agents_swarm,
        "GroupChat": group_chat_swarm,
        "HeavySwarm": heavy_swarm_task,
        "ForestSwarm": forest_swarm_task,
    }

    resolved_type = swarm_type
    if not swarm_type or swarm_type == "auto":
        resolved_type = _auto_detect_swarm_type(task)
        if not workers:
            count = _auto_worker_count(task, resolved_type)
            workers = _generate_workers(count, resolved_type, task)
            workers = _split_work_for_workers(workers, task)

    handler = type_map.get(resolved_type)
    if handler:
        # Calculate stagger delay for rate-limit-aware spawning
        if workers:
            wc = len(workers)
            if wc < 10:
                delay = 0
            elif wc < 50:
                delay = 100
            elif wc < 200:
                delay = 200
            else:
                delay = 300
            # Cap total stagger to 30 seconds
            delay = min(delay, 30000 // wc)
        else:
            delay = 0
        _set_spawn_delay(delay)
        try:
            result_str = handler(task=task, workers=workers, parent_agent=parent_agent)
        finally:
            _set_spawn_delay(0)
        try:
            result = json.loads(result_str)
            result["swarm_type"] = resolved_type
            if workers:
                result["worker_count"] = len(workers)
            doc_info = _detect_document_workload(task)
            if doc_info:
                result["document_workload"] = doc_info
            if delay > 0:
                result["spawn_delay_ms"] = delay
            if resolved_type != swarm_type:
                result["auto_selected"] = True
            return json.dumps(result)
        except (json.JSONDecodeError, TypeError):
            return json.dumps({
                "error": f"Swarm type '{resolved_type}' returned invalid result",
                "swarm_type": resolved_type,
                "type": "SwarmRouter",
            })

    return json.dumps({
        "error": f"Unknown swarm type: '{resolved_type}'. Valid: {', '.join(type_map.keys())}",
        "type": "SwarmRouter",
    })


# ===================================================================
# Schema Definitions
# ===================================================================

def _swarm_schema(name: str, desc: str, extra_props: dict = None) -> dict:
    base = {
        "task": {"type": "string", "description": "The task for the swarm to execute"},
        "workers": {
            "type": "array",
            "description": "Worker configurations (name, system_prompt)",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": "string", "description": "Worker name/identifier"},
                    "system_prompt": {"type": "string", "description": "Worker's role description and instructions"},
                },
            },
        },
    }
    if extra_props:
        base.update(extra_props)
    return {
        "name": name,
        "description": desc[:120],
        "parameters": {"type": "object", "properties": base, "required": ["task"]},
    }


CONCURRENT_SWARM_SCHEMA = _swarm_schema(
    "concurrent_swarm",
    "Run agents in parallel on the same task, aggregate all results",
    {"max_loops": {"type": "integer", "description": "Refinement iterations (1-5, default 1) — each round parallel-aggregates again"}},
)
SEQUENTIAL_SWARM_SCHEMA = _swarm_schema(
    "sequential_swarm",
    "Chain agents linearly where each output feeds into the next",
    {"max_loops": {"type": "integer", "description": "Refinement iterations (1-5, default 1) — each round runs the full chain again"}},
)
HIERARCHICAL_SWARM_SCHEMA = _swarm_schema(
    "hierarchical_swarm",
    "Director plans, delegates to workers, synthesizes results",
    {"max_loops": {"type": "integer", "description": "Refinement iterations (1-5, default 1) — each round re-plans, re-executes, re-synthesizes"}},
)
AGENT_REARRANGE_SCHEMA = _swarm_schema(
    "agent_rearrange_swarm",
    "Custom flow between agents via DSL (e.g., 'researcher -> analyst, writer')",
    {"flow": {"type": "string", "description": "Flow DSL like 'a -> b, c' to define agent pipeline"}},
)
GRAPH_SWARM_SCHEMA = _swarm_schema(
    "graph_swarm",
    "Orchestrate agents as nodes in a directed acyclic graph",
)
MIXTURE_OF_AGENTS_SCHEMA = _swarm_schema(
    "mixture_of_agents_swarm",
    "Multiple experts in parallel with layered aggregation",
    {"layers": {"type": "integer", "description": "Number of aggregation layers (1-5)"}},
)
GROUP_CHAT_SCHEMA = _swarm_schema(
    "group_chat_swarm",
    "Simulate a group conversation with turn-based discussion",
    {"max_loops": {"type": "integer", "description": "Maximum conversation turns"}},
)
HEAVY_SWARM_SCHEMA = {
    "name": "heavy_swarm",
    "description": "5-phase deep analysis: Research, Analysis, Alternatives, Verification, Synthesis",
    "parameters": {
        "type": "object",
        "properties": {
            "task": {"type": "string", "description": "Complex task requiring deep multi-phase analysis"},
            "variant": {
                "type": "string",
                "description": "Variant: 'default' (5 phases), 'medium' (3 phases), 'heavy' (5 phases - same as default)",
            },
        },
        "required": ["task"],
    },
}
FOREST_SWARM_SCHEMA = _swarm_schema(
    "forest_swarm",
    "Multiple hierarchical groups running in parallel, merged into one result",
)
SWARM_ROUTER_SCHEMA = _swarm_schema(
    "swarm_router",
    "Universal entry point — auto-selects or routes to a specific swarm pattern",
    {
        "swarm_type": {
            "type": "string",
            "description": ("One of: auto (default), SequentialWorkflow, ConcurrentWorkflow, "
                            "HierarchicalSwarm, AgentRearrange, GraphWorkflow, "
                            "MixtureOfAgents, GroupChat, HeavySwarm, ForestSwarm. "
                            "Use 'auto' to let the system choose based on task analysis."),
        }
    },
)


# ===================================================================
# Registry Registration
# ===================================================================

registry.register(
    name="concurrent_swarm",
    toolset="swarm",
    schema=CONCURRENT_SWARM_SCHEMA,
    handler=lambda a, **kw: concurrent_swarm(
        a.get("task", ""), a.get("workers"), a.get("max_loops", 1),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F41D",
)

registry.register(
    name="sequential_swarm",
    toolset="swarm",
    schema=SEQUENTIAL_SWARM_SCHEMA,
    handler=lambda a, **kw: sequential_swarm(
        a.get("task", ""), a.get("workers"), a.get("max_loops", 1),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F503",
)

registry.register(
    name="hierarchical_swarm",
    toolset="swarm",
    schema=HIERARCHICAL_SWARM_SCHEMA,
    handler=lambda a, **kw: hierarchical_swarm(
        a.get("task", ""), a.get("workers"), a.get("max_loops", 1),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F30A",
)

registry.register(
    name="agent_rearrange_swarm",
    toolset="swarm",
    schema=AGENT_REARRANGE_SCHEMA,
    handler=lambda a, **kw: agent_rearrange_swarm(
        a.get("task", ""), a.get("workers"), a.get("flow"),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F504",
)

registry.register(
    name="graph_swarm",
    toolset="swarm",
    schema=GRAPH_SWARM_SCHEMA,
    handler=lambda a, **kw: graph_swarm(
        a.get("task", ""), a.get("workers"),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F3AF",
)

registry.register(
    name="mixture_of_agents_swarm",
    toolset="swarm",
    schema=MIXTURE_OF_AGENTS_SCHEMA,
    handler=lambda a, **kw: mixture_of_agents_swarm(
        a.get("task", ""), a.get("workers"), a.get("layers", 3),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F52C",
)

registry.register(
    name="group_chat_swarm",
    toolset="swarm",
    schema=GROUP_CHAT_SCHEMA,
    handler=lambda a, **kw: group_chat_swarm(
        a.get("task", ""), a.get("workers"), a.get("max_loops", 10),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F4AC",
)

registry.register(
    name="heavy_swarm",
    toolset="swarm",
    schema=HEAVY_SWARM_SCHEMA,
    handler=lambda a, **kw: heavy_swarm_task(
        a.get("task", ""), a.get("variant", "default"),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F525",
)

registry.register(
    name="forest_swarm",
    toolset="swarm",
    schema=FOREST_SWARM_SCHEMA,
    handler=lambda a, **kw: forest_swarm_task(
        a.get("task", ""), a.get("workers"),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F332",
)

registry.register(
    name="swarm_router",
    toolset="swarm",
    schema=SWARM_ROUTER_SCHEMA,
    handler=lambda a, **kw: swarm_router_task(
        a.get("task", ""), a.get("workers"), a.get("swarm_type", "auto"),
        parent_agent=kw.get("parent_agent"),
    ),
    emoji="\U0001F6E0",
)
