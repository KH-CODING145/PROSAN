import { SkillItem } from '../types';

export interface SkillCategoryGroup {
  id: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'AI & ML' | 'DevOps & Cloud' | 'Tools & Architecture';
  description: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategoryGroup[] = [
  {
    id: 'frontend',
    category: 'Frontend',
    description: 'Modern, reactive user interfaces with strict type safety, fluid motion, and accessible component architectures.',
    skills: [
      { name: 'React 18 / 19', level: 'Expert', experienceYears: '6 yrs', proficiencyScore: 98, specialty: 'Server Components, Concurrent Mode, Hooks, Context API', productionProjects: 24, category: 'Frontend', highlight: true },
      { name: 'TypeScript', level: 'Expert', experienceYears: '5 yrs', proficiencyScore: 96, specialty: 'Strict Type-Safety, Generics, Utility Types, AST', productionProjects: 22, category: 'Frontend', highlight: true },
      { name: 'JavaScript (ESNext)', level: 'Expert', experienceYears: '6 yrs', proficiencyScore: 98, specialty: 'Event Loop, Closures, Async/Await, Prototypes', productionProjects: 30, category: 'Frontend', highlight: true },
      { name: 'Tailwind CSS', level: 'Expert', experienceYears: '4 yrs', proficiencyScore: 95, specialty: 'JIT Engine, Custom Plugins, Design Tokens, Arbitrary Variants', productionProjects: 20, category: 'Frontend', highlight: true },
      { name: 'HTML5 & Semantic Web', level: 'Expert', experienceYears: '6 yrs', proficiencyScore: 99, specialty: 'WCAG 2.1 AA/AAA, Semantic Tags, SEO Meta, Microdata', productionProjects: 32, category: 'Frontend' },
      { name: 'CSS3 / Modern Layouts', level: 'Expert', experienceYears: '6 yrs', proficiencyScore: 95, specialty: 'CSS Grid, Subgrid, Flexbox, Custom Properties, Animations', productionProjects: 28, category: 'Frontend' },
      { name: 'Framer Motion / Motion', level: 'Advanced', experienceYears: '3 yrs', proficiencyScore: 90, specialty: 'Spring Physics, LayoutId Morphing, Gestures, Scroll Parallax', productionProjects: 14, category: 'Frontend', highlight: true },
      { name: 'Next.js & Remix', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 88, specialty: 'App Router, SSR, ISR, Edge Functions, Dynamic Routing', productionProjects: 12, category: 'Frontend' },
      { name: 'Vite & Build Tooling', level: 'Advanced', experienceYears: '3 yrs', proficiencyScore: 92, specialty: 'ESBuild, Rollup Plugins, Tree-Shaking, HMR Architecture', productionProjects: 16, category: 'Frontend' },
      { name: 'Bootstrap', level: 'Proficient', experienceYears: '4 yrs', proficiencyScore: 82, specialty: 'Grid System, SCSS Overrides, Responsive Layouts', productionProjects: 10, category: 'Frontend' }
    ]
  },
  {
    id: 'backend',
    category: 'Backend',
    description: 'High-throughput microservices, secure REST/gRPC endpoints, background queue workers, and scalable runtime logic.',
    skills: [
      { name: 'Node.js', level: 'Expert', experienceYears: '6 yrs', proficiencyScore: 96, specialty: 'Event Loop, Stream Buffers, Cluster Workers, Memory Profiling', productionProjects: 25, category: 'Backend', highlight: true },
      { name: 'Express.js', level: 'Expert', experienceYears: '5 yrs', proficiencyScore: 94, specialty: 'Middleware Pipelines, Router Mounts, Custom Error Handlers', productionProjects: 22, category: 'Backend', highlight: true },
      { name: 'Python', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 90, specialty: 'AsyncIO, Generators, Type Hints, Data Processing', productionProjects: 15, category: 'Backend', highlight: true },
      { name: 'FastAPI', level: 'Advanced', experienceYears: '3 yrs', proficiencyScore: 88, specialty: 'Pydantic v2 Models, OpenAPI Auto-Docs, Dependency Injection', productionProjects: 10, category: 'Backend' },
      { name: 'PHP & Laravel', level: 'Proficient', experienceYears: '3 yrs', proficiencyScore: 80, specialty: 'Eloquent ORM, Blade Engines, Queues, Service Providers', productionProjects: 8, category: 'Backend' },
      { name: 'REST & GraphQL APIs', level: 'Expert', experienceYears: '6 yrs', proficiencyScore: 96, specialty: 'HATEOAS, Apollo GraphQL, Rate Limiting, Idempotency', productionProjects: 26, category: 'Backend', highlight: true },
      { name: 'WebSockets & Event Streams', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 89, specialty: 'Socket.io, SSE (Server-Sent Events), Pub/Sub Broadcasts', productionProjects: 12, category: 'Backend' },
      { name: 'Microservice Architecture', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 87, specialty: 'Service Discovery, API Gateways, Event-Driven Sagas', productionProjects: 9, category: 'Backend' }
    ]
  },
  {
    id: 'database',
    category: 'Database',
    description: 'Relational data modeling, ACID compliance, document schemas, time-series indexing, and vector similarity search.',
    skills: [
      { name: 'PostgreSQL', level: 'Expert', experienceYears: '5 yrs', proficiencyScore: 95, specialty: 'Complex CTEs, Window Functions, JSONB Indexing, Query Plans', productionProjects: 19, category: 'Database', highlight: true },
      { name: 'MySQL', level: 'Advanced', experienceYears: '5 yrs', proficiencyScore: 90, specialty: 'InnoDB Engine, Normalized Schemas, Query Optimization', productionProjects: 16, category: 'Database' },
      { name: 'MongoDB', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 88, specialty: 'Aggregation Pipelines, Compound Indexes, Replica Sets', productionProjects: 14, category: 'Database', highlight: true },
      { name: 'Redis (Caching & Queues)', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 92, specialty: 'BullMQ Queues, Distributed Locks (Redlock), Cache Invalidation', productionProjects: 15, category: 'Database', highlight: true },
      { name: 'Firebase & Firestore', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 90, specialty: 'Real-time Listeners, Security Rules, Compound Indexes', productionProjects: 16, category: 'Database' },
      { name: 'SQLite', level: 'Proficient', experienceYears: '4 yrs', proficiencyScore: 85, specialty: 'Embedded Storage, WAL Mode, Local Persistent Cache', productionProjects: 8, category: 'Database' },
      { name: 'Vector Databases (pgvector, Pinecone)', level: 'Advanced', experienceYears: '2 yrs', proficiencyScore: 86, specialty: 'Cosine Similarity, HNSW Indexes, High-dim Embeddings', productionProjects: 7, category: 'Database', highlight: true }
    ]
  },
  {
    id: 'ai-ml',
    category: 'AI & ML',
    description: 'Generative AI integrations, autonomous agent architectures, RAG pipelines, and deterministic automation.',
    skills: [
      { name: 'Gemini Models & API', level: 'Expert', experienceYears: '2 yrs', proficiencyScore: 97, specialty: 'Multimodal Inputs, Function Calling, System Prompts, Structured JSON', productionProjects: 14, category: 'AI & ML', highlight: true },
      { name: 'OpenAI API & GPT-4o', level: 'Expert', experienceYears: '2 yrs', proficiencyScore: 95, specialty: 'Tool Calls, Assistants API, Streaming Responses, Token Budgets', productionProjects: 15, category: 'AI & ML', highlight: true },
      { name: 'Prompt Engineering & Structured Outputs', level: 'Expert', experienceYears: '3 yrs', proficiencyScore: 98, specialty: 'Few-shot Conditioning, CoT Reasoning, Zod Schema Enforcement', productionProjects: 18, category: 'AI & ML', highlight: true },
      { name: 'RAG & Semantic Retrieval', level: 'Advanced', experienceYears: '2 yrs', proficiencyScore: 91, specialty: 'Recursive Chunking, Vector Search, Re-ranking, Context Windows', productionProjects: 9, category: 'AI & ML', highlight: true },
      { name: 'AI Automation & Agents (LangChain, LangGraph)', level: 'Advanced', experienceYears: '2 yrs', proficiencyScore: 89, specialty: 'Multi-Agent Workflows, State Graphs, Tool Execution Loops', productionProjects: 8, category: 'AI & ML', highlight: true },
      { name: 'Embeddings & Token Optimization', level: 'Advanced', experienceYears: '2 yrs', proficiencyScore: 90, specialty: 'Semantic Similarity, Vector Clustering, Token Cost Profiling', productionProjects: 11, category: 'AI & ML' },
      { name: 'Browser & Desktop Automation (Playwright)', level: 'Expert', experienceYears: '4 yrs', proficiencyScore: 96, specialty: 'Headless Scrapers, E2E Workflows, Resilient Selectors', productionProjects: 14, category: 'AI & ML', highlight: true }
    ]
  },
  {
    id: 'devops',
    category: 'DevOps & Cloud',
    description: 'Continuous integration, container orchestration, zero-downtime deployments, and infrastructure as code.',
    skills: [
      { name: 'Git & GitHub Workflows', level: 'Expert', experienceYears: '6 yrs', proficiencyScore: 98, specialty: 'Branch Strategies, Interactive Rebasing, Submodules, PR Reviews', productionProjects: 30, category: 'DevOps & Cloud', highlight: true },
      { name: 'Docker & Containerization', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 93, specialty: 'Multi-stage Builds, Docker Compose, Image Size Optimization', productionProjects: 18, category: 'DevOps & Cloud', highlight: true },
      { name: 'CI/CD Pipelines (GitHub Actions)', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 91, specialty: 'Automated Testing, Docker Build/Push, SSH Deployments, Secrets', productionProjects: 16, category: 'DevOps & Cloud', highlight: true },
      { name: 'Google Cloud Platform (GCP) & Cloud Run', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 89, specialty: 'Serverless Containers, Cloud Build, IAM Roles, Cloud SQL', productionProjects: 11, category: 'DevOps & Cloud' },
      { name: 'AWS (S3, EC2, Lambda)', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 86, specialty: 'S3 Buckets, IAM Policies, Serverless Functions, CloudFront CDN', productionProjects: 12, category: 'DevOps & Cloud' },
      { name: 'Linux Server Administration / VPS', level: 'Advanced', experienceYears: '5 yrs', proficiencyScore: 92, specialty: 'Ubuntu/Debian, Systemd Services, Nginx Reverse Proxy, SSL', productionProjects: 20, category: 'DevOps & Cloud' },
      { name: 'Vercel / Netlify / Cloudflare', level: 'Expert', experienceYears: '5 yrs', proficiencyScore: 96, specialty: 'Edge Network Routing, Zero-Config Deploys, DNS & Workers', productionProjects: 25, category: 'DevOps & Cloud' }
    ]
  },
  {
    id: 'tools-architecture',
    category: 'Tools & Architecture',
    description: 'System design principles, test-driven methodologies, code quality standards, and collaborative agility.',
    skills: [
      { name: 'System Design & Scalability', level: 'Expert', experienceYears: '5 yrs', proficiencyScore: 95, specialty: 'High Availability, Caching Layers, DB Partitioning, Load Balancing', productionProjects: 17, category: 'Tools & Architecture', highlight: true },
      { name: 'Web Security (OWASP, Auth, OAuth, CORS)', level: 'Advanced', experienceYears: '5 yrs', proficiencyScore: 94, specialty: 'JWT Tokens, OAuth 2.0 / OIDC, CSRF/XSS Mitigation, Rate Limits', productionProjects: 21, category: 'Tools & Architecture', highlight: true },
      { name: 'Unit & E2E Testing (Vitest, Jest, Playwright)', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 89, specialty: 'TDD Methodology, Component Mocks, Regression Coverage', productionProjects: 15, category: 'Tools & Architecture' },
      { name: 'Figma & Design Systems', level: 'Advanced', experienceYears: '4 yrs', proficiencyScore: 88, specialty: 'Component Libraries, Auto-Layout, Tokens, Interactive Prototypes', productionProjects: 16, category: 'Tools & Architecture' },
      { name: 'Performance Optimization & Web Vitals', level: 'Expert', experienceYears: '5 yrs', proficiencyScore: 96, specialty: 'Lighthouse 100/100, Core Web Vitals (LCP, INP, CLS), Bundle Splitting', productionProjects: 22, category: 'Tools & Architecture', highlight: true }
    ]
  }
];

export const allSkillsList: SkillItem[] = skillsData.flatMap(group => group.skills);
