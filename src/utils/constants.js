
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Personal Information
export const PERSONAL_INFO = {
  name: 'Rajnath',
  title: 'Full Stack Developer',
  tagline: `I specialize in building Full-Stack web applications that are fast, reliable and user-friendly. 
            I am  constantly exploring new technologies to refine my skills. Focused on continuous learning, 
            I aim to transition into the IT industry by 2027.`,
  email: 'rajnaths9520@gmail.com',
  github: 'https://github.com/Rajnath9520',
  linkedin: 'https://linkedin.com/in/rajnathsingh9520',
  resume: '/Resume.pdf',
};



// Navigation Items
export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  // { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/projects' },
  { name: 'Achievements', path: '/achievements'},
  // { name: 'Skills', path: '/skills' },
  { name: 'Admin', path: '/login' },
  // { name: 'Dashboard',path:'/dashboard'}
];

// Achievement Categories
export const ACHIEVEMENT_CATEGORIES = [
  "All",
  "Extracurricular Activities",
  "Courses & Certifications",
  "Hackathons",
  "Competitions",
  "Academic Achievements",
];

// Social Links
export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: PERSONAL_INFO.github,
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: PERSONAL_INFO.linkedin,
    icon: 'Linkedin',
  },
  {
    name: 'Email',
    url: `mailto:${PERSONAL_INFO.email}`,
    icon: 'Mail',
  },
];

// About Stats
export const ABOUT_STATS = [
  { value: '5+', label: 'Projects Completed' },
  { value: '5+', label: 'Technologies' },
  { value: '0+', label: 'Years Experience' },
];

// Expertise Areas
export const EXPERTISE_AREAS = [
  {
    title: 'Full Stack',
    description: 'React, Node.js, MongoDB, Express, REST APIs',
    icon: 'Code',
    color: 'green',
  },
  
  {
    title: 'Cloud',
    description: 'AWS, Docker, Cloudinary, Render',
    icon: 'Cpu',
    color: 'yellow',
  },
];

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

// Project Categories
export const PROJECT_CATEGORIES = [
  'All',
  'AI/ML',
  'Full Stack',
  'Backend',
  'Frontend',
  'Other',
];

export default {
  API_BASE_URL,
  PERSONAL_INFO,
  ACHIEVEMENT_CATEGORIES,
  NAV_ITEMS,
  SOCIAL_LINKS,
  ABOUT_STATS,
  EXPERTISE_AREAS,
  ANIMATION_VARIANTS,
  PROJECT_CATEGORIES,
};
