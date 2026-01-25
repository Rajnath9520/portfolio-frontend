
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Personal Information
export const PERSONAL_INFO = {
  name: 'Rajnath',
  title: 'Full-Stack Developer building real-world web products.',
  tagline: `I design and develop scalable, user-focused web applications with clean architecture and modern technologies.`,
  email: 'rajnaths9520@gmail.com',
  github: 'https://github.com/Rajnath9520',
  linkedin: 'https://linkedin.com/in/rajnathsingh9520',
  resume: '/Resume.pdf',
};



// Navigation Items
export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  // { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
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
  { value: '4+', label: 'Projects Built & Deployed' },
  { value: '7+', label: 'Technologies Used' },
  { value: '..', label: 'Hands-on experience with real-world applications' },
];

// Expertise Areas
export const EXPERTISE_AREAS = [
  {
    title: 'Full Stack Development',
    description: "Design and build end-to-end web applications using React, Node.js, Express, and MongoDB with a focus on performance and maintainability",
    icon: 'Code',
    color: 'green',
  },
  {
    title: 'Backend & APIs',
    description: "Develop secure REST APIs, implement authentication and authorization, and design scalable database schemas.",
    icon: 'Code',
    color: 'yellow',
  },
  {
    title: 'Cloud',
    description: 'Deploy applications using cloud platforms and containerization tools, ensuring reliability and production readiness.',
    icon: 'Cpu',
    color: 'yellow',
  },
  {
    title: 'UI & User Experience',
    description: 'Create responsive, accessible, and clean user interfaces that prioritize usability and clarity.',
    icon: 'UserCheck',
    color: 'green',
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
