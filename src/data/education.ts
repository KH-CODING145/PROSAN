import { EducationItem } from '../types';

export const educationData: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'Software Engineering & Computer Science',
    degree: 'Computer Science / Software Engineering',
    field: 'System Architecture, AI, & Web Engineering',
    location: 'Phnom Penh, Cambodia, KH',
    startDate: '2015',
    endDate: '2019',
    description: 'Specialized education focused on core computing principles, distributed systems, algorithms, database architectures, and software engineering methodologies.',
    highlights: [
      'Software Engineering & Programming Fundamentals',
      'Modern Web Development & Distributed Systems',
      'Database Systems & System Architecture',
      'Artificial Intelligence & API Development',
      'Cloud Computing & Software Security'
    ]
  },
  {
    id: 'edu-2',
    institution: 'Continuous Professional Learning & Research',
    degree: 'Advanced Executive Specializations',
    field: 'AI Agents, RAG Architecture, & Cloud Infrastructure',
    location: 'Continuous & Self-Directed',
    startDate: '2020',
    endDate: 'Present',
    description: 'Dedicated to continuous mastery of bleeding-edge technologies, production LLM systems, and enterprise security standards.',
    highlights: [
      'AI & Machine Learning / Large Language Models (LLMs)',
      'RAG Architecture & Semantic Vector Retrieval',
      'AI Agent Systems & Autonomous Tool Calling',
      'Cloud Architecture, DevOps, & Containerization',
      'Cybersecurity, System Design, & Performance Optimization'
    ]
  }
];
