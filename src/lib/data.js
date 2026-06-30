// ============================================================
//  PORTFOLIO DATA — Edit everything here!
//  Change names, links, text, and data below to make it yours.
// ============================================================

// --- Personal Info ---
export const personalInfo = {
  name: 'Your Name',
  firstName: 'Your',
  roles: ['Frontend Developer', 'React Developer', 'UI Engineer', 'Web Designer'],
  tagline: 'I craft beautiful, performant, and accessible web experiences with modern technologies.',
  location: 'San Francisco, CA',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  resumeUrl: '#', // Link to your resume/CV file
  avatarText: 'YN', // Initials shown in placeholder avatar
};

// --- Navigation Links ---
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

// --- About Section ---
export const aboutData = {
  heading: 'About Me',
  paragraphs: [
    "I'm a passionate frontend developer with a love for creating intuitive and dynamic user experiences. With a strong foundation in modern JavaScript frameworks and a keen eye for design, I bring ideas to life in the browser.",
    'My journey in web development started with simple HTML and CSS pages, and has evolved into building complex, scalable applications with React and Next.js. I\'m always eager to learn new technologies and take on new challenges.',
    'When I\'m not coding, you can find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee while sketching out my next project idea.',
  ],
  stats: [
    { label: 'Years of Experience', value: 5, suffix: '+' },
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Happy Clients', value: 30, suffix: '+' },
    { label: 'GitHub Stars', value: 100, suffix: '+' },
  ],
};

// --- Skills Section ---
// A FLAT, weighted list. `level` (0–100) drives BOTH the visual size and
// weight of each word in the cloud — higher grip = bigger, bolder.
// `icon` is a react-icons export name used by the cursor trail.
export const skillsData = {
  heading: 'Tech Stack & Skills',
  subheading: 'The bigger & bolder the word, the deeper my grip on it',
  cloud: [
    // --- Core Web ---
    { name: 'JavaScript', level: 95, icon: 'SiJavascript' },
    { name: 'TypeScript', level: 88, icon: 'SiTypescript' },
    { name: 'React', level: 95, icon: 'FaReact' },
    { name: 'Next.js', level: 90, icon: 'SiNextdotjs' },
    { name: 'HTML5', level: 98, icon: 'FaHtml5' },
    { name: 'CSS3', level: 95, icon: 'FaCss3Alt' },
    // --- Styling ---
    { name: 'Tailwind CSS', level: 92, icon: 'SiTailwindcss' },
    { name: 'Sass', level: 80, icon: 'SiSass' },
    { name: 'GSAP', level: 82, icon: 'SiGreensock' },
    { name: 'Framer Motion', level: 85, icon: 'SiFramer' },
    // --- Mobile / Android ---
    { name: 'Flutter', level: 88, icon: 'SiFlutter' },
    { name: 'Dart', level: 82, icon: 'SiDart' },
    { name: 'Kotlin', level: 84, icon: 'SiKotlin' },
    { name: 'Android', level: 80, icon: 'FaAndroid' },
    // --- Backend / Cloud ---
    { name: 'Firebase', level: 90, icon: 'SiFirebase' },
    { name: 'AWS', level: 78, icon: 'FaAws' },
    { name: 'Node.js', level: 85, icon: 'FaNodeJs' },
    { name: 'GraphQL', level: 72, icon: 'SiGraphql' },
    // --- Tools / DevOps ---
    { name: 'Git', level: 92, icon: 'FaGitAlt' },
    { name: 'Docker', level: 70, icon: 'FaDocker' },
    { name: 'Figma', level: 80, icon: 'FaFigma' },
    { name: 'Vite', level: 84, icon: 'SiVite' },
    { name: 'Jest', level: 76, icon: 'SiJest' },
  ],
};

// --- Cursor Trail Icons ---
// Tech icons that spawn behind the cursor. Driven by the skill list above,
// but you can override the set here if you want a different mix.
export const trailIconNames = [
  'SiFlutter',
  'SiKotlin',
  'FaAndroid',
  'FaAws',
  'SiFirebase',
  'SiDart',
  'FaReact',
  'SiJavascript',
  'SiTypescript',
  'SiNextdotjs',
  'FaNodeJs',
  'SiTailwindcss',
  'SiGreensock',
];

// --- Projects Section ---
export const projectsData = {
  heading: 'Featured Projects',
  subheading: 'A selection of my recent work and personal projects',
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with cart, wishlist, and Stripe payment integration. Built with Next.js and Tailwind CSS.',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
      github: '#',
      demo: '#',
      featured: true,
    },
    {
      title: 'AI Dashboard',
      description: 'An analytics dashboard with real-time data visualization, dark mode, and customizable widgets powered by AI insights.',
      tags: ['React', 'D3.js', 'Node.js', 'Express'],
      github: '#',
      demo: '#',
      featured: true,
    },
    {
      title: 'Task Management App',
      description: 'A Kanban-style task manager with drag-and-drop, team collaboration, and real-time updates using WebSockets.',
      tags: ['React', 'Socket.io', 'MongoDB', 'Express'],
      github: '#',
      demo: '#',
      featured: false,
    },
    {
      title: 'Weather App',
      description: 'A beautiful weather app with location-based forecasts, animated weather conditions, and 7-day predictions.',
      tags: ['React', 'OpenWeather API', 'CSS3'],
      github: '#',
      demo: '#',
      featured: false,
    },
    {
      title: 'Music Player',
      description: 'A sleek music player with playlists, audio visualizer, and smooth animations. Streams from a custom backend.',
      tags: ['Vue.js', 'Howler.js', 'SCSS'],
      github: '#',
      demo: '#',
      featured: false,
    },
    {
      title: 'Portfolio Template',
      description: 'An open-source portfolio website template with dark mode, blog support, and CMS integration. 500+ GitHub stars.',
      tags: ['Next.js', 'Tailwind', 'Sanity CMS'],
      github: '#',
      demo: '#',
      featured: false,
    },
  ],
};

// --- Experience Section ---
export const experienceData = {
  heading: 'Work Experience',
  subheading: 'My professional journey so far',
  jobs: [
    {
      role: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      period: '2023 — Present',
      description: 'Leading the frontend team in building scalable web applications. Improved performance by 40% and established the component library used across all products.',
      achievements: [
        'Led migration from CRA to Next.js, improving load times by 50%',
        'Built and maintained a reusable component library (50+ components)',
        'Mentored 3 junior developers',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Solutions Co.',
      period: '2021 — 2023',
      description: 'Developed and maintained client web applications using React and TypeScript. Collaborated closely with designers to implement pixel-perfect UIs.',
      achievements: [
        'Delivered 20+ client projects on time',
        'Introduced TypeScript across the codebase, reducing bugs by 30%',
        'Created automated testing pipeline with Jest and Cypress',
      ],
    },
    {
      role: 'Junior Web Developer',
      company: 'StartUp Studio',
      period: '2019 — 2021',
      description: 'Started my career building responsive websites and landing pages. Gained experience in HTML, CSS, JavaScript, and various frontend frameworks.',
      achievements: [
        'Built 30+ responsive landing pages',
        'Learned React and built first SPA application',
        'Collaborated with marketing team on A/B testing',
      ],
    },
  ],
};

// --- Contact Section ---
export const contactData = {
  heading: 'Get In Touch',
  subheading: 'Have a project in mind or just want to say hi? My inbox is always open.',
  leftHeading: "Let's build something together",
  leftBody: "I'm currently available for freelance work and open to new opportunities. Feel free to reach out through the form or any of my social channels.",
};

// --- Contact / Social Links ---
export const socialLinks = [
  { name: 'GitHub', icon: 'FaGithub', url: 'https://github.com/yourusername' },
  { name: 'LinkedIn', icon: 'FaLinkedin', url: 'https://linkedin.com/in/yourusername' },
  { name: 'Twitter', icon: 'FaXTwitter', url: 'https://twitter.com/yourusername' },
  { name: 'Instagram', icon: 'FaInstagram', url: 'https://instagram.com/yourusername' },
];
