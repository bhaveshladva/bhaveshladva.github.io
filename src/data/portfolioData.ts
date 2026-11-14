export interface Skill {
  name: string;
  level: number; // 0 - 100
  category: 'frontend' | 'backend' | 'database' | 'desktop' | 'architecture';
  description: string;
  iconName: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Professional' | 'Education';
  highlights: string[];
  skillsUsed: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    cloud: string;
  };
  metrics: string[];
  features: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Bhavesh Ladva",
    title: "Full Stack Software Engineer & System Architect",
    tagline: "Specializing in Enterprise SaaS, Microservices & High-Performance Single Page Applications",
    bio: "Full stack developer with 10+ years of proven experience building scalable web and desktop applications. I have a deep passion for system design, distributed architectures, and crafting intuitive, dynamic user experiences from initial concept to polished deliverable.",
    location: "Gandhinagar, GJ, INDIA",
    phone: "+91 812 8888 386",
    email: "bhavesh.ladva@hotmail.com",
    freelance: "Available for high-impact projects & architecture consulting",
    avatar: "https://bhaveshladva.github.io/assets/img/profile-img.jpg",
    github: "https://github.com/bhaveshladva",
    linkedin: "https://linkedin.com",
    stats: [
      { label: "Years Experience", value: "10+" },
      { label: "Team Members Led", value: "20+" },
      { label: "SaaS Architectures", value: "Enterprise" },
      { label: "Client Satisfaction", value: "5★" }
    ]
  },
  skills: [
    // Frontend
    { name: "HTML / CSS / Bootstrap", level: 100, category: 'frontend', description: "Semantic markup, responsive grid architectures, and liquid glass styling.", iconName: "Layout" },
    { name: "JavaScript (ES6+)", level: 90, category: 'frontend', description: "Deep understanding of closures, async event loops, and DOM performance.", iconName: "Code2" },
    { name: "Angular 2+", level: 80, category: 'frontend', description: "Enterprise SPAs, RxJS reactive streams, state management, and modular routing.", iconName: "Compass" },
    { name: "ReactJS & VueJS", level: 60, category: 'frontend', description: "Modern functional components, hooks, virtual DOM optimization, and ecosystem.", iconName: "Atom" },
    
    // Backend
    { name: "C# & .NET Core / ASP.NET MVC", level: 80, category: 'backend', description: "Clean architecture, Dependency Injection, async/await, and REST APIs.", iconName: "Server" },
    { name: "Node.js & Express", level: 70, category: 'backend', description: "High-throughput asynchronous microservices, event-driven pipelines, and JWT auth.", iconName: "Cpu" },
    { name: "Microservices & System Design", level: 85, category: 'architecture', description: "API Gateways, service discovery, load balancing, and distributed messaging.", iconName: "Network" },

    // Databases
    { name: "MS SQL Server / PostgreSQL / MySQL", level: 90, category: 'database', description: "Complex stored procedures, indexing strategies, query optimization, and sharding.", iconName: "Database" },
    { name: "MongoDB & NoSQL", level: 50, category: 'database', description: "Document data modeling, aggregation pipelines, and high-speed document storage.", iconName: "HardDrive" },

    // Desktop & Grid
    { name: "WPF & Desktop Applications", level: 80, category: 'desktop', description: "Windows Presentation Foundation, MVVM design pattern, and rich desktop UI.", iconName: "Monitor" },
    { name: "Telerik Grid & Controls", level: 85, category: 'desktop', description: "High-volume data binding, virtualized sorting/filtering, and enterprise reporting.", iconName: "Table" }
  ] as Skill[],

  timeline: [
    {
      id: "lead-techavidus",
      role: "Team Lead & Problem Solver",
      company: "TechAvidus",
      period: "2019 - Present",
      location: "Gandhinagar, GJ, INDIA",
      type: 'Professional',
      highlights: [
        "Lead the architectural design, development, and implementation of complex enterprise layout and production environments.",
        "Delegate tasks to 20+ software engineers while providing mentorship and strategic counsel on all technical aspects.",
        "Direct and architect high-traffic Enterprise-level SaaS applications utilizing robust Microservices architecture.",
        "Ensure system scalability, high availability (99.9%), and seamless CI/CD delivery practices across cross-functional squads."
      ],
      skillsUsed: [".NET Core", "Microservices", "Angular", "MS-SQL", "Docker", "System Architecture", "Team Leadership"]
    },
    {
      id: "senior-techavidus",
      role: "Full Stack Software Engineer",
      company: "TechAvidus",
      period: "2018 - 2020",
      location: "Gandhinagar, GJ, INDIA",
      type: 'Professional',
      highlights: [
        "Rigorous assessment and engineering of comprehensive project features to guarantee exceptional quality, security, and design accuracy.",
        "Core contributor to mission-critical Enterprise level SaaS platforms powered by multi-tenant Microservices.",
        "Collaborated on database sharding and performance tuning across MS-SQL and PostgreSQL clusters."
      ],
      skillsUsed: ["ASP.NET Core", "C#", "React", "PostgreSQL", "Node.js", "REST APIs"]
    },
    {
      id: "junior-techavidus",
      role: "Junior Software Developer",
      company: "TechAvidus",
      period: "2016 - 2018",
      location: "Gandhinagar, GJ, INDIA",
      type: 'Professional',
      highlights: [
        "Initiated professional software career specializing in ASP.NET MVC, C#, MS-SQL Server, JavaScript, and jQuery.",
        "Transitioned legacy architectures into modern Single Page Applications (SPA) using best practices with Angular and React.",
        "Engineered RESTful APIs with .NET Core and Node.js connected to MS-SQL, PostgreSQL, and MongoDB repositories."
      ],
      skillsUsed: ["ASP.NET MVC", "C#", "JavaScript", "jQuery", "MS-SQL Server", "Angular", "MongoDB"]
    },
    {
      id: "edu-ldcollege",
      role: "Bachelor of Engineering (B.E.)",
      company: "L.D. College of Engineering",
      period: "2011 - 2015",
      location: "Ahmedabad, GJ, INDIA",
      type: 'Education',
      highlights: [
        "Graduated with honors from one of Gujarat's premier engineering institutions.",
        "Focused on Software Engineering, Data Structures, Algorithms, Computer Networks, and Database Management Systems.",
        "Led campus technical symposiums and developed foundational projects in C++ and C#."
      ],
      skillsUsed: ["Computer Science", "Algorithms", "Data Structures", "System Engineering"]
    }
  ] as Experience[],

  projects: [
    {
      id: "saas-microservices-erp",
      title: "OmniCloud Enterprise SaaS Platform",
      subtitle: "Multi-tenant Distributed ERP Suite",
      category: "Enterprise Cloud & Microservices",
      description: "A flagship distributed SaaS application engineered with a clean microservices architecture. Serves 50,000+ daily active enterprise users with real-time analytics and zero-downtime deployment pipelines.",
      architecture: {
        frontend: "Angular 16 + RxJS State Management",
        backend: ".NET Core 8 Web APIs + Ocelot API Gateway",
        database: "MS SQL Server (Sharded) + Redis Cache",
        cloud: "Docker Containers + Azure Kubernetes Service"
      },
      metrics: ["99.98% High Availability", "<45ms Avg API Latency", "10,000+ Transactions/sec"],
      features: [
        "Decoupled Microservice boundaries with RabbitMQ event-driven bus",
        "Fine-grained Role-Based Access Control (RBAC) with JWT & OAuth2",
        "Automated multi-tenant data isolation and dynamic query orchestration"
      ]
    },
    {
      id: "wpf-trading-grid",
      title: "Apex Desktop Financial Analytics Suite",
      subtitle: "High-Throughput WPF & Telerik Grid Solution",
      category: "Desktop & Financial Systems",
      description: "High-performance WPF desktop client designed for financial analysts requiring sub-second filtering across millions of live grid rows with custom Telerik UI controls.",
      architecture: {
        frontend: "WPF (C#) MVVM + Telerik UI Controls",
        backend: "ASP.NET Core SignalR Real-time Streaming",
        database: "PostgreSQL with TimescaleDB Extension",
        cloud: "Hybrid On-Premise & Cloud Sync"
      },
      metrics: ["1M+ Rows Filtered in <120ms", "Zero UI Freeze Threading", "Live WebSocket Feed"],
      features: [
        "Custom virtualized data binding for massive real-time datasets",
        "Multi-monitor workspace tearing and docking window layout",
        "Deep Excel and PDF automated financial reporting export"
      ]
    },
    {
      id: "react-healthcare-portal",
      title: "MedPulse Patient Care Portal",
      subtitle: "HIPAA-Compliant Single Page Application",
      category: "Modern Web & SPA",
      description: "An intuitive patient management and telemedicine portal built for rapid medical chart retrieval and secure doctor-to-patient encrypted messaging.",
      architecture: {
        frontend: "React + TypeScript + Tailwind CSS",
        backend: "Node.js Express + Microservices Engine",
        database: "MongoDB Atlas Encrypted Cluster",
        cloud: "AWS CloudFront & ECS"
      },
      metrics: ["100% HIPAA Compliance", "Sub-2s Page Load", "End-to-End Encryption"],
      features: [
        "Interactive patient timeline with diagnostic imaging viewer",
        "Real-time appointment scheduler with SMS/Email automated triggers",
        "Granular audit logging across all medical record view events"
      ]
    },
    {
      id: "distributed-task-engine",
      title: "HyperFlow Batch Processing Engine",
      subtitle: "High-Concurrency Background Task Processor",
      category: "Backend & Systems",
      description: "A fault-tolerant distributed job scheduler created to handle asynchronous heavy computations, document generation, and external third-party API webhooks.",
      architecture: {
        frontend: "VueJS Real-time Telemetry Dashboard",
        backend: ".NET Core + Background Worker Services",
        database: "PostgreSQL + Redis Queue",
        cloud: "Docker Swarm + Prometheus Monitoring"
      },
      metrics: ["500,000+ Daily Jobs Processed", "Automatic Dead-Letter Recovery", "Linear Horizontal Scaling"],
      features: [
        "Exponential back-off retry logic with intelligent circuit breakers",
        "Real-time WebSockets status update to monitoring operators",
        "Plug-and-play worker nodes with dynamic resource throttling"
      ]
    }
  ] as Project[]
};
