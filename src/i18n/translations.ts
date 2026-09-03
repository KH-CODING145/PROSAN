import { Locale, TranslationDictionary } from './types';

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.education': 'Education',
    'nav.certificates': 'Certificates',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',
    'nav.resumeCv': 'Resume / CV',
    'nav.getInTouch': 'Get in Touch',
    'nav.github': 'GitHub',
    'nav.youtube': 'YouTube',
    'nav.navigation': 'Navigation',

    // Hero Section
    'hero.available': 'Available for Projects',
    'hero.greeting': "Hi, I'm",
    'hero.name': 'PRO SAN',
    'hero.title': 'Senior Software Engineer & AI Developer',
    'hero.specializing': 'Specializing in AI Systems • Scalable Architecture • Automation',
    'hero.desc': 'I build modern web applications, automation tools, AI-powered products, and scalable digital solutions with deliberate craftsmanship.',
    'hero.quote': '“I don\'t just write code. I design systems.”',
    'hero.experienceBadge': '6+ Years Production Systems',
    'hero.viewWork': 'View My Work',
    'hero.downloadResume': 'Download Resume',
    'hero.support': 'Support',
    'hero.connectWithMe': 'Connect with me',
    'hero.location': 'Phnom Penh, Cambodia',
    'hero.yearsExperience': 'Years Production Experience',
    'hero.systemsDesigned': 'Production Systems Delivered',
    'hero.hireStatus': 'Open to Remote Opportunities & Relocation',

    // Section Headers
    'section.projects.tag': 'Featured Case Studies',
    'section.projects.title': 'Featured Projects & Systems',
    'section.projects.desc': 'Explore production-ready full-stack applications, intelligent AI workflows, and enterprise automation tools.',

    'section.services.tag': 'What I Deliver',
    'section.services.title': 'Core Engineering Services',
    'section.services.desc': 'Scalable, high-performance software solutions tailored for modern businesses and high-growth platforms.',

    'section.skills.tag': 'Technical Competencies',
    'section.skills.title': 'Skills & Technology Stack',
    'section.skills.desc': 'Comprehensive matrix of languages, frameworks, cloud infrastructures, and AI tools I use daily.',

    'section.experience.tag': 'Career Journey',
    'section.experience.title': 'Work Experience & Impact',
    'section.experience.desc': 'Track record of engineering robust systems, scaling microservices, and deploying intelligent AI solutions.',

    'section.education.tag': 'Academic Foundation',
    'section.education.title': 'Education & Continuous Research',
    'section.education.desc': 'Rigorous computer science foundation complemented by continuous modern software research.',

    'section.certificates.tag': 'Verified Accreditations',
    'section.certificates.title': 'Licenses & Certifications',
    'section.certificates.desc': 'Industry-standard qualifications and accredited technical certifications.',

    'section.articles.tag': 'Technical Insights',
    'section.articles.title': 'Engineering Blog & Articles',
    'section.articles.desc': 'In-depth architectural breakdowns, practical tutorials, and thoughts on AI engineering.',

    'section.contact.tag': 'Get in Touch',
    'section.contact.title': "Let's Build Something Great",
    'section.contact.desc': 'Have a project in mind, an architectural challenge, or looking for an experienced software engineer? Send a message.',

    // Common UI Labels
    'common.all': 'All',
    'common.viewAll': 'View All',
    'common.liveDemo': 'Live Demo',
    'common.github': 'GitHub',
    'common.details': 'Details',
    'common.backToTop': 'Top',
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.share': 'Share',
    'common.loading': 'Loading...',
    'common.close': 'Close',
    'common.print': 'Print',
    'common.popular': 'Popular',
    'common.trending': 'Trending',
    'common.views': 'views',

    // Contact Form
    'contact.nameLabel': 'Your Name',
    'contact.emailLabel': 'Email Address',
    'contact.subjectLabel': 'Subject',
    'contact.messageLabel': 'Message',
    'contact.sendBtn': 'Send Message',
    'contact.sendingBtn': 'Sending...',
    'contact.successMsg': 'Message sent successfully! I will respond promptly.',
    'contact.directContact': 'Direct Contact Channels',

    // Footer
    'footer.tagline': 'Senior Software Engineer & AI Developer specializing in scalable architectures, intelligent agents, and resilient cloud systems.',
    'footer.rights': 'All rights reserved.',
    'footer.backToTop': 'Back to Top',
    'footer.builtWith': 'Engineered with React 19, TypeScript & Tailwind CSS',

    // Language
    'lang.label': 'Language',
    'lang.en': 'English',
    'lang.km': 'ភាសាខ្មែរ',
    'lang.switch': 'Switch Language',
    'lang.shortEn': 'EN',
    'lang.shortKm': 'ខ្មែរ',
  },
  km: {
    // Navigation
    'nav.home': 'ទំព័រដើម',
    'nav.about': 'អំពីខ្ញុំ',
    'nav.skills': 'ជំនាញ',
    'nav.experience': 'បទពិសោធន៍',
    'nav.projects': 'គម្រោង',
    'nav.services': 'សេវាកម្ម',
    'nav.education': 'ការអប់រំ',
    'nav.certificates': 'សញ្ញាបត្រ',
    'nav.blog': 'អត្ថបទ',
    'nav.contact': 'ទំនាក់ទំនង',
    'nav.resume': 'ប្រវត្តិរូប',
    'nav.resumeCv': 'ប្រវត្តិរូប / CV',
    'nav.getInTouch': 'ទាក់ទងមកខ្ញុំ',
    'nav.github': 'GitHub',
    'nav.youtube': 'YouTube',
    'nav.navigation': 'មឺនុយរុករក',

    // Hero Section
    'hero.available': 'ត្រៀមខ្លួនសម្រាប់គម្រោងថ្មី',
    'hero.greeting': 'សួស្តី ខ្ញុំឈ្មោះ',
    'hero.name': 'PRO SAN',
    'hero.title': 'Senior Software Engineer & AI Developer',
    'hero.specializing': 'ជំនាញប្រព័ន្ធ AI • ស្ថាបត្យកម្មកម្រិតខ្ពស់ • ស្វ័យប្រវត្តិកម្ម',
    'hero.desc': 'ខ្ញុំបង្កើតកម្មវិធីគេហទំព័រទំនើប ឧបករណ៍ស្វ័យប្រវត្តិកម្ម ប្រព័ន្ធឆ្លាតវៃ AI និងដំណោះស្រាយឌីជីថលកម្រិតខ្ពស់សម្រាប់ Production។',
    'hero.quote': '«ខ្ញុំមិនត្រឹមតែសរសេរកូដនោះទេ ខ្ញុំរចនាប្រព័ន្ធទាំងមូល។»',
    'hero.experienceBadge': 'បទពិសោធន៍ 6+ ឆ្នាំលើប្រព័ន្ធ Production',
    'hero.viewWork': 'មើលស្នាដៃខ្ញុំ',
    'hero.downloadResume': 'ទាញយកប្រវត្តិរូប',
    'hero.support': 'ការគាំទ្រ',
    'hero.connectWithMe': 'បណ្តាញទំនាក់ទំនង',
    'hero.location': 'រាជធានីភ្នំពេញ កម្ពុជា',
    'hero.yearsExperience': 'ឆ្នាំនៃបទពិសោធន៍វិស្វកម្ម',
    'hero.systemsDesigned': 'ប្រព័ន្ធសម្រេចបានជោគជ័យ',
    'hero.hireStatus': 'បើកទទួលឱកាសការងារពីចម្ងាយ & ការផ្លាស់ប្តូរទីកន្លែង',

    // Section Headers
    'section.projects.tag': 'ករណីសិក្សាឆ្នើម',
    'section.projects.title': 'គម្រោង & ស្នាដៃបច្ចេកវិទ្យា',
    'section.projects.desc': 'ស្វែងយល់ពីកម្មវិធី Full-Stack ជាក់ស្តែង ប្រព័ន្ធ AI ឆ្លាតវៃ និងឧបករណ៍ស្វ័យប្រវត្តិកម្មអាជីវកម្ម។',

    'section.services.tag': 'អ្វីដែលខ្ញុំផ្តល់ជូន',
    'section.services.title': 'សេវាកម្មវិស្វកម្មស្នូល',
    'section.services.desc': 'ដំណោះស្រាយសូហ្វវែរមានប្រសិទ្ធភាពខ្ពស់ សុវត្ថិភាព និងភាពធន់ សម្របតាមតម្រូវការអាជីវកម្មទំនើប។',

    'section.skills.tag': 'សមត្ថភាពបច្ចេកទេស',
    'section.skills.title': 'ជំនាញ & បច្ចេកវិទ្យាដែលប្រើប្រាស់',
    'section.skills.desc': 'បណ្តុំភាសាសរសេរកូដ Framework ហេដ្ឋារចនាសម្ព័ន្ធ Cloud និងឧបករណ៍ AI ដែលខ្ញុំប្រើប្រាស់ប្រចាំថ្ងៃ។',

    'section.experience.tag': 'ដំណើរវិជ្ជាជីវៈ',
    'section.experience.title': 'ប្រវត្តិការងារ & បទពិសោធន៍ជាក់ស្តែង',
    'section.experience.desc': 'កំណត់ត្រាជោគជ័យក្នុងការកសាងប្រព័ន្ធរឹងមាំ ការពង្រីក Microservices និងការដាក់ឱ្យដំណើរការដំណោះស្រាយ AI។',

    'section.education.tag': 'មូលដ្ឋានគ្រឹះសិក្សា',
    'section.education.title': 'ការអប់រំ & ការស្រាវជ្រាវបន្ត',
    'section.education.desc': 'មូលដ្ឋានគ្រឹះវិទ្យាសាស្ត្រកុំព្យូទ័ររឹងមាំ រួមផ្សំការស្រាវជ្រាវបច្ចេកវិទ្យាកម្រិតខ្ពស់ឥតឈប់ឈរ។',

    'section.certificates.tag': 'វិញ្ញាបនបត្របញ្ជាក់សមត្ថភាព',
    'section.certificates.title': 'សញ្ញាបត្រ & ការបញ្ជាក់ជំនាញ',
    'section.certificates.desc': 'លិខិតបញ្ជាក់សមត្ថភាពកម្រិតស្តង់ដារអន្តរជាតិ និងវិញ្ញាបនបត្របច្ចេកទេសផ្លូវការ។',

    'section.articles.tag': 'អត្ថបទបច្ចេកវិទ្យា',
    'section.articles.title': 'ប្លុក & ការចែករំលែកបច្ចេកទេស',
    'section.articles.desc': 'ការវិភាគស្ថាបត្យកម្មប្រព័ន្ធស៊ីជម្រៅ មេរៀនអនុវត្តជាក់ស្តែង និងការយល់ដឹងអំពីវិស្វកម្ម AI។',

    'section.contact.tag': 'ទាក់ទងមកខ្ញុំ',
    'section.contact.title': 'តោះចាប់ផ្តើមសហការកសាងគម្រោងថ្មី',
    'section.contact.desc': 'មានគំនិតអាជីវកម្ម បញ្ហាស្ថាបត្យកម្មប្រព័ន្ធ ឬស្វែងរកវិស្វករសូហ្វវែរជំនាញ? សូមផ្ញើសារមកកាន់ខ្ញុំ។',

    // Common UI Labels
    'common.all': 'ទាំងអស់',
    'common.viewAll': 'មើលទាំងអស់',
    'common.liveDemo': 'សាកល្បងផ្ទាល់',
    'common.github': 'កូដ GitHub',
    'common.details': 'ព័ត៌មានលម្អិត',
    'common.backToTop': 'ឡើងលើ',
    'common.search': 'ស្វែងរក...',
    'common.filter': 'ចម្រាញ់',
    'common.share': 'ចែករំលែក',
    'common.loading': 'កំពុងដំណើរការ...',
    'common.close': 'បិទ',
    'common.print': 'បោះពុម្ព',
    'common.popular': 'ពេញនិយម',
    'common.trending': 'កំពុងពេញនិយម',
    'common.views': 'ដងទស្សនា',

    // Contact Form
    'contact.nameLabel': 'ឈ្មោះរបស់អ្នក',
    'contact.emailLabel': 'អាសយដ្ឋានអ៊ីមែល',
    'contact.subjectLabel': 'ប្រធានបទ',
    'contact.messageLabel': 'ខ្លឹមសារសារ',
    'contact.sendBtn': 'ផ្ញើសារឥឡូវនេះ',
    'contact.sendingBtn': 'កំពុងផ្ញើ...',
    'contact.successMsg': 'សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ! ខ្ញុំនឹងឆ្លើយតបវិញឆាប់ៗ។',
    'contact.directContact': 'បណ្តាញទំនាក់ទំនងផ្ទាល់',

    // Footer
    'footer.tagline': 'Senior Software Engineer & AI Developer ជំនាញស្ថាបត្យកម្មប្រព័ន្ធ AI Agents និងប្រព័ន្ធ Cloud ធន់ខ្ពស់។',
    'footer.rights': 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
    'footer.backToTop': 'ត្រឡប់ទៅលើវិញ',
    'footer.builtWith': 'រចនាឡើងដោយ React 19, TypeScript & Tailwind CSS',

    // Language
    'lang.label': 'ភាសា',
    'lang.en': 'English',
    'lang.km': 'ភាសាខ្មែរ',
    'lang.switch': 'ប្តូរភាសា',
    'lang.shortEn': 'EN',
    'lang.shortKm': 'ខ្មែរ',
  }
};
