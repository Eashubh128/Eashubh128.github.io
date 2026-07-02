// ============================================================
//  PORTFOLIO DATA — Eashubh Thapliyal
//  Contains skills, experience, projects, education, patents,
//  and achievements extracted from the professional resume.
// ============================================================

// --- Personal Info ---
export const personalInfo = {
  name: 'Eashubh Thapliyal',
  firstName: 'Eashubh',
  roles: ['Android SDE-1', 'Flutter Developer', 'Mobile Systems Engineer', 'Cross-Platform Specialist'],
  tagline: 'Building high-performance, real-time medical & consumer mobile ecosystems with Kotlin, Flutter, and native Android integrations.',
  location: 'Dehradun, India',
  email: 'thapliyaleashubh@gmail.com',
  phone: '+91 7500537051',
  resumeUrl: '/Eashubh_Thapliyal_Resume.pdf', // Link to your resume/CV file
  avatarText: 'ET', // Initials shown in placeholder avatar
};

// --- Navigation Links ---
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

// --- About Section ---
export const aboutData = {
  heading: 'About Me',
  paragraphs: [
    "Hey! I'm Eashubh, a mobile engineer who loves turning ideas into products people enjoy using.",
    "I spend most of my time building Android and Flutter applications, especially products that involve hardware, Bluetooth communication, and real-time data. I enjoy solving challenging engineering problems, but I'm just as passionate about the little details—clean architecture, smooth animations, intuitive user experiences, and writing code that's easy to maintain.",
    "I'm naturally curious, so I'm always learning something new, experimenting with different technologies, or working on side projects that push me outside my comfort zone. I believe the best software comes from understanding both the technology and the people using it.",
    "Outside of engineering, I love travelling, photography, good coffee, and exploring new places. I'm always up for a conversation about technology, startups, design, or the next place worth visiting.",
    "At the end of the day, I simply enjoy building things that make life a little easier—and having fun while doing it.",
  ],
  stats: [
    { label: 'Years of Experience', value: 3, suffix: '+' },
    { label: 'Crash-Free Rate', value: 99, suffix: '.2%' },
    { label: 'Apps Built', value: 20, suffix: '+' },
    { label: 'National Medals', value: 3, suffix: '' },
  ],
};

// --- Skills Section ---
export const skillsData = {
  heading: 'Tech Stack & Skills',
  subheading: 'A detailed breakdown of my engineering capabilities and technical stack.',
  cloud: [
    { name: 'Flutter', level: 95, icon: 'SiFlutter', category: 'cross-platform', usages: ['Core architecture of Spandan-One ecosystem', 'BLoC & Riverpod State Management'] },
    { name: 'Android SDK', level: 95, icon: 'FaAndroid', category: 'native', usages: ['Android Foreground Services for uninterrupted streaming', 'System-level runtime window overlay controls'] },
    { name: 'Kotlin', level: 93, icon: 'SiKotlin', category: 'native', usages: ['High-performance native Android kernel modules', 'Low-level hardware telemetry data parsing'] },
    { name: 'Dart', level: 92, icon: 'SiDart', category: 'cross-platform', usages: ['Bidirectional BLE asynchronous communications', 'Real-time motion sensor feedback parsing'] },
    { name: 'Clean Architecture', level: 92, icon: 'FaCode', category: 'architecture-devops', usages: ['Decoupled domain-driven mobile architectures', 'Separation of concerns for offline-first syncing'] },
    { name: 'Offline Caching', level: 90, icon: 'FaDatabase', category: 'cross-platform', usages: ['Floor (SQLite) offline database and schema migrations', 'Hive (NoSQL) local secure transaction caching'] },
    { name: 'Platform Channels', level: 92, icon: 'FaCode', category: 'native', usages: ['High-frequency medical hardware telemetry routing', 'Flutter-to-Native Android system bridging'] },
    { name: 'Firebase', level: 85, icon: 'SiFirebase', category: 'cross-platform', usages: ['Firebase SDK real-time database integrations', 'Crashlytics for production memory profiling and logs'] },
    { name: 'Bluetooth & BLE', level: 92, icon: 'FaBluetooth', category: 'cross-platform', usages: ['Wearable sensor integration for Parkinson\'s walk aid', 'IoT smart hydration bottle tracking and syncing'] },
    { name: 'WebSockets / Socket.io', level: 88, icon: 'SiSocketdotio', category: 'cross-platform', usages: ['30 FPS real-time screen-sharing Cobrowse Android SDK', 'Collaborative browsing overlay routines'] },
    { name: 'Scoped Storage', level: 92, icon: 'FaShieldAlt', category: 'cross-platform', usages: ['Encrypted medical PDF report generation under 1.5s', 'Android scoped storage and secure directory restrictions'] },
    { name: 'System Optimization', level: 90, icon: 'FaCogs', category: 'native', usages: ['Driving crash-free rate from 87.4% to 99.8%', 'Profiling memory leaks and regulating background threads'] },
    { name: 'Java', level: 85, icon: 'FaJava', category: 'native', usages: ['Low-level CRM and biometric attendance SDKs', 'Biometric scanner hardware integration modules'] },
    { name: 'Build Flavors', level: 90, icon: 'FaCogs', category: 'native', usages: ['Managing distinct product Gradle configurations', 'Handling environment-specific AndroidManifest variants'] },
    { name: 'CI/CD Pipelines', level: 88, icon: 'SiGitlab', category: 'architecture-devops', usages: ['Automating test execution pipelines on GitLab CI', 'VAPT security assessment code scanning pipelines'] },
    { name: 'Fastlane', level: 85, icon: 'SiFastlane', category: 'architecture-devops', usages: ['Automated app release building and Play Store deployment', 'Test artifact deliveries pipeline integration'] },
    { name: 'Docker', level: 75, icon: 'FaDocker', category: 'architecture-devops', usages: ['Containerized machine learning pipeline environments', 'Reproducible metrics processing runner builds'] },
    { name: 'AWS Services', level: 78, icon: 'FaAws', category: 'architecture-devops', usages: ['AWS S3 cloud storage for user mobility reports', 'AWS Lambda serverless processing of motion metrics'] },
    { name: 'SonarQube', level: 84, icon: 'SiSonarqube', category: 'architecture-devops', usages: ['Enforcing code quality gates & static analysis rules', 'Maintaining target threshold of 85% test coverage'] },
    { name: 'Rive Animations', level: 82, icon: 'SiRive', category: 'architecture-devops', usages: ['Physics-based Football therapy game for Parkinson\'s', 'Interactive cognitive stimulation elements'] }
  ]
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
  subheading: 'A selection of my recent work and engineering projects',
  projects: [
    {
      title: 'Sipnudge (IoT Hydration Tracking)',
      description: 'Designed and engineered a standalone, Flutter-based IoT hydration tracking application communicating with smart bottles via BLE. Features local alarm schedules synced with Google Calendar and an offline-first synchronization engine.',
      tags: ['Flutter', 'Kotlin', 'Android SDK', 'BLE', 'Google Calendar API'],
      github: '#',
      demo: '#',
      featured: true,
    },
    {
      title: 'Walk (Parkinson\'s Mobile Aid)',
      description: 'Led the product development and deployment of "Walk", a mobile health aid for Parkinson\'s patients. Interfaces with wearable hardware via BLE to process real-time sensor feedback. Includes a custom therapeutic game built using Rive.',
      tags: ['Flutter', 'BLE', 'Rive', 'GitLab CI/CD', 'Fastlane'],
      github: '#',
      demo: '#',
      featured: true,
    },
    {
      title: 'Spandan-One Medical Ecosystem',
      description: 'Built core components for real-time ECG monitoring. Features Foreground Services with 500Hz sampling telemetry, Platform Channels for hardware-to-UI bridging, Floor (SQLite) schema migration, and encrypted PDF generation.',
      tags: ['Android SDK', 'Kotlin', 'BLoC', 'Floor (SQLite)', 'Scoped Storage'],
      github: '#',
      demo: '#',
      featured: true,
    },
    {
      title: 'Cobrowse Android SDK',
      description: 'A low-level collaborative browsing Android SDK (Java) and iOS framework (Swift) utilizing Media Projection APIs, Foreground Services, and WebSockets to achieve 30 FPS screen sharing with minimal battery drain.',
      tags: ['Java', 'Swift', 'Socket.io', 'MediaProjection', 'WebSockets'],
      github: '#',
      demo: '#',
      featured: false,
    },
    {
      title: 'Configurable Metrics Dashboard',
      description: 'Developed an efficient Multi-Application Configurable Dashboard for enterprise clients (like Aditya Birla, TVS, Motilal Oswal) to monitor metrics of multiple apps simultaneously with dynamic charts and local encryption.',
      tags: ['Flutter', 'BLoC', 'Streams', 'Data Encryption', 'Dynamic Charts'],
      github: '#',
      demo: '#',
      featured: false,
    },
    {
      title: 'Warranty System (Patented Blockchain)',
      description: 'Created a decentralized, secure, and reliable warranty system utilizing Blockchain ledger technology to prevent counterfeit claims and automate product verification.',
      tags: ['Blockchain', 'Cryptography', 'Smart Contracts', 'Security'],
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
      role: 'SDE-1 (Android)',
      company: 'Sunfox Technologies Private Limited',
      period: 'April 2025 — Present',
      description: 'Building and scaling the Spandan-One medical ecosystem for real-time ECG monitoring. Focused on low-level telemetry, security, and premium UI stability.',
      achievements: [
        'Optimized Android Foreground Services and BLE parsing to support uninterrupted ECG streaming at 500Hz.',
        'Designed a high-performance offline data layer using Floor (SQLite) and Hive (NoSQL) with strict migration schemas.',
        'Integrated Government of India\'s ABHA SDK/APIs, securing centralized health records under national standards.',
        'Developed a secure medical PDF document generator handling Scoped Storage, runtime permissions, and local encryption under 1.5s.',
        'Elevated app stability to a 99.9% crash-free rate (up from 87.4%) by profiling memory and regulating background threads.',
      ],
    },
    {
      role: 'Software Engineer - Android & Flutter',
      company: 'SmartConnect Technologies Private Limited',
      period: 'November 2023 — March 2025',
      description: 'Developed enterprise Android SDKs and modular client applications using Flutter, Kotlin, and Java. Implemented web-sockets collaborative utilities and VAPT security protocols.',
      achievements: [
        'Engineered modular SDKs for CRM, biometric Attendance, and Document scanning, optimizing binary size to under 4MB.',
        'Built a 30 FPS low-battery screen-sharing Cobrowse Android SDK utilizing Media Projection APIs and WebSockets.',
        'Delivered cross-platform CRM apps and migrated a legacy Xamarin codebase to Flutter, boosting maintenance by 90%.',
        'Resolved critical VAPT vulnerabilities, reinforcing database and storage encryption.',
        'Automated deployments using SonarQube & SonarLint, keeping test coverage above a target of 85%.',
      ],
    },
    {
      role: 'SDE - I (Mobile)',
      company: 'Lifespark Technologies Private Limited',
      period: 'July 2023 — October 2023',
      description: 'Developed Parkinson\'s disease mobile rehabilitation aids communicating with wearable hardware devices via BLE.',
      achievements: [
        'Owned development and Play/App Store deployment of "Walk" application.',
        'Implemented bidirectional BLE data parsing routines to transmit configs and capture real-time motion sensor feedback.',
        'Created an interactive, physics-based Football therapy game using the Rive animation engine.',
        'Configured CI/CD testing pipelines and Fastlane deployment scripts on GitLab.',
      ],
    },
  ],
};

// --- Credentials Section (Education, Patents, Achievements) ---
export const credentialsData = {
  education: [
    {
      degree: 'Bachelor of Technology in Information Technology',
      institution: 'Graphic Era Deemed To Be University',
      location: 'Dehradun, Uttarakhand, India',
      period: '2019 — 2023',
      score: '8.85 CGPA',
    },
    {
      degree: 'Senior Secondary (CBSE - XII)',
      institution: 'Rainbow Public School Chauras',
      location: 'Tehri Garhwal, Uttarakhand, India',
      period: '2019',
      score: '72.6%',
    },
    {
      degree: 'Higher Secondary (ICSE - X)',
      institution: 'St Theresa\'s Convent Srinagar Garhwal',
      location: 'Pauri Garhwal, Uttarakhand, India',
      period: '2017',
      score: '82.66%',
    },
  ],
  patent: {
    id: '584714',
    title: 'A System and Method of Reliable and Secure Warranty System Using Blockchain',
    issuedDate: '24/03/2026',
    description: 'A patented decentralized application using Blockchain architecture to ensure secure, cryptographic verification of product warranty claims, eliminating counterfeits and fraud.',
  },
  achievements: [
    {
      title: 'Silver Medallist',
      organization: 'Department of Information Technology, B.Tech (2019-2023)',
      description: 'Awarded for finishing as one of the top academic performers in the Information Technology branch.',
    },
    {
      title: 'Gold Medallist — Robowars',
      organization: 'Kshitij, IIT Kharagpur (January 2023)',
      description: 'Won 1st place in the flagship robotics combat event at IIT Kharagpur\'s Asia-level tech fest.',
    },
    {
      title: 'Silver Medallist — Automate',
      organization: 'Cognizance, IIT Roorkee (March 2023)',
      description: 'Secured 2nd place in the automation engineering event at IIT Roorkee\'s annual tech festival.',
    },
  ],
};

// --- Contact Section ---
export const contactData = {
  heading: 'Get In Touch',
  subheading: 'Have an interesting project in mind or want to discuss mobile engineering? Let\'s talk.',
  leftHeading: "Let's build something together",
  leftBody: "I'm always open to discussing mobile development, SDK design, performance optimizations, or opportunities in SDE roles. Reach out via email, phone, or connect on social media.",
};

// --- Contact / Social Links ---
export const socialLinks = [
  { name: 'GitHub', icon: 'FaGithub', url: 'https://github.com/Eashubh128' },
  { name: 'LinkedIn', icon: 'FaLinkedin', url: 'https://linkedin.com/in/eashubhthapliyal' },
  { name: 'Email', icon: 'FaEnvelope', url: 'mailto:thapliyaleashubh@gmail.com' },
];
