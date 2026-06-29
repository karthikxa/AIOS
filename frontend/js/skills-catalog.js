// Real skills catalog — each skill defines actual capabilities, tools, and execution logic

export const SKILLS_CATALOG = [
  {
    id: 'web-research',
    name: 'Web Research',
    desc: 'Search the web, extract content from pages, and compile findings into structured summaries.',
    category: 'Research',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    tools: ['web_search', 'web_extract', 'memory_save'],
    toolCount: 3,
    systemPrompt: `When this skill is active, you have web research capabilities:
- Use web_search to find relevant information on any topic
- Use web_extract to pull full content from specific URLs
- Synthesize findings into clear, structured summaries
- Always cite your sources with URLs
- Cross-reference multiple sources for accuracy`,
    steps: [
      'Receive research query from user',
      'Use web_search to find relevant sources',
      'Use web_extract on top results for detailed content',
      'Analyze and cross-reference findings',
      'Compile structured summary with citations',
      'Save key findings to memory via memory_save'
    ],
    examples: [
      'Research the latest trends in AI agent frameworks',
      'Find pricing information for cloud GPU providers',
      'Compare features of different vector databases'
    ]
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    desc: 'Analyze competitors by researching their products, pricing, strengths, and weaknesses.',
    category: 'Research',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    tools: ['web_search', 'web_extract', 'write_file', 'memory_save'],
    toolCount: 4,
    systemPrompt: `When this skill is active, you perform competitor analysis:
- Research target companies using web search
- Extract product pages, pricing, and documentation
- Compare features, pricing tiers, and target audiences
- Identify strengths, weaknesses, opportunities, and threats
- Generate structured competitive analysis reports
- Save insights to memory for future reference`,
    steps: [
      'Identify competitor companies from user input',
      'Research each competitor via web search',
      'Extract product pages, pricing, and features',
      'Build comparison matrix',
      'Analyze strengths and weaknesses',
      'Write structured report via write_file',
      'Save key insights to memory'
    ],
    examples: [
      'Compare Notion vs Obsidian vs Logseq for note-taking',
      'Analyze top 5 AI coding assistants',
      'Compare cloud hosting providers for a startup'
    ]
  },
  {
    id: 'data-collection',
    name: 'Data Collection',
    desc: 'Gather structured data from web sources and organize it into CSV, JSON, or tables.',
    category: 'Automation',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
    tools: ['web_search', 'web_extract', 'write_file', 'execute_code'],
    toolCount: 4,
    systemPrompt: `When this skill is active, you collect and structure data:
- Search for data sources on the target topic
- Extract data from web pages and APIs
- Clean and normalize the data
- Write structured output as CSV, JSON, or formatted tables
- Use execute_code for data processing when needed
- Validate data quality before output`,
    steps: [
      'Understand data requirements from user',
      'Identify and search for data sources',
      'Extract raw data from web pages/APIs',
      'Clean and normalize data using execute_code',
      'Structure into target format (CSV/JSON/table)',
      'Write output file via write_file',
      'Validate completeness and accuracy'
    ],
    examples: [
      'Collect a list of top 100 GitHub repositories by stars',
      'Gather pricing data from 20 SaaS companies',
      'Extract job listings from a job board for analysis'
    ]
  },
  {
    id: 'report-generator',
    name: 'Report Generator',
    desc: 'Generate professional reports with analysis, charts, and actionable recommendations.',
    category: 'Content',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    tools: ['write_file', 'execute_code', 'memory_save'],
    toolCount: 3,
    systemPrompt: `When this skill is active, you generate professional reports:
- Structure reports with executive summary, findings, analysis, and recommendations
- Use clear headings and formatting
- Include data visualizations descriptions where applicable
- Write actionable recommendations based on findings
- Save report to file and key points to memory`,
    steps: [
      'Understand report scope and audience from user',
      'Gather relevant data and context',
      'Structure report outline',
      'Write executive summary',
      'Write detailed findings and analysis',
      'Generate actionable recommendations',
      'Save report via write_file',
      'Save key takeaways to memory'
    ],
    examples: [
      'Generate a weekly market analysis report',
      'Create a technical architecture review document',
      'Write a project status report with metrics'
    ]
  },
  {
    id: 'email-drafter',
    name: 'Email Drafter',
    desc: 'Draft professional emails, follow-ups, and outreach messages with appropriate tone.',
    category: 'Communication',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    tools: ['memory_save'],
    toolCount: 1,
    systemPrompt: `When this skill is active, you draft professional emails:
- Match tone to context (formal, casual, persuasive)
- Structure with clear subject, body, and call-to-action
- Keep concise and actionable
- Include relevant context without overwhelming
- Suggest subject lines and follow-up timing`,
    steps: [
      'Understand email purpose and audience from user',
      'Check memory for relevant context about recipient',
      'Draft subject line options',
      'Write email body with appropriate tone',
      'Include clear call-to-action',
      'Suggest follow-up timing if applicable'
    ],
    examples: [
      'Draft a cold outreach email to a potential investor',
      'Write a follow-up email after a meeting',
      'Draft a professional apology email to a client'
    ]
  },
  {
    id: 'code-analyzer',
    name: 'Code Analyzer',
    desc: 'Analyze code for bugs, security issues, performance problems, and style violations.',
    category: 'Development',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    tools: ['read_file', 'search_files', 'execute_code', 'memory_save'],
    toolCount: 4,
    systemPrompt: `When this skill is active, you analyze code professionally:
- Identify bugs, logic errors, and edge cases
- Check for security vulnerabilities (injection, XSS, etc.)
- Find performance bottlenecks and optimization opportunities
- Review code style and best practices
- Suggest specific fixes with code examples
- Prioritize issues by severity`,
    steps: [
      'Read the target code files',
      'Scan for common bug patterns and anti-patterns',
      'Check for security vulnerabilities',
      'Analyze performance implications',
      'Review code style and conventions',
      'Prioritize findings by severity',
      'Write detailed analysis with fix suggestions',
      'Save key findings to memory'
    ],
    examples: [
      'Analyze a Python API endpoint for security issues',
      'Review a React component for performance problems',
      'Find bugs in a database query builder'
    ]
  },
  {
    id: 'task-automation',
    name: 'Task Automation',
    desc: 'Create automated workflows that run on schedule, combining multiple tools and skills.',
    category: 'Automation',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>`,
    tools: ['terminal', 'write_file', 'memory_save'],
    toolCount: 3,
    systemPrompt: `When this skill is active, you create automations:
- Design step-by-step automation workflows
- Write scripts that combine multiple tools
- Set up scheduled execution via cron
- Handle errors gracefully with retries
- Log execution results for monitoring`,
    steps: [
      'Understand automation requirements from user',
      'Design the workflow steps',
      'Write automation script via write_file',
      'Test the script via terminal',
      'Set up scheduling if needed',
      'Document the automation',
      'Save automation details to memory'
    ],
    examples: [
      'Automate daily data backup to cloud storage',
      'Create a workflow that monitors a website for changes',
      'Set up automated code quality checks on commit'
    ]
  },
  {
    id: 'document-writer',
    name: 'Document Writer',
    desc: 'Write technical documentation, READMEs, API docs, and user guides.',
    category: 'Content',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    tools: ['read_file', 'search_files', 'write_file'],
    toolCount: 3,
    systemPrompt: `When this skill is active, you write technical documentation:
- Understand the target audience (developers, users, managers)
- Structure docs with clear sections and navigation
- Include code examples where applicable
- Write concise, accurate descriptions
- Use consistent formatting and style`,
    steps: [
      'Understand documentation scope and audience',
      'Read existing code/docs for context',
      'Plan document structure',
      'Write content section by section',
      'Add code examples and diagrams descriptions',
      'Review for accuracy and completeness',
      'Save via write_file'
    ],
    examples: [
      'Write API documentation for a REST endpoint',
      'Create a README for a new project',
      'Write a user guide for a new feature'
    ]
  }
];

// Get skill by ID
export function getSkillById(id) {
  return SKILLS_CATALOG.find(s => s.id === id);
}

// Get all skill IDs
export function getAllSkillIds() {
  return SKILLS_CATALOG.map(s => s.id);
}

// Get skills by category
export function getSkillsByCategory(category) {
  return SKILLS_CATALOG.filter(s => s.category === category);
}

// Get all categories
export function getCategories() {
  return [...new Set(SKILLS_CATALOG.map(s => s.category))];
}
