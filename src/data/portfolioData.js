/**
 * Portfolio Data Store - Sailesh S
 * Modify your project details, links, skills, and copy directly in this file.
 */

export const personalInfo = {
  name: "Sailesh S",
  title: "AI & Data Science Student // Full-Stack Developer",
  status: "ONLINE // OPEN TO OPPORTUNITIES",
  institution: "Erode Sengunthar Engineering College",
  batch: "2024 – 2028",
  degree: "B.Tech in Artificial Intelligence & Data Science",
  location: "Tamil Nadu, India",
  email: "ssaileshm@gmail.com",
  phone: "+91 94867 80683",
  roles: [
    "AI & Data Science Undergrad",
    "Full-Stack Web Developer",
    "Machine Learning Enthusiast",
    "Algorithmic Problem Solver"
  ],
  bioShort:
    "Undergraduate student in Artificial Intelligence and Data Science at Erode Sengunthar Engineering College (2024–2028). Passionate about architecting intelligent systems, data-driven pipelines, and high-performance full-stack web experiences.",
  socials: {
    github: "https://github.com/sailesh-01",
    linkedin: "https://www.linkedin.com/in/sailesh-s-977169349",
    email: "mailto:ssaileshm@gmail.com",
    phone: "tel:+919486780683"
  }
};

export const aboutData = {
  sectionTag: "NEURAL_LAYER // 01",
  title: "About Me",
  paragraphs: [
    "Hello! I am Sailesh, an Artificial Intelligence & Data Science undergraduate who loves converting algorithmic concepts into reliable, production-ready software.",
    "My engineering journey took off in 2024 upon entering Erode Sengunthar Engineering College. Since then, I have focused on mastering intelligent computing architectures, modern web frameworks, and robust database layers to engineer solutions that solve tangible problems.",
    "I believe in intentional engineering: writing clean, self-documenting code, avoiding unnecessary complexity, and ensuring every application delivers a fast, accessible, and intuitive user experience."
  ],
  highlights: [
    {
      label: "Current Focus",
      value: "B.Tech AI & Data Science",
      caption: "Erode Sengunthar Engg College (2024–2028)"
    },
    {
      label: "Engineering Stack",
      value: "Full-Stack + Data",
      caption: "React, Node.js, Python, Supabase, SQLite"
    },
    {
      label: "Location Base",
      value: "Tamil Nadu, India",
      caption: "Available for remote & hybrid opportunities"
    }
  ]
};

export const skillsData = {
  sectionTag: "KNOWLEDGE_BASE // 02",
  title: "Technical Stack & Tools",
  subtitle:
    "A clean overview of languages, frameworks, databases, and development tooling I actively build with.",
  categories: [
    {
      name: "Programming Languages",
      description: "Foundational syntaxes for algorithmic and application logic",
      skills: [
        { name: "JavaScript", level: "Core Language", highlight: true },
        { name: "TypeScript", level: "Type Safety", highlight: true },
        { name: "Python", level: "Data & ML", highlight: true },
        { name: "HTML5", level: "Semantic Markup" },
        { name: "CSS3", level: "Modern Layouts" }
      ]
    },
    {
      name: "Frameworks & Libraries",
      description: "Modern tools for scalable client and server architectures",
      skills: [
        { name: "React", level: "Primary UI Library", highlight: true },
        { name: "Next.js", level: "SSR & Full-Stack" },
        { name: "Tailwind CSS", level: "Utility Styling", highlight: true },
        { name: "Node.js", level: "Runtime Environment", highlight: true },
        { name: "Express.js", level: "REST API Architecture" }
      ]
    },
    {
      name: "Data & Cloud Infrastructure",
      description: "State persistence, database engines, and cloud platforms",
      skills: [
        { name: "Supabase", level: "Postgres & Auth", highlight: true },
        { name: "MongoDB", level: "Document Store" },
        { name: "SQLite", level: "Embedded Database" },
        { name: "AWS (Basics)", level: "Cloud Deployment" }
      ]
    },
    {
      name: "Developer Tooling & Workflows",
      description: "Version control, containerization, and interface prototyping",
      skills: [
        { name: "Git & GitHub", level: "Version Control", highlight: true },
        { name: "Docker", level: "Containerization" },
        { name: "Figma", level: "UI/UX Prototyping" },
        { name: "Vercel & Netlify", level: "CI/CD & Hosting" }
      ]
    }
  ]
};

export const projectsData = {
  sectionTag: "DEPLOYED_MODELS // 03",
  title: "Featured Projects",
  subtitle:
    "Full-stack web applications, interactive design systems, academic analytical tools, and IoT telemetry solutions built with modern engineering practices.",
  projects: [
    {
      id: "gradient-match",
      title: "GradientMatch",
      tagline: "CSS gradient studio with WCAG contrast analysis & live UI testing.",
      description:
        "Interactive web application for designers and developers to explore, build, and test CSS gradients. Features a curated gradient gallery, harmony-based color matcher, custom multi-stop gradient builder, live UI previews, and integrated WCAG accessibility contrast analysis.",
      stack: ["JavaScript", "CSS3 Tokens", "WCAG Contrast", "Canvas API"],
      github: "https://github.com/sailesh-01/GradientMatch",
      demo: "https://github.com/sailesh-01/GradientMatch",
      status: "Design Tool",
      category: "Tools & UI",
      featured: true
    },
    {
      id: "weatherly",
      title: "Weatherly",
      tagline: "Modern React meteorological dashboard with dynamic forecasts & client caching.",
      description:
        "A sleek, real-time weather application with dynamic atmospheric themes, detailed hourly and 7-day forecasts, location bookmarks, and responsive client-side caching for instant load times.",
      stack: ["React", "Vite", "Tailwind CSS", "OpenWeather API"],
      github: "https://github.com/sailesh-01/weatherly",
      demo: "https://github.com/sailesh-01/weatherly",
      status: "React Dashboard",
      category: "Full-Stack",
      featured: true
    },
    {
      id: "smart-expense-manager",
      title: "ExpensiQ (Smart Expense Manager)",
      tagline: "Full-stack student finance tracker with category budgets & trend analytics.",
      description:
        "Full-stack student financial tracker designed to monitor daily spending, enforce category-based budgets with real-time alerts, and visualize habits with interactive Recharts visualizations and CSV data export.",
      stack: ["React", "Node.js", "Express", "Tailwind CSS", "Recharts"],
      github: "https://github.com/sailesh-01/Smart-Expense-Manager",
      demo: "https://github.com/sailesh-01/Smart-Expense-Manager",
      status: "Full Stack",
      category: "Full-Stack",
      featured: true
    },
    {
      id: "cgpa-calculator",
      title: "CGPA Calculator & Analytics",
      tagline: "Dynamic academic grade calculator with performance analytics & PDF export.",
      description:
        "Dynamic student CGPA calculation suite engineered with Flask and Vanilla JS. Features real-time grade point computation, interactive semester performance charts, zero-credit paper handling, and downloadable PDF academic reports.",
      stack: ["Flask", "Python", "Vanilla JS", "Chart.js", "PDF Gen"],
      github: "https://github.com/sailesh-01/CGPA-Calculator",
      demo: "https://github.com/sailesh-01/CGPA-Calculator",
      status: "Academic Utility",
      category: "Tools & UI",
      featured: true
    },
    {
      id: "ui-ux-stylepedia",
      title: "UI/UX Stylepedia",
      tagline: "Interactive design compendium of 50+ UI paradigms & design tokens.",
      description:
        "Interactive encyclopedia of 50+ contemporary UI/UX design styles including Glassmorphism, Neumorphism, Brutalism, and Cyberpunk with live theming, inspectable CSS snippets, and AI prompt engineering templates.",
      stack: ["Vanilla JS", "CSS3 Custom Properties", "Design Tokens", "Glassmorphism"],
      github: "https://github.com/sailesh-01/ui-ux-stylepedia",
      demo: "https://github.com/sailesh-01/ui-ux-stylepedia",
      status: "Design System",
      category: "Tools & UI",
      featured: true
    },
    {
      id: "attendx",
      title: "AttendX",
      tagline: "Automated institutional attendance & academic marks management platform.",
      description:
        "A secure, high-throughput management system built for academic institutions. Features automated attendance registers, real-time mark tracking, role-based access, and instant exportable compliance reporting with Supabase cloud persistence.",
      stack: ["Node.js", "Express", "Supabase", "Vercel"],
      github: "https://github.com/sailesh-01/attendx",
      demo: "https://attendx-ten.vercel.app",
      status: "Production Ready",
      category: "Full-Stack",
      featured: true
    },
    {
      id: "smart-bus",
      title: "Smart Bus Monitor",
      tagline: "IoT transit fleet solution with real-time telemetry and dynamic ETA prediction.",
      description:
        "Fleet monitoring interface engineered to ingest sensor and GPS telemetry from public transit buses. Provides automated route scheduling, passenger occupancy tracking, live delay updates, and route telematics for commuters.",
      stack: ["IoT", "JavaScript", "Hardware Sensors", "AI-UI"],
      github: "https://github.com/sailesh-01/Smart-Bus-Monitoring-System",
      demo: "https://github.com/sailesh-01/Smart-Bus-Monitoring-System",
      status: "Hardware Prototype",
      category: "IoT & Systems",
      featured: true
    },
    {
      id: "job-board",
      title: "Job Board Platform",
      tagline: "Full-stack career portal connecting candidates and hiring employers.",
      description:
        "Comprehensive full-stack Job Board web application with React & Vite frontend, Express & SQLite backend, JWT authentication, resume upload pipelines, and email notifications.",
      stack: ["React", "Node.js", "Express", "SQLite", "JWT Auth"],
      github: "https://github.com/sailesh-01/CodSoft_Task2",
      demo: "https://github.com/sailesh-01/CodSoft_Task2",
      status: "Full Stack",
      category: "Full-Stack",
      featured: false
    },
    {
      id: "chat-me",
      title: "Chat-Me",
      tagline: "End-to-end encrypted messaging engine with bcrypt hash authentication.",
      description:
        "Privacy-oriented messaging portal emphasizing cryptographically secure user authentication and session persistence. Backed by bcrypt password hashing and persistent SQLite storage.",
      stack: ["Python", "Streamlit", "SQLite", "bcrypt"],
      github: "https://github.com/sailesh-01/chat-me",
      demo: "https://github.com/sailesh-01/chat-me",
      status: "Open Source",
      category: "IoT & Systems",
      featured: false
    },
    {
      id: "web-alarm",
      title: "Web-Alarm",
      tagline: "Minimalist digital chronometer with persistent state and MD3 aesthetics.",
      description:
        "Responsive digital clockwork and multi-alarm engine developed with Material Design 3 guidelines. Persists alarms across browser sessions using LocalStorage and Web Audio synthesizers.",
      stack: ["JavaScript ES6+", "Material Design 3", "LocalStorage", "Web Audio"],
      github: "https://github.com/sailesh-01/Web-Alarm",
      demo: "https://github.com/sailesh-01/Web-Alarm",
      status: "Live Utility",
      category: "Tools & UI",
      featured: false
    },
    {
      id: "codsoft_task1",
      title: "CodSoft Projects Hub",
      tagline: "Internship repository containing frontend foundations and web utilities.",
      description:
        "Curated collection of web development tasks and foundational frontend applications completed during the CodSoft engineering internship.",
      stack: ["HTML5", "CSS3", "JavaScript", "Git"],
      github: "https://github.com/sailesh-01/codsoft_task1",
      demo: "https://github.com/sailesh-01/codsoft_task1",
      status: "Internship Hub",
      category: "Tools & UI",
      featured: false
    },
    {
      id: "codsoft_task3",
      title: "Interactive Web Calculator",
      tagline: "Clean, responsive browser calculator with keyboard integration and decimal precision.",
      description:
        "Interactive web calculator with decimal support, division-by-zero validation, and full physical keyboard bindings for rapid mathematical calculations.",
      stack: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/sailesh-01/codsoft_task3",
      demo: "https://github.com/sailesh-01/codsoft_task3",
      status: "Vanilla JS",
      category: "Tools & UI",
      featured: false
    },
    {
      id: "simple-calculator",
      title: "Quick Calc Utility",
      tagline: "Lightweight mathematical utility with extended arithmetic operations.",
      description:
        "Lightweight browser-based calculation utility built with vanilla web technologies for daily numerical calculations.",
      stack: ["JavaScript", "HTML5", "CSS3"],
      github: "https://github.com/sailesh-01/Simple-Calculator",
      demo: "https://github.com/sailesh-01/Simple-Calculator",
      status: "JavaScript",
      category: "Tools & UI",
      featured: false
    },
    {
      id: "to-do-list",
      title: "Task & To-Do Planner",
      tagline: "Session-persistent task manager for daily developer productivity.",
      description:
        "Simple, effective task and productivity manager developed to track daily goals and todo items with LocalStorage persistence.",
      stack: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
      github: "https://github.com/sailesh-01/To-Do-List",
      demo: "https://github.com/sailesh-01/To-Do-List",
      status: "Productivity Tool",
      category: "Tools & UI",
      featured: false
    }
  ]
};

export const educationData = {
  sectionTag: "TRAINING_HISTORY // 04",
  title: "Education & Journey",
  subtitle: "Academic timeline and technical foundations.",
  timeline: [
    {
      period: "2024 – 2028",
      degree: "B.Tech in Artificial Intelligence & Data Science",
      institution: "Erode Sengunthar Engineering College",
      location: "Erode, Tamil Nadu",
      description:
        "Actively pursuing an intensive undergraduate curriculum focused on intelligent computing, statistical modeling, machine learning pipelines, and modern full-stack web architectures.",
      status: "Currently Enrolled"
    },
    {
      period: "2012 – 2024",
      degree: "Higher Secondary & Secondary Education",
      institution: "Carmel Matriculation Higher Secondary School",
      location: "Tamil Nadu, India",
      description:
        "Completed 12 years of formal schooling, specializing in the Computer Science & Mathematics (CS MAT) group in grades 11 and 12, building a strong analytical and quantitative foundation.",
      status: "Completed"
    }
  ]
};

export const contactData = {
  sectionTag: "OUTPUT_STREAM // 05",
  title: "Get In Touch",
  subtitle:
    "Whether you have a project in mind, an opportunity to discuss, or simply want to connect, my inbox is always open.",
  methods: [
    {
      label: "Direct Email",
      value: "ssaileshm@gmail.com",
      href: "mailto:ssaileshm@gmail.com",
      type: "email"
    },
    {
      label: "Phone Contact",
      value: "+91 94867 80683",
      href: "tel:+919486780683",
      type: "phone"
    },
    {
      label: "Location Base",
      value: "Tamil Nadu, India",
      href: "https://maps.google.com/?q=Tamil+Nadu+India",
      type: "location"
    }
  ]
};
