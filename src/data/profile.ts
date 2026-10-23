// ─────────────────────────────────────────────────────────────────────────────
// All the content on the site lives in this file.
// Edit the text here and the whole site updates; no other file needs to change.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Tejal Ganvir",
  firstName: "Tejal",
  lastName: "Ganvir",
  role: "Senior Frontend Engineer",
  yearsOfExperience: "9+",
  // The phrases the hero types out, one after another.
  typedRoles: [
    "Senior Frontend Engineer",
    "React & TypeScript Specialist",
    "Real-Time UI Builder",
    "AI-Assisted Developer",
    "Module Lead & Mentor",
  ],
  intro:
    "I build large-scale React and TypeScript applications that stay fast, accessible and easy to maintain, from Ernst & Young's global engagement platform to AI-assisted tooling that cut my team's development time by about 30%.",
  status: "Module Lead at Happiest Minds Technologies",
  location: "Pune, India",
  heroTech: ["React", "TypeScript", "Redux Toolkit", "WebSockets", "Jest", "Playwright"],

  email: "tejal.ganveer@gmail.com",
  // Your phone number is left off the public site on purpose. Add it here only if you want it shown.
  phone: "",
  linkedin: "https://linkedin.com/in/fullstack-tejal-ganvir",
  github: "https://github.com/tejal-ganvir",

  photo: "/tejal-ganvir.webp",
  resumeFile: "/Tejal_Ganvir_Senior_Frontend_Engineer_React_TypeScript_Resume.pdf",
};

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

// Every number here comes from the CV.
export const stats: Stat[] = [
  { value: 9, suffix: "+", label: "Years building for the web" },
  { value: 30, suffix: "%", label: "Faster development with AI tooling" },
  { value: 100, suffix: "+", label: "Strictly typed TypeScript interfaces" },
  { value: 80, suffix: "%+", label: "Unit-test coverage kept" },
];

export const about = {
  paragraphs: [
    "I'm a frontend engineer and Module Lead at Happiest Minds Technologies. For almost four years before that, I built the frontend of Ernst & Young Global's engagement-management platform at LTI, used by teams around the world.",
    "I care about the parts users never see but always feel: strict typing, real-time data that just works, accessible components, and tests that let a team ship with confidence. Lately I've been connecting AI assistants to our everyday tools through MCP, so the whole team moves faster.",
  ],
  languages: [
    { name: "English", level: "C1, fluent" },
    { name: "German", level: "A1, learning" },
    { name: "Hindi", level: "Native" },
    { name: "Marathi", level: "Native" },
  ],
  education: {
    degree: "B.E. Electronics & Telecommunication",
    school: "Rashtrasant Tukadoji Maharaj Nagpur University",
    year: "2015",
  },
};

export interface Service {
  icon: "layers" | "radio" | "accessibility" | "sparkles";
  title: string;
  text: string;
  tags: string[];
}

export const services: Service[] = [
  {
    icon: "layers",
    title: "Frontend architecture",
    text: "Scalable React and TypeScript apps with clean state management, micro-frontends and reusable components across many repositories.",
    tags: ["React", "TypeScript", "Redux Toolkit", "Micro-frontends"],
  },
  {
    icon: "radio",
    title: "Real-time & data-rich UI",
    text: "Live document locking and notifications over WebSockets, dashboards with chart libraries, and big lists kept smooth with memoisation and virtualisation.",
    tags: ["WebSockets", "Dashboards", "Virtualised lists"],
  },
  {
    icon: "accessibility",
    title: "Design systems & accessibility",
    text: "Pixel-accurate Figma-to-code work with UX designers, built on a Storybook design system and WCAG accessibility standards.",
    tags: ["Storybook", "WCAG", "Figma"],
  },
  {
    icon: "sparkles",
    title: "AI-assisted development",
    text: "MCP servers that give AI coding assistants real project context from GitHub, Jira, Figma and Playwright, plus chatbot interfaces for products.",
    tags: ["MCP", "GitHub Copilot", "Claude", "Gemini"],
  },
];

export interface CaseStudy {
  title: string;
  context: string;
  summary: string;
  highlight: string; // the headline result shown big on the card
  highlightLabel: string;
  outcomes: string[];
  stack: string[];
  accent: "blue" | "violet" | "pink" | "cyan";
}

export const caseStudies: CaseStudy[] = [
  {
    title: "Global Engagement Management platform",
    context: "Ernst & Young Global, via LTI, 2022–2026",
    summary:
      "The React and TypeScript frontend of a large-scale enterprise platform on .NET APIs, with real-time document locking and notifications over WebSockets, dashboards on chart libraries, and data-heavy views kept fast with memoisation and virtualised lists.",
    highlight: "80%+",
    highlightLabel: "unit-test coverage",
    outcomes: [
      "100+ strictly typed TypeScript interfaces catching errors at build time",
      "Release pipeline managed in Azure DevOps",
    ],
    stack: ["React", "TypeScript", "Redux-Saga", "WebSockets", "Jest", ".NET"],
    accent: "blue",
  },
  {
    title: "AI-assisted development workflow",
    context: "Happiest Minds Technologies, 2026",
    summary:
      "Connected MCP servers through Gemini CLI to GitHub, Jira, Figma and Playwright, so AI coding assistants work with full project context instead of guessing.",
    highlight: "~30%",
    highlightLabel: "less development time",
    outcomes: ["Repetitive context gathering and test setup automated for the whole team"],
    stack: ["MCP", "Gemini CLI", "GitHub Copilot", "Claude", "Playwright"],
    accent: "violet",
  },
  {
    title: "Consistent, accessible enterprise UI",
    context: "Happiest Minds Technologies, 2026",
    summary:
      "Features built on a Storybook design system, WCAG accessibility in every component, 1-to-1 Figma parity with UX designers, and chatbot components that show each step of an assistant's response.",
    highlight: "1:1",
    highlightLabel: "design parity with Figma",
    outcomes: ["One shared look and behaviour across multiple enterprise applications"],
    stack: ["React", "Storybook", "WCAG", "Figma", "Chatbot UI"],
    accent: "pink",
  },
  {
    title: "PHP to React migration",
    context: "Archslate Company, California (remote), 2020–2022",
    summary:
      "Moved a PHP web application to React with reusable Higher-Order Components and JWT authentication, and built an email-marketing system and a job portal with an integrated applicant-tracking system.",
    highlight: "180+",
    highlightLabel: "delivery hours saved",
    outcomes: [
      "Almost 30% better productivity and maintainability",
      "More than 15% higher conversion and revenue from email marketing",
    ],
    stack: ["React", "JavaScript", "PHP", "JWT"],
    accent: "cyan",
  },
];

export interface Role {
  start: string;
  end: string;
  title: string;
  company: string;
  location: string;
  summary: string;
}

export const experience: Role[] = [
  {
    start: "06/2026",
    end: "Present",
    title: "Module Lead – Frontend",
    company: "Happiest Minds Technologies",
    location: "India",
    summary:
      "Lead frontend delivery across multiple enterprise repositories, from requirements to release, and introduced the MCP-based AI workflow.",
  },
  {
    start: "06/2022",
    end: "03/2026",
    title: "Full Stack Developer (React, TypeScript)",
    company: "LTI – Larsen & Toubro Infotech",
    location: "Pune, India",
    summary:
      "Built the frontend of Ernst & Young Global's engagement-management platform and mentored interns, raising team velocity by an estimated 20%.",
  },
  {
    start: "01/2020",
    end: "06/2022",
    title: "Full Stack Developer (React)",
    company: "Archslate Company",
    location: "California, USA (remote)",
    summary: "Migrated the product from PHP to React and built marketing and hiring tools.",
  },
  {
    start: "03/2019",
    end: "01/2020",
    title: "Full Stack Developer (React.js, React Native)",
    company: "Tissa Technology LLC",
    location: "Nagpur, India",
    summary: "Raised checkout clicks by 15%, made pages render up to 3× faster, and shipped an iOS/Android app in 8 weeks.",
  },
  {
    start: "07/2018",
    end: "03/2019",
    title: "Web Developer",
    company: "Scholartude Web Education",
    location: "Nagpur, India",
    summary: "Built student, admin and home portals for an e-learning platform.",
  },
  {
    start: "10/2017",
    end: "07/2018",
    title: "Web Developer",
    company: "India Active Softwares",
    location: "Nagpur, India",
    summary: "Built a health and fitness web application with personalised recommendations.",
  },
];

export interface SkillGroup {
  name: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { name: "Frontend", items: ["React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Next.js", "Redux Toolkit", "Redux-Saga", "React Native", "Micro-frontends", "Vite", "Tailwind CSS", "Material UI"] },
  { name: "Real-time & performance", items: ["WebSockets", "Data visualisation", "Dashboards", "Memoisation", "Virtualised lists"] },
  { name: "Design systems & a11y", items: ["Storybook", "Component libraries", "WCAG", "Figma-to-code"] },
  { name: "Testing & quality", items: ["Jest", "React Testing Library", "Playwright", "ESLint", "Code review"] },
  { name: "APIs & backend", items: ["REST", "GraphQL", "Node.js", "Express.js", ".NET APIs", "SQL Server", "MongoDB"] },
  { name: "Delivery", items: ["Git", "GitHub", "Azure DevOps", "CI/CD", "Agile/Scrum", "Jira", "Confluence"] },
  { name: "AI-assisted dev", items: ["MCP", "GitHub Copilot", "Gemini", "Claude"] },
];

// The scrolling ribbon of technologies under the hero.
export const marquee = [
  "React", "TypeScript", "Redux Toolkit", "Next.js", "WebSockets", "Storybook", "Jest",
  "Playwright", "Node.js", "GraphQL", "Azure DevOps", "Tailwind CSS", "Vite", "MCP", "Figma",
];
