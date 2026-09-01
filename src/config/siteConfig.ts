import { SiteProfile } from '../types';

export interface NavMenuItem {
  name: string;
  href: string;
  isCta?: boolean;
}

export const siteConfig: {
  siteUrl: string;
  siteName: string;
  defaultTitle: string;
  description: string;
  author: string;
  quote: string;
  philosophy: string[];
  profile: SiteProfile;
  mainMenu: NavMenuItem[];
  mobileMenu: NavMenuItem[];
  navLinks: NavMenuItem[];
  stats: { label: string; value: string; helper?: string; icon: string }[];
} = {
  siteUrl: 'https://prosan.dev',
  siteName: 'PRO SAN | Senior Software Engineer & AI Developer',
  defaultTitle: 'PRO SAN — Senior Software Engineer & AI Developer',
  description: 'Senior Software Engineer & AI Developer with 6+ years of production experience in Full-Stack systems, AI agents, RAG, and scalable cloud platforms.',
  author: 'PRO SAN',
  quote: '“I don\'t just write code. I design systems.”',
  philosophy: [
    '«Build it clean.',
    'Build it secure.',
    'Build it scalable.',
    'Build it for production.»'
  ],

  profile: {
    name: 'PRO SAN',
    title: 'Senior Software Engineer & AI Developer',
    roles: [
      'Senior Full-Stack Engineer',
      'AI & Agent Systems Architect',
      'RAG & Semantic Search Specialist',
      'Cloud & DevOps Engineer'
    ],
    tagline: 'Architecting resilient full-stack systems, intelligent AI agents, and scalable cloud platforms with deliberate engineering craftsmanship.',
    shortBio: 'Senior Software Engineer & AI Developer with 6+ years of production engineering experience across React, TypeScript, Node.js, Python, and Generative AI systems.',
    fullBio: [
      'ខ្ញុំឈ្មោះ PRO SAN ជា Senior Software Engineer និង AI Developer ដែលមានបទពិសោធន៍ជាង 6+ ឆ្នាំក្នុងការអភិវឌ្ឍ Software សម្រាប់ Production។',
      'ខ្ញុំមានជំនាញក្នុងការរចនា និងអភិវឌ្ឍប្រព័ន្ធ Full-Stack, AI Applications, AI Agents, RAG Systems, Cloud Platforms និង Automation Tools ដោយផ្តោតលើគុណភាព ការអនុវត្តបានលឿន សុវត្ថិភាព ភាពអាចទុកចិត្តបាន និងភាពងាយស្រួលក្នុងការប្រើប្រាស់។',
      'ខ្ញុំចូលចិត្តបម្លែងគំនិត និងបញ្ហាអាជីវកម្មទៅជាផលិតផលឌីជីថលដែលអាចប្រើប្រាស់បានពិតប្រាកដ និងអាចពង្រីកបានក្នុង Production (I don\'t just write code. I design systems).'
    ],
    mission: 'To build robust, maintainable, and ethically sound software systems that bridge cutting-edge artificial intelligence with intuitive user experiences.',
    vision: 'Empowering modern businesses and users through scalable architectures, autonomous AI workflows, and resilient cloud platforms.',
    location: 'Phnom Penh, Cambodia, KH',
    email: 'pro.san.dev@gmail.com',
    phone: '+1 (415) 890-4321',
    avatar: '/assets/avatar.svg',
    resumeUrl: '#resume',
    availableForHire: true,
    hireStatusText: 'Open to Remote Opportunities & Relocation',
    experienceYears: 6,
    completedProjects: 38,
    clientSatisfaction: 99,
    happyClients: 24,
    social: {
      linkedin: 'https://linkedin.com',
      telegram: 'https://t.me/kim_san145',
      facebook: 'https://t.me/kim_san145',
      youtube: 'https://youtube.com/@kimsan2000',
      instagram: 'https://t.me/kim_san145',
      whatsapp: 'https://t.me/kim_san145',
      twitter: 'https://twitter.com',
      email: 'pro.san.dev@gmail.com',
    }
  },

  mainMenu: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ],

  mobileMenu: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ],

  navLinks: [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ],

  stats: [
    { label: 'Production Experience', value: '6+ Years', helper: 'Senior level engineering', icon: 'Clock' },
    { label: 'Production Projects', value: '38+', helper: 'Delivered end-to-end', icon: 'Code2' },
    { label: 'Core Technical Stacks', value: '25+', helper: 'Technologies mastered', icon: 'Layers' },
    { label: 'Client Satisfaction', value: '99%', helper: 'Verified reviews & NPS', icon: 'Award' },
    { label: 'Engineering Quality', value: '100%', helper: 'Clean, secure, scalable', icon: 'Star' },
  ]
};
