export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages' | 'Frontend & Web' | 'AI & Data' | 'Hardware & Tools';
  focus: string;
  summary: string;
  iconKey: 'cpp' | 'python' | 'react' | 'javascript' | 'github' | 'ai' | 'iiot' | 'comm';
}

export interface ProjectItem {
  id: string;
  title: string;
  domain: string;
  year: string;
  image: string;
  summary: string;
  highlights: string[];
  stack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  isLive?: boolean;
  audioNarration: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  shortTitle: string;
  issuer: string;
  category: 'AI & GenAI' | 'Engineering & Core' | 'Professional & IP';
  dateLabel: string;
  durationOrScore: string;
  credentialId: string;
  gradeOrTrack?: string;
  description: string;
  verifyUrl?: string;
  fileUrl: string;
  downloadName: string;
  fileType: 'pdf' | 'image';
  issuerKey: 'nptel' | 'adobe' | 'smartbridge' | 'imarticus-cpp' | 'imarticus-comm' | 'pms';
}

export const HARSH_PROFILE = {
  fullName: 'Harsh Pramod Patil',
  brandName: 'HARSH PATIL',
  roleHeadline: 'Building AI Systems, Full-Stack Web Apps & Smart Automation.',
  shortBio:
    'Engineering undergraduate at Dr. D. Y. Patil College of Engineering & Innovation, Pune. Combining strong foundations in C, C++, Python, and React with certified experience in BFSI AI analytics, Generative AI workflows, and Robotics with Industrial IoT.',
  voiceBioScript:
    'Hello, I am Harsh Pramod Patil, an engineering student at Dr. D. Y. Patil College of Engineering and Innovation in Pune. I build software at the intersection of artificial intelligence, modern React web applications, C and C++ systems programming, and industrial automation with IIoT. Through my SmartBridge and NASSCOM AI Specialist BFSI internship, Adobe Generative AI training, and IIT Madras NPTEL coursework, I focus on turning complex technical concepts into clean, reliable, real-world products.',
  email: 'harshpatil5787@gmail.com',
  location: 'Pune, Maharashtra, India',
  college: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune',
  githubUrl: 'https://github.com/harshpatil-ai',
  linkedinUrl: 'https://www.linkedin.com/in/harsh-patil-55a610383/',
  instagramUrl: 'https://www.instagram.com/harsh_p69247/',
  portraitImage: '/assets/aistudio/IMG_20251028_151113_094e13a5.jpg',
};

export const ABOUT_PILLARS = [
  {
    id: 'biography',
    number: '01',
    title: 'Biography & Profile',
    lead: 'Disciplined problem solver driven by curiosity and clean engineering.',
    body: 'I am Harsh Pramod Patil, a driven engineering student based in Pune with a passion for writing crisp software and designing intelligent systems. From foundational logic in C and C++ to responsive user interfaces in React and JavaScript, I enjoy owning the full engineering journey—from concept to verified deployment.',
    highlights: [
      'Strong foundation in structured programming & algorithms',
      'Hands-on exposure to Generative AI & BFSI financial workflows',
      'Grade A+ certified in professional Business Communication',
    ],
  },
  {
    id: 'education',
    number: '02',
    title: 'Education & Journey',
    lead: 'Dr. D. Y. Patil College of Engineering & Innovation, Pune.',
    body: 'Currently pursuing Engineering (First Year Engineering, Varale Campus), I actively complement my university curriculum with industry-recognized credentials—including a Virtual Internship in AI Specialist (BFSI) with SmartBridge & NASSCOM FutureSkills Prime, IIT Madras NPTEL Elite certification, and hands-on IIoT robotics training.',
    highlights: [
      'B.E. Engineering — Dr. D. Y. Patil College of Engineering & Innovation',
      'NPTEL Elite Scholar — IIT Madras (71% Consolidated Score)',
      'NASSCOM FutureSkills Prime × SmartBridge AI Intern (2026)',
    ],
  },
  {
    id: 'passions',
    number: '03',
    title: 'Focus Areas & Passions',
    lead: 'Where software intelligence meets real-world physical & financial impact.',
    body: 'My focus sits at the intersection of Applied AI, Full-Stack Web Engineering, and Cyber-Physical Systems. Whether developing fraud and risk detection pipelines, crafting accessible React interfaces, or integrating industrial IIoT sensors with robotics controllers, I strive for precision and measurable value.',
    highlights: [
      'Applied AI, Risk Analytics & Generative AI Content Systems',
      'Modern Frontend Architecture with React, JavaScript & Motion',
      'Industrial Automation, Robotics & Edge IIoT Integration',
    ],
  },
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'cpp',
    name: 'C & C++',
    category: 'Languages',
    focus: 'Systems & Data Structures',
    summary:
      'Grade A certified proficiency via Imarticus Learning & NSDC. Memory management, OOP architecture, STL, and algorithmic problem solving.',
    iconKey: 'cpp',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'AI & Data',
    focus: 'AI Pipelines & Analytics',
    summary:
      'Data preprocessing, financial risk modeling, fraud pattern analysis, and rapid backend scripting for intelligent automation workflows.',
    iconKey: 'python',
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend & Web',
    focus: 'Component Architecture',
    summary:
      'Building responsive, accessible single-page applications with hooks, Framer Motion transitions, and clean state management.',
    iconKey: 'react',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend & Web',
    focus: 'Interactive Web & APIs',
    summary:
      'Modern ES2022+ JavaScript, asynchronous REST integrations, browser audio playback, and interactive DOM experiences.',
    iconKey: 'javascript',
  },
  {
    id: 'genai',
    name: 'Generative AI & BFSI AI',
    category: 'AI & Data',
    focus: 'Risk, Fraud & Multimodal AI',
    summary:
      'Trained via Adobe (Coursera) and SmartBridge + NASSCOM Virtual Internship in AI for financial services, risk scoring, and generative workflows.',
    iconKey: 'ai',
  },
  {
    id: 'github',
    name: 'Git & GitHub',
    category: 'Hardware & Tools',
    focus: 'Version Control & Collaboration',
    summary:
      'Structured branching, pull-request reviews, documentation, and clean repository workflows for team and academic engineering projects.',
    iconKey: 'github',
  },
  {
    id: 'iiot',
    name: 'Robotics & IIoT',
    category: 'Hardware & Tools',
    focus: 'Industrial Automation',
    summary:
      'Hands-on industrial training at PMS Robotics Research Center on robotic actuation, industrial sensor telemetry, and IIoT workflows.',
    iconKey: 'iiot',
  },
  {
    id: 'communication',
    name: 'Technical Communication',
    category: 'Hardware & Tools',
    focus: 'Leadership & IP Strategy',
    summary:
      'Grade A+ certified in Business Communication alongside IIT Madras training in Managing Intellectual Property in Universities.',
    iconKey: 'comm',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'personal-finance-advisor-bot',
    title: 'Personal Finance Advisor Bot',
    domain: 'Live AI FinTech App',
    year: '2026',
    isLive: true,
    image: '/src/assets/images/project_bfsi_ai_1795167042080.jpg',
    summary:
      'A live conversational AI financial assistant built to help users manage budgets, track spending habits, plan savings goals, and receive personalized money-management guidance in real time.',
    highlights: [
      'Interactive AI advisor tailored for budgeting, expense categorization, and savings strategies',
      'Structured financial planning guidance aligned with practical BFSI and personal finance workflows',
      'Deployed as a live interactive web app with open-source codebase on GitHub',
    ],
    stack: ['React', 'JavaScript', 'Gemini AI', 'FinTech', 'Conversational UI'],
    githubUrl: 'https://github.com/harshpatil-ai/personal-finance-advisor-bot',
    liveDemoUrl:
      'https://aistudio.google.com/apps/4ae31270-1492-4a37-918e-37fe0b069a32?showAssistant=true&showPreview=true&fullscreenApplet=true',
    audioNarration:
      'Personal Finance Advisor Bot is a live AI FinTech web application built by Harsh Patil. It acts as an intelligent financial companion that helps users organize budgets, evaluate savings targets, and receive clear, actionable personal finance guidance.',
  },
  {
    id: 'bfsi-risk-radar',
    title: 'BFSI Risk & Fraud Intelligence Engine',
    domain: 'AI & Financial Analytics',
    year: '2026',
    image: '/src/assets/images/project_bfsi_ai_1795167042080.jpg',
    summary:
      'Built during the SmartBridge + NASSCOM Virtual Internship (AI Specialist – BFSI track). A structured data pipeline and risk-scoring dashboard engineered to flag anomalous banking and insurance claim workflows.',
    highlights: [
      'Analyzes multi-feature financial transaction patterns for early fraud indicators',
      'Separates risk scoring logic from explainable analyst summaries',
      'Designed around real-world BFSI & insurance workflow constraints',
    ],
    stack: ['Python', 'Data Analytics', 'BFSI Risk Modeling', 'React'],
    githubUrl: 'https://github.com/harshpatil-ai',
    audioNarration:
      'The BFSI Risk and Fraud Intelligence Engine was developed during Harsh Patil’s SmartBridge and NASSCOM AI Specialist internship. It analyzes financial and insurance workflows in Python to surface anomaly signals and explainable risk scores for analysts.',
  },
  {
    id: 'iiot-robotics-monitor',
    title: 'Smart IIoT Automation & Telemetry Console',
    domain: 'Industrial Robotics & IoT',
    year: '2026',
    image: '/src/assets/images/project_robotics_iiot_1795167042348.jpg',
    summary:
      'Inspired by hands-on industrial training with PMS Robotics Research Center. A real-time monitoring interface bridging robotic actuator states, industrial sensor streams, and threshold safety alerts.',
    highlights: [
      'Clean telemetry state visualization for industrial automation units',
      'Low-overhead C++ edge data formatting paired with React control views',
      'Structured fault diagnostics and preventative maintenance triggers',
    ],
    stack: ['C++', 'IIoT Sensors', 'Robotics Control', 'JavaScript'],
    githubUrl: 'https://github.com/harshpatil-ai',
    audioNarration:
      'The Smart IIoT Automation and Telemetry Console translates Harsh Patil’s industrial training at PMS Robotics Research Center into an engineering interface connecting C++ sensor nodes with live robotics diagnostics.',
  },
  {
    id: 'genai-voice-studio',
    title: 'Generative AI Content & Voice Brief Studio',
    domain: 'Generative AI & Web',
    year: '2026',
    image: '/src/assets/images/project_genai_studio_1795167042216.jpg',
    summary:
      'Combining Adobe Generative AI content principles with Gemini speech synthesis to turn technical summaries and project briefs into structured creative copy and natural spoken audio.',
    highlights: [
      'Server-side Gemini 3.8 Flash TTS narration with selectable speaking personas',
      'Structured prompt workflows for concise technical storytelling',
      'Responsive React interface with smooth motion transitions',
    ],
    stack: ['React', 'JavaScript', 'Gemini TTS', 'Generative AI'],
    githubUrl: 'https://github.com/harshpatil-ai',
    audioNarration:
      'The Generative AI Content and Voice Brief Studio pairs modern React interfaces with server-side Gemini 3.8 Flash text-to-speech, enabling technical briefs to be synthesized into clear spoken audio.',
  },
  {
    id: 'cpp-algo-visualizer',
    title: 'Core C++ Algorithm & Memory Toolkit',
    domain: 'Systems & Algorithms',
    year: '2026',
    image: '/src/assets/images/project_cpp_algo_1795167042356.jpg',
    summary:
      'A modular library of clean C and C++ implementations covering graph traversal, sorting benchmarks, and deterministic data structures built alongside Imarticus Proficiency coursework.',
    highlights: [
      'Clean modular header/source separation following modern C++ practices',
      'Benchmarked time and space complexity across canonical test suites',
      'Version-controlled with structured documentation on GitHub',
    ],
    stack: ['C', 'C++', 'Data Structures', 'GitHub'],
    githubUrl: 'https://github.com/harshpatil-ai',
    audioNarration:
      'The Core C++ Algorithm and Memory Toolkit consolidates Harsh Patil’s Grade A proficiency work into a clean, modular library of benchmarked graph algorithms and deterministic data structures.',
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'nptel-ip',
    title: 'Managing Intellectual Property in Universities',
    shortTitle: 'NPTEL – Intellectual Property',
    issuer: 'IIT Madras (NPTEL · SWAYAM · MoE)',
    category: 'Professional & IP',
    dateLabel: 'July – August 2026',
    durationOrScore: 'Score: 71% · 4-Week Course · 2 Credits',
    credentialId: 'NPTEL26HS148S366200503',
    gradeOrTrack: 'Elite Certification',
    description:
      'Awarded Elite certification by Indian Institute of Technology Madras (22.75/25 Online Assignments, 48/75 Proctored Exam) covering university patents, copyright, licensing, and research commercialization.',
    fileUrl: '/certificates/NPTEL_Managing_IP_Harsh_Patil.pdf',
    downloadName: 'NPTEL_Managing_IP_Harsh_Patil.pdf',
    fileType: 'pdf',
    issuerKey: 'nptel',
  },
  {
    id: 'adobe-genai',
    title: 'Generative AI Content Creation',
    shortTitle: 'Adobe – Generative AI',
    issuer: 'Adobe through Coursera',
    category: 'AI & GenAI',
    dateLabel: 'Completed November 1, 2025',
    durationOrScore: 'Verified Coursera Certificate',
    credentialId: 'Y4H3M2BH8C1B',
    gradeOrTrack: 'Authorized by Adobe',
    description:
      'Completed Adobe’s non-credit specialization on Coursera covering generative visual ideation, prompt engineering, responsible AI workflows, and rapid digital asset creation.',
    verifyUrl: 'https://coursera.org/verify/Y4H3M2BH8C1B',
    fileUrl: '/certificates/Adobe_Generative_AI_Harsh_Patil.pdf',
    downloadName: 'Adobe_Generative_AI_Harsh_Patil.pdf',
    fileType: 'pdf',
    issuerKey: 'adobe',
  },
  {
    id: 'smartbridge-nasscom',
    title: 'Virtual Internship Program (AI Specialist – BFSI)',
    shortTitle: 'SmartBridge + NASSCOM AI',
    issuer: 'SmartBridge × NASSCOM FutureSkills Prime',
    category: 'AI & GenAI',
    dateLabel: 'Issued November 4, 2026',
    durationOrScore: 'Aug 24 – Sep 26, 2026',
    credentialId: 'VIP-BFSI-2026-0187',
    gradeOrTrack: 'Track: AI Specialist – BFSI',
    description:
      'Industry-integrated virtual internship with hands-on exposure to AI in Financial Services, Risk & Fraud Detection, Data Analytics for BFSI, and Insurance Workflows.',
    fileUrl: '/certificates/SmartBridge_NASSCOM_BFSI_AI_Harsh_Patil.pdf',
    downloadName: 'SmartBridge_NASSCOM_BFSI_AI_Harsh_Patil.pdf',
    fileType: 'pdf',
    issuerKey: 'smartbridge',
  },
  {
    id: 'imarticus-cpp',
    title: 'C & C++ Programming — Certificate of Proficiency',
    shortTitle: 'Imarticus – C & C++',
    issuer: 'Imarticus Learning · Skill India & NSDC',
    category: 'Engineering & Core',
    dateLabel: 'Issued May 8, 2026',
    durationOrScore: 'Final Grade: A',
    credentialId: '34I72L53CF5FU',
    gradeOrTrack: 'Grade: A',
    description:
      'Recognized by Skill India, NSDC, and Dr. D. Y. Patil for demonstrating consistent excellence and diligence in C and C++ structured programming.',
    fileUrl: '/certificates/Imarticus_C_CPP_Harsh_Patil.pdf',
    downloadName: 'Imarticus_C_CPP_Harsh_Patil.pdf',
    fileType: 'pdf',
    issuerKey: 'imarticus-cpp',
  },
  {
    id: 'imarticus-comm',
    title: 'Business Communication — Certificate of Proficiency',
    shortTitle: 'Imarticus – Business Comm.',
    issuer: 'Imarticus Learning · Skill India & NSDC',
    category: 'Professional & IP',
    dateLabel: 'Issued January 21, 2026',
    durationOrScore: 'Final Grade: A+',
    credentialId: '54AK9WKG5T8I',
    gradeOrTrack: 'Grade: A+',
    description:
      'Awarded highest distinction (Grade A+) for excellence in professional writing, technical presentations, and collaborative workplace communication.',
    fileUrl: '/certificates/Imarticus_Business_Communication_Harsh_Patil.pdf',
    downloadName: 'Imarticus_Business_Communication_Harsh_Patil.pdf',
    fileType: 'pdf',
    issuerKey: 'imarticus-comm',
  },
  {
    id: 'pms-robotics',
    title: 'Industrial Automation, Robotics with IIoT',
    shortTitle: 'PMS Robotics – IIoT Training',
    issuer: 'PMS Robotics Research Center, Pune · DYPCEI',
    category: 'Engineering & Core',
    dateLabel: 'May 11 – May 13, 2026',
    durationOrScore: '3-Day Hands-On Industrial Training',
    credentialId: 'UDYAM-MH-26-63666',
    gradeOrTrack: 'First Year Engineering',
    description:
      'Hands-on industrial training program organized by the Department of Engineering Science & Humanities, Dr. D. Y. Patil College of Engineering & Innovation, Pune.',
    fileUrl: '/certificates/PMS_Robotics_IIoT_Harsh_Patil.jpeg',
    downloadName: 'PMS_Robotics_IIoT_Harsh_Patil.jpeg',
    fileType: 'image',
    issuerKey: 'pms',
  },
];
