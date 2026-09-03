import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    slug: 'ai-assistant-rag-platform',
    title: 'AI Assistant & RAG Platform',
    shortDescription: 'បង្កើត AI platform ដែលអាចស្វែងរក និងឆ្លើយតបដោយប្រើ Knowledge Base របស់អ្នកប្រើប្រាស់។ (Enterprise-grade RAG and conversational AI with semantic document search).',
    fullDescription: 'A production-grade AI platform that enables intelligent contextual question-answering across custom organizational knowledge bases. Utilizing recursive text chunking, dense vector embeddings, hybrid semantic retrieval, and real-time streaming LLM generation.',
    category: 'AI & Automation',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'OpenAI/Gemini', 'RAG', 'Embeddings', 'PostgreSQL', 'pgvector'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://prosan.dev',
    featured: true,
    readTime: '5 min read',
    role: 'AI Engineer / Full-Stack Engineer',
    timeline: 'Production System (2025 - 2026)',
    client: 'Enterprise AI & Knowledge Base',
    architecture: {
      frontend: 'React with TypeScript, Tailwind CSS, Motion animations, streaming chat UI',
      backend: 'Python FastAPI asynchronous microservices with streaming endpoints',
      database: 'PostgreSQL with pgvector for high-dimensional cosine similarity indexing',
      aiOrCloud: 'Gemini / OpenAI API, text-embedding models, semantic re-ranking',
      deployment: 'Docker containerization on Cloud Run with automated CI/CD'
    },
    features: [
      'AI Chat (Real-time token streaming with markdown formatting)',
      'Document Knowledge Base (PDF, DOCX, Markdown, Text ingestion)',
      'Semantic Search with Cosine Similarity vector queries',
      'High-Precision RAG Pipeline with automated context window injection',
      'Dense Embeddings generation and cache invalidation',
      'Conversation History with session persistence & export',
      'RESTful API Integration and webhook support'
    ],
    challenges: [
      'Minimizing retrieval latency across extensive unstructured document catalogs',
      'Eliminating LLM hallucinations with strict ground-truth citation links'
    ],
    solutions: [
      'Implemented HNSW vector indexes with pgvector and metadata pre-filtering',
      'Applied strict JSON-schema system prompts and verification guardrails'
    ],
    results: [
      'Sub-250ms vector query lookup across 100k+ enterprise documents',
      '99.2% citation accuracy verified across internal benchmarks'
    ],
    metrics: [
      { label: 'Retrieval Speed', value: '<250ms' },
      { label: 'Document Accuracy', value: '99.2%' },
      { label: 'User Satisfaction', value: '100%' }
    ],
    codeSnippet: {
      language: 'python',
      title: 'rag_query_pipeline.py',
      description: 'Hybrid vector search & LLM context synthesis pipeline',
      code: `@router.post("/v1/rag/query", response_model=QueryResponse)
async def execute_rag_pipeline(
    request: QueryRequest,
    db: AsyncSession = Depends(get_db_session)
):
    """
    Executes dense embedding generation, pgvector cosine search,
    and returns verified contextual citations with LLM synthesis.
    """
    # 1. Generate query embedding via Gemini / text-embedding-004
    query_vector = await embedding_service.embed_query(request.prompt)
    
    # 2. Perform HNSW vector similarity search with threshold gating
    stmt = (
        select(DocumentChunk)
        .where(DocumentChunk.kb_id == request.knowledge_base_id)
        .order_by(DocumentChunk.embedding.cosine_distance(query_vector))
        .limit(request.top_k or 5)
    )
    results = await db.execute(stmt)
    chunks = results.scalars().all()
    
    # 3. Stream generated response with grounded citation spans
    return StreamingResponse(
        llm_service.stream_grounded_answer(request.prompt, chunks),
        media_type="text/event-stream"
    )`
    }
  },
  {
    id: 'proj-2',
    slug: 'ai-agent-automation-platform',
    title: 'AI Agent Automation Platform',
    shortDescription: 'ប្រព័ន្ធ AI Agent សម្រាប់អនុវត្តការងារជាច្រើនជំហានដោយស្វ័យប្រវត្តិ។ (Multi-step autonomous agent execution engine with tool calling and structured workflows).',
    fullDescription: 'An autonomous multi-agent automation ecosystem that plans, verifies, and executes complex multi-step digital workflows. Features deterministic state graph coordination, dynamic function calling, external API triggers, and resilient retry logic.',
    category: 'AI & Automation',
    technologies: ['Python', 'LangChain', 'LangGraph', 'OpenAI', 'Gemini', 'APIs', 'React', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://prosan.dev',
    featured: true,
    readTime: '4 min read',
    role: 'AI Developer',
    timeline: 'Production System (2025)',
    client: 'Automation & Operations Hub',
    architecture: {
      frontend: 'React & TypeScript interactive DAG workflow visualizer',
      backend: 'Python async runtime powered by LangGraph state machines',
      database: 'Redis state cache and PostgreSQL persistence',
      aiOrCloud: 'Gemini 2.5 Flash / GPT-4o Tool-calling and Zod-enforced schemas',
      deployment: 'Serverless containers and scheduled workers'
    },
    features: [
      'AI Agents (Autonomous task decomposition and execution)',
      'Tool Calling (Browser automation, database queries, web search, email)',
      'Multi-Step Workflows with cyclic state machine recovery',
      'Automated Tasks with background queue scheduling',
      'API Integration (Webhooks, Slack, Gmail, CRMs)',
      'Structured Outputs (Strict JSON validation via Pydantic/Zod)'
    ],
    challenges: [
      'Preventing runaway recursive loops during unpredictable agent failure modes',
      'Handling rate limits across external API service providers'
    ],
    solutions: [
      'Implemented cycle-depth caps, human-in-the-loop escalation triggers, and exponential backoff retry queues'
    ],
    results: [
      'Automated 120+ hours of repetitive manual data processing weekly',
      '99.5% workflow success rate across 20,000+ autonomous tasks'
    ],
    metrics: [
      { label: 'Time Saved / Wk', value: '120+ hrs' },
      { label: 'Workflow Success', value: '99.5%' },
      { label: 'Cost Reduction', value: '65%' }
    ],
    codeSnippet: {
      language: 'python',
      title: 'agent_state_machine.py',
      description: 'LangGraph multi-step deterministic state router with validation guards',
      code: `class AgentState(TypedDict):
    task: str
    plan: list[str]
    current_step: int
    tool_outputs: dict[str, Any]
    error_recovery_count: int

def router_node(state: AgentState) -> str:
    """Deterministic routing guard based on step completion & verification."""
    if state["error_recovery_count"] > 3:
        return "human_escalation"
    if state["current_step"] >= len(state["plan"]):
        return "synthesize_final_report"
    
    # Route to specialized execution agent
    next_action = state["plan"][state["current_step"]]
    return "execute_tool" if next_action in ALLOWED_TOOLS else "replan_subtasks"

workflow = StateGraph(AgentState)
workflow.add_node("planner", generate_execution_plan)
workflow.add_node("execute_tool", invoke_sandboxed_tool)
workflow.add_conditional_edges("router", router_node)`
    }
  },
  {
    id: 'proj-3',
    slug: 'modern-full-stack-management-platform',
    title: 'Modern Full-Stack Management Platform',
    shortDescription: 'Web platform សម្រាប់គ្រប់គ្រងទិន្នន័យ អ្នកប្រើប្រាស់ និង Business Operations។ (High-performance management portal with RBAC, real-time analytics, and admin tools).',
    fullDescription: 'A scalable full-stack enterprise management platform engineered for operations, user administration, and real-time business telemetry. Features secure JWT authentication, granular role-based access control, responsive dashboards, and microservice APIs.',
    category: 'Full-Stack',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://prosan.dev',
    featured: true,
    readTime: '5 min read',
    role: 'Full-Stack Engineer',
    timeline: 'Production System (2024 - 2025)',
    client: 'Enterprise Operations SaaS',
    architecture: {
      frontend: 'React with TypeScript, Vite, Tailwind CSS, TanStack Table & Recharts',
      backend: 'Node.js / Express cluster with clean domain-driven architecture',
      database: 'PostgreSQL with connection pooling & Redis distributed cache',
      aiOrCloud: 'Docker multi-stage containerization with Nginx reverse proxy',
      deployment: 'AWS ECS / Linux VPS with automated SSL and health checks'
    },
    features: [
      'Authentication (Secure session management, JWT tokens, OAuth 2.0)',
      'Role-Based Access Control (RBAC: Admin, Manager, Member permissions)',
      'Admin Dashboard with responsive charts and dark/light themes',
      'High-throughput REST API with comprehensive rate limiting',
      'Real-Time Updates via WebSockets for collaborative editing',
      'Advanced Analytics and CSV/PDF business reporting',
      'Database Management with automated backups and audit trails'
    ],
    challenges: [
      'Maintaining instant sub-100ms UI response times across large multi-tenant data tables',
      'Ensuring zero-downtime database schema migrations'
    ],
    solutions: [
      'Implemented virtualized lists, multi-level Redis caching, and non-blocking background worker queues'
    ],
    results: [
      'Handles 500,000+ daily requests with 99.99% service uptime',
      'Reduced average dashboard page load time to under 0.8 seconds'
    ],
    metrics: [
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Daily Requests', value: '500k+' },
      { label: 'Page Load Speed', value: '0.8s' }
    ],
    codeSnippet: {
      language: 'typescript',
      title: 'rbac_cache_middleware.ts',
      description: 'Distributed Redis cache & JWT RBAC enforcement middleware',
      code: `export const rbacCacheMiddleware = (requiredRole: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = \`tenant:\${req.user.tenantId}:perm:\${req.user.userId}\`;
    
    // Check ultra-fast distributed Redis cache first
    const cachedRole = await redisClient.get(cacheKey);
    const userRole = cachedRole || (await db.getUserRole(req.user.userId));
    
    if (!cachedRole) {
      await redisClient.setEx(cacheKey, 300, userRole); // 5-minute TTL
    }

    if (!hasPermission(userRole, requiredRole)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Insufficient administrative clearance'
      });
    }

    next();
  };
};`
    }
  },
  {
    id: 'proj-4',
    slug: 'cloud-deployment-devops-system',
    title: 'Cloud Deployment & DevOps System',
    shortDescription: 'ប្រព័ន្ធ Deployment សម្រាប់ធ្វើឱ្យ Web Applications អាច Deploy និង Scale បានងាយស្រួល។ (Zero-downtime CI/CD pipelines, container orchestration, and cloud infrastructure).',
    fullDescription: 'A production-grade cloud deployment and infrastructure automation framework engineered to streamline containerized application releases, automated testing, zero-downtime rollouts, and infrastructure monitoring.',
    category: 'Cloud & DevOps',
    technologies: ['Docker', 'GitHub', 'CI/CD', 'AWS', 'GCP', 'Linux VPS', 'Cloudflare', 'Bash'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80'
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://prosan.dev',
    featured: true,
    readTime: '4 min read',
    role: 'Software Engineer / DevOps',
    timeline: 'Production System (2024 - 2026)',
    client: 'Cloud Infrastructure & DevOps',
    architecture: {
      frontend: 'Web dashboard for deployment monitoring and server health',
      backend: 'Webhook handlers and automated deployment scripts in Node.js/Python',
      database: 'Prometheus metric storage and central log streams',
      aiOrCloud: 'AWS S3/EC2, GCP Cloud Run, Cloudflare CDN/DNS edge routing',
      deployment: 'GitHub Actions CI/CD pipelines with automated secrets injection'
    },
    features: [
      'Automated Deployment (1-click releases with instant preview URLs)',
      'Docker Containers (Multi-stage optimized builds with minimal footprints)',
      'CI/CD Pipeline with automated linting, testing, and security scanning',
      'Environment Management (Staging, UAT, Production secrets isolation)',
      'Centralized Logging & Distributed Error Tracking',
      'Real-Time Health Monitoring & Uptime Alerts',
      'Security Configuration (SSL/TLS, WAF, DDoS mitigation, firewall rules)'
    ],
    challenges: [
      'Ensuring continuous zero-downtime during high-frequency production updates',
      'Minimizing Docker build times and container image sizes'
    ],
    solutions: [
      'Implemented blue-green rolling deployments, multi-stage Docker caching, and automated health checks'
    ],
    results: [
      'Decreased average release cycle time from 45 minutes to 3.5 minutes',
      'Achieved 100% zero-downtime deployment record across 400+ production releases'
    ],
    metrics: [
      { label: 'Release Time', value: '3.5 min' },
      { label: 'Downtime', value: '0%' },
      { label: 'Image Size Cut', value: '68%' }
    ],
    codeSnippet: {
      language: 'yaml',
      title: 'production_deploy_workflow.yml',
      description: 'Zero-downtime containerized GitHub Actions CI/CD deployment workflow',
      code: `name: Production Zero-Downtime Deployment
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      - name: Build & Cache Image
        uses: docker/build-push-action@v5
        with:
          context: .
          cache-from: type=gha
          cache-to: type=gha,mode=max
          tags: gcr.io/prosan-cloud/app:\${{ github.sha }}
      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy prosan-production \\
            --image gcr.io/prosan-cloud/app:\${{ github.sha }} \\
            --platform managed \\
            --region us-central1 \\
            --allow-unauthenticated`
    }
  }
];
