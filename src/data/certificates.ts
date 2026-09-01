import { CertificateItem } from '../types';

export const certificatesData: CertificateItem[] = [
  {
    id: 'cert-1',
    name: 'Google Cloud Certified Professional Cloud Architect',
    organization: 'Google Cloud',
    issueDate: 'May 2024',
    credentialId: 'GCP-PCA-894102',
    verificationUrl: 'https://cloud.google.com/certification',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    skills: ['GCP Infrastructure', 'Cloud Run', 'Kubernetes (GKE)', 'Cloud Security', 'IAM']
  },
  {
    id: 'cert-2',
    name: 'AWS Certified Solutions Architect – Associate',
    organization: 'Amazon Web Services',
    issueDate: 'October 2023',
    credentialId: 'AWS-SAA-409812',
    verificationUrl: 'https://aws.amazon.com/verification',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    skills: ['AWS ECS/EKS', 'S3 & DynamoDB', 'VPC & Networking', 'Serverless Lambda']
  },
  {
    id: 'cert-3',
    name: 'Generative AI & LLM Systems Specialization',
    organization: 'DeepLearning.AI',
    issueDate: 'January 2024',
    credentialId: 'DLAI-LLM-553201',
    verificationUrl: 'https://deeplearning.ai/verify',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    skills: ['Prompt Engineering', 'LangGraph', 'RAG Retrieval', 'Vector Search', 'Token Economics']
  },
  {
    id: 'cert-4',
    name: 'Meta Certified Senior React Native & Frontend Specialist',
    organization: 'Meta / Coursera',
    issueDate: 'August 2023',
    credentialId: 'META-FRONTEND-998123',
    verificationUrl: 'https://coursera.org/verify',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    skills: ['Advanced React Patterns', 'State Architecture', 'Web Vitals', 'Accessibility (WCAG)']
  }
];
