// ============================================================
//  PORTFOLIO DATA — Eashubh Thapliyal
//  Updated directly from Thapliyal_Eashubh_3yrs_Mobile.pdf
// ============================================================
import projectsJson from './projects.json';

// --- Personal Info ---
export const personalInfo = {
  name: 'Eashubh Thapliyal',
  firstName: 'Eashubh',
  roles: [
    'Android SDE-1',
    'Mobile Systems Engineer',
    'On-Device AI & Mobile Engineer',
    'Cross-Platform Specialist',
  ],
  tagline:
    'Android Engineer with 3+ years of experience building high-performance mobile applications and connecting hardware devices via Bluetooth with Kotlin, Jetpack Compose, and on-device ML.',
  location: 'Dehradun, India',
  email: 'thapliyaleashubh@gmail.com',
  phone: '+91 7500537051',
  resumeUrl: '/Thapliyal_Eashubh_3yrs_Mobile.pdf',
  avatarText: 'ET',
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
    "I'm Eashubh, an Android & Mobile Systems Engineer with 3+ years of production experience building high-performance mobile applications, low-level SDKs, and real-time hardware integrations via Bluetooth.",
    "My core work spans health-tech and enterprise mobile ecosystems—from architecting medical device telemetry streaming at 500Hz to building low-battery 30 FPS screen-sharing SDKs and offline-first storage engines. I specialize in Kotlin, Jetpack Compose, Android Foreground Services, and integrating on-device ML models for low-latency edge inference.",
    "I focus on production-grade engineering: driving crash-free stability to 99.8%, cutting SDK binary sizes under 4MB, securing systems through VAPT audits, and authoring patented cryptographic architectures.",
    "Outside work, I explore photography, robotics competitions, and travelling. I believe exceptional software lives at the intersection of deep systems understanding and intuitive human interaction.",
  ],
  stats: [
    { label: 'Years of Experience', value: 3, suffix: '+' },
    { label: 'Crash-Free Rate', value: 99, suffix: '.8%' },
    { label: 'Apps & SDKs Built', value: 20, suffix: '+' },
    { label: 'National Medals', value: 3, suffix: '' },
  ],
};

// --- Skills Section ---
export const skillsData = {
  heading: 'Technical Stack & Skills',
  subheading:
    'Core competencies in Native Android, Bluetooth & Hardware Telemetry, On-Device ML, and Systems Architecture.',
  cloud: [
    {
      name: 'Android SDK & Frameworks',
      category: 'native',
      icon: 'FaAndroid',
      usages: [
        'Android Foreground Services for uninterrupted 500Hz ECG streaming',
        'System-level runtime window overlays & Media Projection APIs',
      ],
    },
    {
      name: 'Jetpack Compose',
      category: 'native',
      icon: 'FaAndroid',
      usages: [
        'Modern declarative Android UI development with state hoisting',
        'Custom animation pipelines and production-grade reactive layouts',
      ],
    },
    {
      name: 'Kotlin',
      category: 'native',
      icon: 'SiKotlin',
      usages: [
        'Coroutines & Flow for asynchronous reactive event streaming',
        'Native telemetry parsing and low-level hardware kernel modules',
      ],
    },
    {
      name: 'Bluetooth & BLE',
      category: 'native',
      icon: 'FaBluetooth',
      usages: [
        '500Hz real-time medical hardware telemetry streaming and packet parsing',
        'Bidirectional asynchronous BLE routines for Parkinson’s walk aid & IoT smart bottles',
      ],
    },
    {
      name: 'Clean Architecture & MVVM',
      category: 'native',
      icon: 'FaCode',
      usages: [
        'Decoupled domain-driven multi-module mobile architectures',
        'Separation of concerns with Hilt/Dagger dependency injection',
      ],
    },
    {
      name: 'Offline Storage & Room',
      category: 'native',
      icon: 'FaDatabase',
      usages: [
        'Room, Floor (SQLite) & Hive with strict migration schemas',
        'Offline-first synchronization buffering to prevent data loss',
      ],
    },
    {
      name: 'Platform Channels',
      category: 'native',
      icon: 'FaCode',
      usages: [
        'Routing high-frequency medical hardware telemetry to presentation layers',
        'Flutter-to-Native Android system bridging for custom hardware SDKs',
      ],
    },
    {
      name: 'System Optimization & R8',
      category: 'native',
      icon: 'FaCogs',
      usages: [
        'Drove production crash-free rate from 87.4% to 99.8% via memory profiling',
        'ProGuard/R8 optimizations keeping modular SDK binary size under 4MB',
      ],
    },
    {
      name: 'WebSockets & Cobrowse SDK',
      category: 'native',
      icon: 'SiSocketdotio',
      usages: [
        'Low-level Cobrowse Android SDK delivering 30 FPS screen-sharing',
        'High-efficiency collaborative browsing with minimal battery overhead',
      ],
    },
    {
      name: 'Scoped Storage & Security',
      category: 'native',
      icon: 'FaShieldAlt',
      usages: [
        'Tamper-proof encrypted medical PDF report generation under 1.5s',
        'VAPT security patches reinforcing database and local storage encryption',
      ],
    },
    {
      name: 'On-Device ML & Vision',
      category: 'ai-ml',
      icon: 'SiTensorflow',
      usages: [
        'TensorFlow Lite & Android ML Kit for fast on-device inference',
        'PyTorch Mobile, OpenCV, MediaPipe & ONNX Runtime integrations',
      ],
    },
    {
      name: 'Generative AI & LLMs',
      category: 'ai-ml',
      icon: 'FaBrain',
      usages: [
        'Gemini API & OpenAI API integrations with Function / Tool Calling',
        'LangChain, Ollama local model execution, and Vector Database search',
      ],
    },
    {
      name: 'Flutter & Dart',
      category: 'cross-platform',
      icon: 'SiFlutter',
      usages: [
        'Spandan-One cross-platform medical UI and Sipnudge IoT ecosystem',
        'BLoC & Riverpod state management with asynchronous streams',
      ],
    },
    {
      name: 'Java',
      category: 'native',
      icon: 'FaJava',
      usages: [
        'Modular enterprise SDKs for CRM, biometric Attendance, and Document Scanning',
        'Media Projection API routines and low-level system services',
      ],
    },
    {
      name: 'CI/CD & Fastlane',
      category: 'architecture-devops',
      icon: 'SiFastlane',
      usages: [
        'GitLab CI/CD automated test pipelines and release building',
        'Fastlane automation for Google Play Store deployments and artifacts',
      ],
    },
    {
      name: 'Static Analysis & Quality',
      category: 'architecture-devops',
      icon: 'SiSonarqube',
      usages: [
        'SonarQube & SonarLint static analysis enforcing quality gates',
        'Maintained sustained code coverage threshold above 85%',
      ],
    },
    {
      name: 'Docker & AWS Services',
      category: 'architecture-devops',
      icon: 'FaDocker',
      usages: [
        'AWS S3 cloud storage and AWS Lambda serverless metric processing',
        'Containerized environments for reproducible ML pipeline runners',
      ],
    },
    {
      name: 'Rive Animation Engine',
      category: 'architecture-devops',
      icon: 'SiRive',
      usages: [
        'Interactive, physics-based therapeutic game for Parkinson’s rehabilitation',
        'High-performance custom animations meeting cognitive stimulation needs',
      ],
    },
  ],
};

// --- Projects Section ---
export const projectsData = {
  heading: 'Featured Projects',
  subheading: 'Production and standalone mobile engineering work',
  projects: projectsJson,
};

// --- Experience Section ---
export const experienceData = {
  heading: 'Work Experience',
  subheading: 'Production engineering journey across health-tech, enterprise SDKs, and IoT rehabilitation.',
  jobs: [
    {
      role: 'SDE-1 (Android)',
      company: 'Sunfox Technologies Private Limited',
      period: 'April 2025 — Present',
      location: 'Dehradun, India',
      description:
        'Building core Android components for the Spandan-One medical ecosystem. Responsible for real-time ECG streaming, low-level telemetry, security, and enterprise stability.',
      achievements: [
        'Built core Android components for the Spandan-One medical ecosystem, utilizing Android Foreground Services and native optimizations to maintain uninterrupted, real-time ECG streaming and BLE data parsing at 500Hz sampling frequencies.',
        'Developed a reliable offline data layer using native-bridged SQLite storage, implementing strict schemas and data migration strategies to prevent packet loss across major app upgrades.',
        'Integrated the Government of India’s ABHA (Ayushman Bharat) Android SDK and APIs, establishing secure workflows for centralized health records under national digital health standards (NDHM).',
        'Created a native-bridged Android document module handling Scoped Storage, runtime permissions, and encrypted local storage to generate tamper-proof medical PDF reports under 1.5 seconds.',
        'Designed and maintained specialized Platform Channels to route high-frequency medical hardware telemetry directly from native Android kernels to presentation layers, managing distinct product Gradle Build Flavors and Android Manifest variants.',
        'Elevated production application stability by driving the crash-free rate from 87.4% to 99.8%; achieved via profiling memory to eliminate leaks, regulating background threads to prevent race conditions, and optimizing assets for reduced runtime overhead.',
      ],
    },
    {
      role: 'Software Engineer - Android',
      company: 'Smart Connect Technologies Private Limited',
      period: 'November 2023 — April 2025',
      location: 'Mumbai, India',
      description:
        'Developed modular enterprise Android Native SDKs and real-time screen sharing collaborative utilities distributed via GitLab Package Registry.',
      achievements: [
        'Developed modular, lightweight Android Native SDKs for CRM, biometric Attendance, and Document Scanning distributed via the GitLab Package Registry, keeping the binary size overhead under 4MB using ProGuard/R8 optimizations.',
        'Built a low-level Cobrowse Android SDK in Java utilizing Media Projection APIs, Foreground Services, and WebSockets to achieve stable, real-time screen sharing at a consistent 30 FPS with minimal battery drain.',
        'Implemented background execution structures, runtime window overlays, and push notification routines via deep links to improve customer engagement workflows.',
        'Identified and patched high-severity security vulnerabilities during VAPT assessments, reinforcing local data encryption protocols and establishing secure native coding practices.',
        'Automated deployment pipelines and integrated static analysis tools (SonarQube, SonarLint) across the team, maintaining a target threshold of 85% code coverage.',
      ],
    },
    {
      role: 'SDE-I',
      company: 'Lifespark Technologies Private Limited',
      period: 'May 2023 — November 2023',
      location: 'Mumbai, India',
      description:
        'Engineered mobile health rehabilitation aids communicating with wearable hardware devices via Bluetooth Low Energy (BLE) for Parkinson’s patients.',
      achievements: [
        'Owned the development and production deployment of the "Walk" application, a mobile health aid for Parkinson’s patients interacting with wearable hardware via Bluetooth Low Energy (BLE).',
        'Implemented bidirectional asynchronous communication routines over BLE to transmit remote hardware configurations and parse real-time motion sensor feedback arrays.',
        'Configured CI/CD automation deployment setups using GitLab pipelines and Fastlane tools to streamline testing and artifact deliveries.',
        'Developed an interactive, performance-optimized therapeutic game integrated into the app using the Rive animation engine to meet unique cognitive and physical stimulation requirements.',
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
      score: '8.85 / 10.0 CGPA',
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
      institution: 'St Theresa’s Convent Srinagar Garhwal',
      location: 'Pauri Garhwal, Uttarakhand, India',
      period: '2017',
      score: '82.66%',
    },
  ],
  patent: {
    id: '584714',
    title: 'A System and Method of Reliable and Secure Warranty System Using Blockchain',
    issuedDate: '24/03/2026',
    description:
      'A patented decentralized application using Blockchain architecture to ensure secure, cryptographic verification of product warranty claims, eliminating counterfeits and fraud.',
  },
  achievements: [
    {
      title: 'Silver Medallist',
      organization: 'Department of Information Technology, B.Tech (2019–2023)',
      description:
        'Awarded for finishing as one of the top academic performers in the Information Technology branch.',
    },
    {
      title: 'Gold Medallist — Robowars',
      organization: 'Kshitij, IIT Kharagpur (January 2023)',
      description:
        'Won 1st place in the flagship robotics combat event at IIT Kharagpur’s Asia-level tech fest.',
    },
    {
      title: 'Silver Medallist — Automate',
      organization: 'Cognizance, IIT Roorkee (March 2023)',
      description:
        'Secured 2nd place in the automation engineering event at IIT Roorkee’s annual tech festival.',
    },
  ],
};

// --- Contact Section ---
export const contactData = {
  heading: 'Get In Touch',
  subheading:
    'Have an interesting project in mind or want to discuss mobile engineering? Let’s talk.',
  leftHeading: "Let's build something together",
  leftBody:
    'I’m always open to discussing Android SDK design, BLE hardware integration, on-device ML, performance optimizations, or opportunities in mobile SDE roles.',
};

// --- Contact / Social Links ---
export const socialLinks = [
  { name: 'GitHub', icon: 'FaGithub', url: 'https://github.com/Eashubh128' },
  { name: 'LinkedIn', icon: 'FaLinkedin', url: 'https://linkedin.com/in/eashubhthapliyal' },
  { name: 'Email', icon: 'FaEnvelope', url: 'mailto:thapliyaleashubh@gmail.com' },
];
