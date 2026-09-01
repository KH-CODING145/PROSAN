import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'Enterprise Software & AI Systems',
    position: 'Senior Software Engineer & AI Developer',
    location: 'Phnom Penh, Cambodia, KH',
    type: 'Full-time',
    startDate: '2020',
    endDate: 'Present',
    current: true,
    description: 'Leading the design, development, and architectural scaling of mission-critical Full-Stack Web Applications, Generative AI platforms, RAG systems, and resilient Cloud infrastructure with 6+ years of production experience.',
    responsibilities: [
      'រចនា និងអភិវឌ្ឍ Full-Stack Web Applications (React, TypeScript, Next.js, Vite, Tailwind CSS)',
      'បង្កើត Backend APIs និង scalable services (Node.js, Express.js, Python, FastAPI, PHP, Laravel)',
      'រចនា Database Architecture (PostgreSQL, MySQL, MongoDB, Redis, Firebase, Firestore, SQLite)',
      'អភិវឌ្ឍ AI-powered applications, RAG & Semantic Search systems (OpenAI, Gemini, GPT-4o, Embeddings, Vector Search)',
      'បង្កើត AI Agents និង automation workflows (LangChain, LangGraph, Multi-Step Tool Calling)',
      'អភិវឌ្ឍ REST / GraphQL APIs និងរចនា Microservice architectures',
      'បង្កើត Cloud deployment infrastructure, អនុវត្ត Docker និង CI/CD (AWS, GCP, Linux VPS, Cloudflare)',
      'កែលម្អ Performance និង Security, Debug និង Maintain Production Systems យ៉ាងរលូន'
    ],
    technologies: [
      'React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'FastAPI', 
      'Gemini API', 'OpenAI', 'RAG & Vector Search', 'PostgreSQL', 
      'Redis', 'Docker', 'AWS', 'GCP', 'Tailwind CSS'
    ],
    achievements: [
      '🚀 Production Engineering: 6+ Years building resilient, scalable software systems.',
      '🤖 AI Engineering: Production RAG, Embeddings, and autonomous multi-agent pipelines.',
      '⚡ High Performance: Sub-second latency, optimized database queries, and 99.99% uptime.'
    ]
  },
  {
    id: 'exp-2',
    company: 'Full-Stack & Cloud Solutions Lab',
    position: 'Full-Stack Software Engineer & AI Integrator',
    location: 'Phnom Penh, Cambodia, KH',
    type: 'Full-time',
    startDate: '2018',
    endDate: '2020',
    current: false,
    description: 'Engineered high-performance web applications, cloud deployment systems, microservices, and database models for enterprise clients and digital platforms.',
    responsibilities: [
      'Built responsive, accessible web portals using React, TypeScript, modern CSS, and RESTful architectures.',
      'Constructed distributed backend services in Node.js and Python with robust security & authentication.',
      'Executed database schema normalization, indexing, and Redis caching layers for high-volume transactions.',
      'Automated container deployments with Docker, GitHub Actions, and Linux VPS system administration.'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Python', 'PostgreSQL', 'MySQL', 'Docker', 'Git'],
    achievements: [
      'Delivered 20+ production-grade web systems on time with 100% security & reliability compliance.',
      'Automated deployment cycles from manual scripts to 1-click CI/CD workflows.'
    ]
  }
];
