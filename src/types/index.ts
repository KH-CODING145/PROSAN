export type ThemeMode = 'dark' | 'light' | 'system';

export type ProjectCategory = 
  | 'All'
  | 'Web Development'
  | 'AI'
  | 'Automation'
  | 'Desktop Software'
  | 'Mobile'
  | 'Other'
  | 'Full-Stack'
  | 'AI & Automation'
  | 'Mobile Development'
  | 'Cloud & Backend'
  | 'Cloud & DevOps'
  | 'SaaS';

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  gallery: string[];
  githubUrl: string;
  liveDemoUrl: string;
  featured: boolean;
  readTime?: string;
  role: string;
  timeline: string;
  client?: string;
  architecture: {
    frontend?: string;
    backend?: string;
    database?: string;
    aiOrCloud?: string;
    deployment?: string;
  };
  features: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  metrics?: { label: string; value: string }[];
  codeSnippet?: {
    language: string;
    code: string;
    title?: string;
    description?: string;
  };
}

export type SkillLevel = 'Proficient' | 'Advanced' | 'Expert' | 'Familiar';

export interface SkillItem {
  name: string;
  level: SkillLevel;
  experienceYears?: string;
  proficiencyScore?: number;
  icon?: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'AI & ML' | 'DevOps & Cloud' | 'Tools & Architecture';
  highlight?: boolean;
  specialty?: string;
  productionProjects?: number;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote' | 'Part-time';
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights?: string[];
}

export interface CertificateItem {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  image: string;
  skills: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  relationship: string;
  rating: number;
  linkedin?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  link: string;
  coverImage?: string;
  category?: string;
  sections?: {
    heading: string;
    body: string[];
    codeSnippet?: {
      language: string;
      code: string;
    };
  }[];
  keyTakeaways?: string[];
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  htmlUrl: string;
  topics?: string[];
}

export interface GithubStats {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  avatarUrl: string;
  profileUrl: string;
}

export interface YoutubeVideoItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  views: string;
  duration?: string;
  videoUrl: string;
  isFeatured?: boolean;
}

export interface SiteProfile {
  name: string;
  title: string;
  roles: string[];
  tagline: string;
  shortBio: string;
  fullBio: string[];
  mission: string;
  vision: string;
  location: string;
  email: string;
  phone?: string;
  avatar: string;
  resumeUrl: string;
  availableForHire: boolean;
  hireStatusText: string;
  experienceYears: number;
  completedProjects: number;
  clientSatisfaction: number;
  happyClients: number;
  social: {
    github?: string;
    linkedin: string;
    youtube?: string;
    twitter?: string;
    telegram?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    email: string;
  };
}
