export interface ProfileMetric {
  label: string
  value: string
}

export interface SkillCluster {
  items: string[]
  title: string
}

export interface ExperienceEntry {
  bullets: string[]
  company: string
  location: string
  period: string
  role: string
  stack: string[]
  summary: string
}

export interface ProjectEntry {
  href: string
  indicator: string
  kind: string
  summary: string
  tags: string[]
  title: string
}

export interface ImpactEntry {
  details: string[]
  indicators: string[]
  summary: string
  tags: string[]
  title: string
}

export interface InitiativeEntry {
  headline: string
  status: string
  summary: string
  tags: string[]
  title: string
}

export const portfolioContent = {
  profile: {
    alias: "FrameMuse",
    availability: "Open for senior product engineering, frontend platform, and TypeScript-heavy architecture roles.",
    city: "Podgorica, Montenegro",
    email: "mailto:minicablestone@gmail.com",
    github: "https://github.com/FrameMuse",
    headline: "Building TypeScript products, frontend systems, and small modular tools that are meant to last.",
    linkedin: "https://www.linkedin.com/in/framemuse/",
    name: "Valery Zinchenko",
    role: "Senior Web Developer & Software Engineer",
    summary: "Senior engineer with more than a decade of web-development experience across React, TypeScript, frontend architecture, reusable libraries, and selective full-stack delivery. The strongest thread across the work is practical system design: product interfaces with strong UI discipline, libraries that remove friction for other engineers, and platform decisions that improve speed without turning the stack into ceremony.",
    supporting: "Public work spans shipped client products, npm libraries, framework experimentation, API architecture guidance, and 3D or game-adjacent prototypes. The portfolio is strongest for teams that want a frontend lead who can reason about rendering, developer experience, product delivery, and maintainable systems at the same time."
  },
  metrics: [
    {
      label: "web engineering across product delivery, tooling, and architecture",
      value: "10+ years"
    },
    {
      label: "public repositories covering products, experiments, and libraries",
      value: "149 repos"
    },
    {
      label: "total stars across public work with practical OSS adoption",
      value: "91 stars"
    },
    {
      label: "strongest OSS adoption signal from react-modal-global",
      value: "28★ lead repo"
    }
  ] satisfies ProfileMetric[],
  differentiators: [
    "UI and UX precision without hiding behind generic component kits",
    "Platform-level interest in rendering, reactivity, and modular architecture",
    "Comfort moving from product code into libraries, build systems, and API boundaries",
    "A product mindset that still values internal tools and maintainability"
  ],
  skillClusters: [
    {
      title: "Frontend Delivery",
      items: ["React", "TypeScript", "Vite", "SCSS", "Responsive UI", "Accessibility", "Design-to-code implementation"]
    },
    {
      title: "Architecture",
      items: ["Frontend architecture", "Widget systems", "API facades", "Reusable libraries", "Fine-grained reactivity", "Rendering strategy"]
    },
    {
      title: "Full-stack Range",
      items: ["NestJS", "MongoDB", "Electron", "Webhook funnels", "REST integrations", "AWS", "CI/CD"]
    },
    {
      title: "Developer Tooling",
      items: ["i18n tooling", "Build optimization", "Figma plugin automation", "Internal packages", "TypeScript utilities", "Open-source publishing"]
    }
  ] satisfies SkillCluster[],
  experience: [
    {
      company: "Pinely International",
      location: "Podgorica / Prague",
      period: "2023 — Present",
      role: "Senior Tech Lead / Senior Web Developer / Consultant / Full Stack Developer",
      summary: "Platform-heavy senior work spanning a custom JavaScript framework, internal library design, client audits, full-stack systems, Android prototyping, and delivery of production web applications.",
      bullets: [
        "Architected a custom JavaScript framework and a suite of lightweight libraries focused on rendering efficiency, modularity, and fast builds.",
        "Reduced dependency bloat and improved developer throughput by streamlining internal toolchains and CI/CD workflows.",
        "Built a high-reliability webhook funnel with a long-running zero-bug production record.",
        "Audited client projects, documented 100+ issues, and turned findings into actionable remediation plans.",
        "Developed shared libraries, shipped end-to-end applications, and mentored developers on scalable UI architecture."
      ],
      stack: ["TypeScript", "React", "NestJS", "MongoDB", "Electron", "AWS", "Java"]
    },
    {
      company: "Andromeda Web Solutions & Services",
      location: "Remote",
      period: "2022 — 2023",
      role: "Front End Web Developer",
      summary: "Solo ownership of a production React application from architecture through delivery, with a strong focus on responsive UI implementation and project templating.",
      bullets: [
        "Built a production-ready React application alone, from system design to deployment readiness.",
        "Created a reusable project template to standardize workflows and speed up new work.",
        "Translated Figma files into high-fidelity responsive components without relying on heavy CSS frameworks.",
        "Restored stability in production through focused logging and root-cause analysis."
      ],
      stack: ["React", "TypeScript", "Redux", "SCSS", "Figma"]
    },
    {
      company: "CodePandora",
      location: "Remote",
      period: "2021 — 2022",
      role: "Full Stack Web Developer",
      summary: "Delivered product features for two services with ownership across React architecture, UI implementation, and deployment workflows.",
      bullets: [
        "Led development of a mentor-matching platform and a travel search plus blogging platform.",
        "Implemented hook-driven React applications with TypeScript and Redux for more complex state flows.",
        "Managed deployment cycles for development and testing environments on Heroku."
      ],
      stack: ["React", "TypeScript", "Redux", "SCSS", "Heroku"]
    },
    {
      company: "Independent Contractor / P2P",
      location: "Remote",
      period: "2017 — 2022",
      role: "Full Stack Web Developer",
      summary: "Direct client work modernizing legacy stacks, designing REST integrations, and delivering production-ready web products with close product collaboration.",
      bullets: [
        "Moved legacy jQuery and PHP projects toward modern TypeScript and React implementations.",
        "Built responsive production sites from Figma and Photoshop designs.",
        "Collaborated directly with backend engineers on API design and performance-sensitive integrations."
      ],
      stack: ["React", "TypeScript", "PHP", "HTML5", "SCSS", "REST APIs"]
    }
  ] satisfies ExperienceEntry[],
  projects: [
    {
      href: "https://github.com/FrameMuse/react-modal-global",
      indicator: "28 stars · 4 forks",
      kind: "Open-source library",
      summary: "A lightweight modal manager for React that keeps orchestration simple and removes boilerplate from product teams that need global modal flows without heavy state plumbing.",
      tags: ["React", "TypeScript", "DX"],
      title: "React Modal Global"
    },
    {
      href: "https://github.com/FrameMuse/react-i18n-editor",
      indicator: "In-page workflow",
      kind: "Developer tooling",
      summary: "An on-page translation editing tool that brings localization closer to the actual product UI, reducing context switching for teams working with i18next.",
      tags: ["i18n", "React", "Tooling"],
      title: "React I18n Editor"
    },
    {
      href: "https://github.com/denshya",
      indicator: "Framework ecosystem",
      kind: "Initiative",
      summary: "A wider initiative around small standardized web tools: reactivity, routing, JSX runtime ideas, UI primitives, and documentation tooling aimed at cleaner frontend foundations.",
      tags: ["Reactivity", "Runtime", "Architecture"],
      title: "Denshya"
    },
    {
      href: "https://www.npmjs.com/package/mixedin",
      indicator: "TC39-aligned mixins",
      kind: "TypeScript utility",
      summary: "A multiple-inheritance utility for TypeScript that shows language-level comfort with prototype mechanics, type ergonomics, decorators, and runtime behavior.",
      tags: ["TypeScript", "Language Design", "Libraries"],
      title: "Mixedin"
    },
    {
      href: "https://www.npmjs.com/package/svg-bbox-polyfill",
      indicator: "SSR-adjacent geometry",
      kind: "Platform utility",
      summary: "A polyfill for SVG bounding boxes in non-browser environments, useful for rendering pipelines, tests, and systems that need geometry outside the browser runtime.",
      tags: ["SVG", "SSR", "Geometry"],
      title: "SVG BBox Polyfill"
    },
    {
      href: "https://github.com/FrameMuse/algo-academy",
      indicator: "Product delivery",
      kind: "Portfolio project",
      summary: "A representative client-facing product from the broader portfolio showing that the public story is not only about libraries, but also about shipped application work.",
      tags: ["Education", "Frontend", "Product"],
      title: "Algo Academy"
    }
  ] satisfies ProjectEntry[],
  impacts: [
    {
      title: "Webhook funnel with a zero-bug production run",
      summary: "A backend normalization layer was built to absorb inconsistent third-party webhook payloads and convert them into one dependable internal format.",
      indicators: ["Zero-bug record", "Long-lived production stability"],
      tags: ["NestJS", "MongoDB", "Reliability", "APIs"],
      details: [
        "The system sat behind real business workflows, so the main requirement was reliability over novelty.",
        "The implementation normalized multiple external payload shapes into a single trusted internal contract.",
        "Operationally, the outcome mattered more than architecture theater: stable data ingestion for years without production bugs."
      ]
    },
    {
      title: "Audit process that surfaced 100+ issues clearly",
      summary: "Client audits were turned into structured remediation documents with charts and prioritization instead of vague architecture opinions.",
      indicators: ["100+ issues mapped", "Actionable remediation path"],
      tags: ["Audits", "Code Quality", "Performance", "Consulting"],
      details: [
        "The goal was not merely to criticize code, but to convert findings into a sequence a team could actually execute.",
        "Issues were grouped, documented, and summarized visually so stakeholders could understand both severity and likely impact.",
        "That work created a clearer path for refactors, onboarding, and future capacity planning."
      ]
    },
    {
      title: "Build and tooling optimization for faster iteration",
      summary: "Internal packages and framework work were shaped around fast feedback loops, low dependency weight, and practical ergonomics for the people shipping features.",
      indicators: ["Sub-one-second builds", "Lower cold-start overhead"],
      tags: ["CI/CD", "Build Systems", "Tooling", "DX"],
      details: [
        "The optimization effort was aimed at daily developer throughput, not vanity benchmark screenshots.",
        "Dependency bloat was reduced, cold-start times improved, and the stack was kept modular enough for tree-shaking and targeted adoption.",
        "The result was a faster working rhythm for teams using the internal ecosystem."
      ]
    },
    {
      title: "Figma automation that bridged design and implementation",
      summary: "A custom plugin reconstructed pages from design JSON, shrinking the gap between design assets and frontend execution.",
      indicators: ["Design-to-code automation", "Faster handoff"],
      tags: ["Figma", "Automation", "Frontend", "Internal Tools"],
      details: [
        "The plugin focused on practical reconstruction rather than promising full one-click product generation.",
        "It reduced repetitive UI setup and made it easier to move structured design data into implementation workflows.",
        "That kind of internal tooling mattered because it accelerated the boring parts while preserving engineering control."
      ]
    }
  ] satisfies ImpactEntry[],
  initiatives: [
    {
      title: "Denshya",
      status: "Active initiative",
      summary: "Making better web infrastructure with small modular libraries: reactivity, runtime ideas, routing, documentation tooling, and UI foundations that stay understandable.",
      headline: "A frontend platform direction built from composable pieces rather than one oversized abstraction.",
      tags: ["Reactivity", "Routing", "UI runtime", "Standards-minded"]
    },
    {
      title: "Rukaku",
      status: "Personal product direction",
      summary: "Small regular-life and specialized apps built to be genuinely useful and entirely free, with no large-corporation extraction logic sitting behind them.",
      headline: "Software as a helpful object, not a funnel.",
      tags: ["Utility apps", "Self-hosted values", "Free software", "Practical UX"]
    },
    {
      title: "Indie Development",
      status: "In planning and prototyping",
      summary: "A longer-term plan to build small games and remaster older ideas with the same bias toward craft, clarity, and independence.",
      headline: "Game and interactive work without big-corporation greed as the default business model.",
      tags: ["Unity", "Godot", "Three.js", "Game prototypes"]
    }
  ] satisfies InitiativeEntry[],
  opportunity: {
    collaboration: ["Senior frontend engineer", "Frontend platform engineer", "Technical lead", "Frontend-leaning full-stack role"],
    focus: ["Architecture ownership", "Product delivery", "Design systems and UI infrastructure", "Internal tooling", "Performance-sensitive frontend work"],
    statement: "Best fit with teams that value sharp UI execution, strong TypeScript practices, and engineering decisions that improve the whole product system instead of just one feature ticket."
  },
  contacts: [
    {
      kind: "email",
      label: "Email",
      value: "minicablestone@gmail.com",
      href: "mailto:minicablestone@gmail.com"
    },
    {
      kind: "github",
      label: "GitHub",
      value: "github.com/FrameMuse",
      href: "https://github.com/FrameMuse"
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/framemuse",
      href: "https://www.linkedin.com/in/framemuse/"
    }
  ]
} as const
