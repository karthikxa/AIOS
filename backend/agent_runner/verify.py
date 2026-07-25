"""Post-batch verification — catches partial-batch loss and logs breakdown."""

import logging

logger = logging.getLogger(__name__)


def verify_batch(results: dict, total_submitted: int) -> bool:
    """Verify batch results. Returns True if all agents completed.

    Logs exact missing agent_ids if any are lost.
    """
    result_list = results.get("results", [])
    summary = results.get("summary", {})

    logger.info("=" * 60)
    logger.info("BATCH VERIFICATION REPORT")
    logger.info("=" * 60)
    logger.info("Total submitted:  %d", total_submitted)
    logger.info("Total returned:   %d", len(result_list))
    logger.info("Success:          %d", summary.get("success", 0))
    logger.info("Errors:           %d", summary.get("errors", 0))
    logger.info("Timeouts:         %d", summary.get("timeouts", 0))
    logger.info("Elapsed:          %.1fs", summary.get("elapsed_seconds", 0))
    logger.info("Agents/sec:       %.2f", summary.get("agents_per_second", 0))

    # Check completeness
    if len(result_list) != total_submitted:
        logger.error("PARTIAL BATCH LOSS: expected %d, got %d", total_submitted, len(result_list))
        missing_ids = [r.get("id") for r in result_list if r.get("status") == "missing"]
        logger.error("Missing agent_ids: %s", missing_ids)
        return False

    # Categorize errors
    for r in result_list:
        if r.get("status") == "error":
            error = r.get("error", "")
            aid = r.get("id", "?")
            attempts = r.get("attempts", 0)
            if error == "timeout":
                logger.warning("  Agent %d: TIMEOUT after %d attempts", aid, attempts)
            elif "429" in error:
                logger.warning("  Agent %d: RATE LIMITED after %d attempts", aid, attempts)
            elif "5" in error[:3]:
                logger.warning("  Agent %d: SERVER ERROR after %d attempts", aid, attempts)
            else:
                logger.error("  Agent %d: FAILED (%s) after %d attempts", aid, error[:100], attempts)

    logger.info("=" * 60)
    return len(result_list) == total_submitted
