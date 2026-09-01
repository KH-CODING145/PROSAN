import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Full-Stack Web Development',
    subtitle: 'End-to-end web applications with modern architecture',
    description: 'Engineering responsive, high-performance web systems using React 19, TypeScript, and Node.js/Python microservices designed for enterprise scalability.',
    iconName: 'Globe',
    features: [
      'Single Page & Multi-Page Application Architecture',
      'Fluid Tailwind CSS design with dark/light theming',
      'Optimized Core Web Vitals (sub-second LCP, zero CLS)',
      'Secure authentication, session handling, and RBAC'
    ],
    deliverables: [
      'Production-ready modular codebase',
      'Automated CI/CD deployment pipeline',
      'Lighthouse 95+ performance report',
      'Full architectural documentation'
    ]
  },
  {
    id: 'srv-2',
    title: 'Generative AI & LLM Systems',
    subtitle: 'Custom intelligence, agents, and RAG pipelines',
    description: 'Integrating Gemini and OpenAI APIs, autonomous agent workflows, semantic vector retrieval, and deterministic structured outputs into production software.',
    iconName: 'Sparkles',
    features: [
      'Multi-agent orchestration & LangGraph pipelines',
      'Vector database setup (pgvector, Pinecone) for RAG',
      'Structured schema extraction & prompt engineering',
      'Token expenditure and latency optimization'
    ],
    deliverables: [
      'Production LLM wrapper API service',
      'Vector indexing & ingestion pipeline',
      'Evaluation test harness for hallucinations',
      'Monitoring & token analytics dashboard'
    ]
  },
  {
    id: 'srv-3',
    title: 'Workflow & Browser Automation',
    subtitle: 'High-reliability bots and background task schedulers',
    description: 'Building headless browser automation, CRM/ERP synchronization engines, and background queues that eliminate repetitive manual workflows.',
    iconName: 'Cpu',
    features: [
      'Headless browser automation with Playwright/Puppeteer',
      'Self-healing selectors and error recovery mechanisms',
      'Distributed worker queues with Redis and BullMQ',
      'Custom webhook event listeners & API transformers'
    ],
    deliverables: [
      'Fault-tolerant automated scripts & cron jobs',
      'Failure alerting system via Slack/Email/Telegram',
      'Detailed execution logs & screenshot telemetry',
      'Comprehensive operator runbook'
    ]
  },
  {
    id: 'srv-4',
    title: 'High-Throughput Backend & APIs',
    subtitle: 'Resilient REST, GraphQL & WebSocket services',
    description: 'Designing fault-tolerant REST and GraphQL APIs in Node.js, Express, and Python FastAPI with database connection pooling and caching.',
    iconName: 'Server',
    features: [
      'Clean domain-driven architecture & strict validation (Zod)',
      'Database modeling (PostgreSQL, MongoDB, Redis)',
      'Zero-trust security, rate limiting, and CORS policies',
      'Real-time bi-directional WebSockets & event streaming'
    ],
    deliverables: [
      'OpenAPI (Swagger) interactive documentation',
      'Dockerized container builds ready for cloud deploy',
      'Database migration scripts & seeders',
      'Unit & integration test suites (>85% coverage)'
    ]
  },
  {
    id: 'srv-5',
    title: 'UI/UX & Design Systems',
    subtitle: 'Accessible design tokens and reusable component libraries',
    description: 'Creating accessible, unstyled or tailored React component primitives with strict WCAG 2.1 AAA compliance and mathematical typography scales.',
    iconName: 'Layout',
    features: [
      'Component token systems and fluid typography scales',
      'Full keyboard navigation & screen-reader accessibility',
      'Micro-interactions & fluid 60fps animations with Motion',
      'Figma to production-code fidelity verification'
    ],
    deliverables: [
      'Custom reusable component library',
      'Storybook documentation & live sandbox',
      'Accessibility audit report',
      'Design token configuration files'
    ]
  },
  {
    id: 'srv-6',
    title: 'Cloud Architecture & DevOps',
    subtitle: 'Containerization, CI/CD, and serverless infrastructure',
    description: 'Deploying robust cloud-native infrastructure across GCP, AWS, and modern edge platforms with automated continuous delivery and observability.',
    iconName: 'Cloud',
    features: [
      'Docker containerization & multi-stage lean builds',
      'GitHub Actions automated build, test & deploy pipelines',
      'Cloud Run, Kubernetes, and serverless hosting',
      'Telemetry, log aggregation, and uptime alerts'
    ],
    deliverables: [
      'Terraform / Docker Compose infrastructure specs',
      'Zero-downtime deployment pipelines',
      'Monitoring & alerting configurations',
      'Disaster recovery & backup procedures'
    ]
  }
];
