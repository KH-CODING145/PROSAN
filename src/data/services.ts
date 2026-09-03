import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'srv-01',
    title: 'Web Development',
    subtitle: 'Modern, responsive, accessible web interfaces',
    description: 'Crafting responsive, high-performance web applications using React, TypeScript, and modern Tailwind CSS with fluid animations, intuitive UX, and sub-second loading speeds.',
    iconName: 'Globe',
    features: [
      'Responsive design engineered for all screen sizes',
      'Modern React & TypeScript component architecture',
      'Fluid animations with Framer Motion',
      'SEO optimization, meta tags, and accessibility (WCAG AA)'
    ],
    deliverables: [
      'Production-ready client codebase',
      'Pixel-perfect responsive layout',
      'Lighthouse 95+ performance optimization',
      'Cross-browser and mobile verified builds'
    ]
  },
  {
    id: 'srv-02',
    title: 'Full-Stack Development',
    subtitle: 'End-to-end applications from database to UI',
    description: 'Building complete web products combining interactive frontends with robust Node.js/Python backends, scalable relational/document databases, and cloud hosting.',
    iconName: 'Layout',
    features: [
      'Complete frontend and backend system integration',
      'PostgreSQL, MongoDB, SQLite, and Firebase databases',
      'Secure authentication, authorization, and session management',
      'Microservice and modular monolithic system design'
    ],
    deliverables: [
      'Comprehensive full-stack codebase',
      'Database migration schemas and seeders',
      'Automated deployment setup',
      'Comprehensive architectural blueprint'
    ]
  },
  {
    id: 'srv-03',
    title: 'AI Integration',
    subtitle: 'Intelligent capabilities powered by Gemini & OpenAI',
    description: 'Empowering applications with Generative AI capabilities including Gemini 2.5/OpenAI models, multi-agent workflows, semantic vector search, and custom document RAG pipelines.',
    iconName: 'Sparkles',
    features: [
      'Gemini API and OpenAI LLM model integrations',
      'Autonomous multi-agent workflows and function calling',
      'Retrieval-Augmented Generation (RAG) with vector databases',
      'Strict structured JSON schema enforcement and prompt design'
    ],
    deliverables: [
      'Production AI service wrapper and endpoints',
      'Vector indexing and embeddings pipeline',
      'Hallucination prevention guardrails',
      'Token expenditure and latency telemetry'
    ]
  },
  {
    id: 'srv-04',
    title: 'Automation Software',
    subtitle: 'Custom bots, scrapers, and automated background tasks',
    description: 'Eliminating repetitive human tasks through intelligent headless browser automation, background task queues, webhook synchronizations, and data extraction pipelines.',
    iconName: 'Cpu',
    features: [
      'Headless browser automation with Playwright and Puppeteer',
      'Self-healing selectors and automated DOM recovery',
      'Scheduled background workers and Redis queues',
      'Custom webhook triggers and data transformation flows'
    ],
    deliverables: [
      'Automated bot scripts and scheduled cron jobs',
      'Telegram/Slack/Email notification pipelines',
      'Execution logs, error captures, and telemetry',
      'Self-healing resilience mechanisms'
    ]
  },
  {
    id: 'srv-05',
    title: 'API Integration',
    subtitle: 'High-throughput REST, GraphQL & third-party connectors',
    description: 'Designing resilient RESTful and GraphQL APIs as well as integrating third-party platforms (GitHub API, YouTube Data API, Stripe, Telegram bots, and Firebase).',
    iconName: 'Server',
    features: [
      'Clean domain-driven REST and GraphQL architectures',
      'Third-party API connectors (GitHub, YouTube, Stripe, Telegram)',
      'Rate-limiting, API key security, and CORS policies',
      'Real-time bi-directional WebSockets and Server-Sent Events'
    ],
    deliverables: [
      'OpenAPI/Swagger interactive documentation',
      'Dockerized containerized API endpoints',
      'Automated error handling and retries with backoff',
      'Unit and integration test suites'
    ]
  },
  {
    id: 'srv-06',
    title: 'Desktop Application Development',
    subtitle: 'Cross-platform native desktop solutions',
    description: 'Developing high-performance cross-platform desktop applications (Electron/Tauri) with local SQLite databases, native OS notifications, and offline-first capabilities.',
    iconName: 'Cloud',
    features: [
      'Cross-platform support for Windows, macOS, and Linux',
      'Offline-first data persistence with local SQLite and cache',
      'Native file system access, hotkeys, and system tray integration',
      'Lean binary sizes with secure sandboxed environments'
    ],
    deliverables: [
      'Installable desktop binaries (.exe, .dmg, .AppImage)',
      'Auto-update delivery pipeline',
      'Native OS permission handling',
      'Local database encryption and backup logic'
    ]
  }
];
