export interface Product {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  url: string;
  status: "live" | "development";
  downloadUrl?: string;
  features: string[];
  technologies: string[];
  accent: string;
  preview: string;
}

export interface ProductDetail extends Product {
  long: string;
  flow: { step: string; detail: string }[];
  capabilities: string[];
  useCases: { title: string; description: string }[];
}

export const products: ProductDetail[] = [
  {
    id: "lumina",
    number: "01",
    name: "Lumina",
    tagline: "AI Presentation Generator",
    description:
      "Turn ideas, research, and content into intelligent presentations with AI-powered planning, content generation, slide architecture, and presentation design.",
    long: "Lumina starts where most decks fail: with nothing but an idea. It plans the narrative, structures the slide architecture, generates the content, and applies a coherent visual design — so an empty prompt becomes a presentation ready to export. Instead of editing slides one box at a time, you direct the story; Lumina does the craft.",
    category: "AI CREATION",
    url: "https://lumina-pghe.onrender.com/",
    status: "live",
    features: [
      "AI presentation generation",
      "Content planning",
      "Slide architecture",
      "AI-powered design",
      "Visual storytelling",
      "Structured slide creation",
      "Export-ready presentations",
    ],
    technologies: [
      "LLM APIs",
      "Python",
      "FastAPI",
      "React",
      "Next.js",
      "RAG",
      "Cloud Deployment",
    ],
    accent: "#f5a623",
    preview: "lumina",
    flow: [
      { step: "Idea intake", detail: "A topic, a brief, or raw research content enters the system." },
      { step: "Narrative planning", detail: "The AI reasons about the audience and builds a story arc." },
      { step: "Slide architecture", detail: "Each section becomes a structured sequence of slides." },
      { step: "Content generation", detail: "Every slide is filled with grounded, relevant copy." },
      { step: "Design system", detail: "Layouts, type and color are applied automatically." },
      { step: "Export", detail: "A finished, export-ready presentation comes out the other side." },
    ],
    capabilities: [
      "Content reasoning",
      "Narrative structuring",
      "Slide planning",
      "Automatic layout",
      "Visual system generation",
      "Grounded research synthesis",
    ],
    useCases: [
      { title: "Pitch decks", description: "From a startup idea to a structured investor story." },
      { title: "Lecture material", description: "Turn lecture notes and readings into teaching slides." },
      { title: "Research briefs", description: "Condense dense research into a scannable narrative." },
      { title: "Workshop content", description: "Rapidly prototype workshop and training material." },
    ],
  },
  {
    id: "hsbot",
    number: "02",
    name: "HSBot",
    tagline: "Multi-Model AI Chatbot",
    description:
      "A multi-model AI assistant that brings different AI models into one intelligent conversational workspace.",
    long: "One question asked once — answered by many intelligences. HSBot routes a single conversation through multiple AI models, so you can compare reasoning, pick the strongest response, and switch perspective mid-conversation. It turns model choice from a technical decision into part of the conversation itself.",
    category: "AI INTELLIGENCE",
    url: "https://hs-chatbot-3.onrender.com/",
    status: "live",
    features: [
      "Multi-model conversations",
      "AI chat",
      "Model switching",
      "Context-aware conversations",
      "AI assistance",
      "Intelligent responses",
    ],
    technologies: [
      "LLM APIs",
      "Python",
      "FastAPI",
      "React",
      "Node.js",
      "WebSockets",
      "Cloud Deployment",
    ],
    accent: "#22d3ee",
    preview: "hsbot",
    flow: [
      { step: "User message", detail: "A message enters the conversational workspace." },
      { step: "Model routing", detail: "The message fans out to the selected AI models." },
      { step: "Parallel reasoning", detail: "Each model produces an independent response." },
      { step: "Workspace synthesis", detail: "Responses return into a shared, context-aware thread." },
      { step: "Choice", detail: "You keep, compare, or re-ask with any model." },
    ],
    capabilities: [
      "Multi-model orchestration",
      "Live model switching",
      "Conversation memory",
      "Context-aware responses",
      "Response comparison",
      "Streaming output",
    ],
    useCases: [
      { title: "Model comparison", description: "Ask the same question to several models side by side." },
      { title: "Drafting", description: "Generate alternatives and pick the best voice." },
      { title: "Reasoning tasks", description: "Use stronger reasoning models when it matters." },
      { title: "Daily assistance", description: "A single workspace for all AI conversations." },
    ],
  },
  {
    id: "ledger",
    number: "03",
    name: "Ledger",
    tagline: "AI Digital Identity & Career Intelligence",
    description:
      "An AI-powered digital identity system that connects documents, credentials, projects, skills, and career intelligence into one personal knowledge archive.",
    long: "Ledger turns scattered evidence of a career — certificates, resumes, projects, portfolios — into a connected personal intelligence layer. It ingests documents, builds a knowledge graph of what you have done and what you can do, and answers career questions: which gaps block the role you want, how your profile matches a job description, and what to build next.",
    category: "AI CAREER",
    url: "https://ledger-1-2ttx.onrender.com/",
    status: "live",
    features: [
      "Document ingestion",
      "Credential archive",
      "Timeline",
      "Connections",
      "Document retrieval",
      "Career analysis",
      "Career readiness",
      "Resume analysis",
      "Portfolio intelligence",
      "Career matching",
      "Skill-gap analysis",
      "Job description matching",
      "Career Copilot",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Vector Search",
      "RAG",
      "LLM APIs",
      "AI Agents",
    ],
    accent: "#8b7cf6",
    preview: "ledger",
    flow: [
      { step: "Ingestion", detail: "Certificates, resumes, projects and documents are absorbed." },
      { step: "Digital identity", detail: "Evidence becomes structured profile data." },
      { step: "Knowledge graph", detail: "Skills, credentials and projects become connected nodes." },
      { step: "Career intelligence", detail: "Analysis surfaces readiness, matches and gaps." },
      { step: "Recommendations", detail: "Personalized next steps for the career you want." },
    ],
    capabilities: [
      "Document understanding",
      "Credential extraction",
      "Skill extraction",
      "Knowledge graph building",
      "Career readiness scoring",
      "Job description matching",
      "Skill-gap analysis",
      "Career Copilot guidance",
    ],
    useCases: [
      { title: "Profile building", description: "One archive that becomes a living professional identity." },
      { title: "Job matching", description: "Paste a job description and see how you stack up." },
      { title: "Skill planning", description: "Know exactly which gaps block your next role." },
      { title: "Interview prep", description: "Career Copilot guidance grounded in your own record." },
    ],
  },
  {
    id: "phishing-defence",
    number: "04",
    name: "Phishing Defence",
    tagline: "AI Phishing & Malicious Link Protection",
    description:
      "An AI-powered security system designed to identify suspicious emails, URLs, and malicious links before users interact with them.",
    long: "Phishing Defence sits between people and the links they are about to trust. A URL or email is analyzed before any click: domain reputation, URL signals, structural anomalies and language patterns are checked together, scored, and answered with a clear verdict — safe, suspicious, or malicious — before it becomes a problem.",
    category: "AI SECURITY",
    url: "https://efinal-ok77.vercel.app/",
    status: "live",
    features: [
      "URL verification",
      "Email verification",
      "Phishing detection",
      "Malicious link detection",
      "Threat analysis",
      "Security intelligence",
      "Risk assessment",
    ],
    technologies: [
      "AI Threat Models",
      "Next.js",
      "Node.js",
      "URL Intelligence",
      "Risk Scoring",
      "Cloud Deployment",
    ],
    accent: "#f4495f",
    preview: "phishing",
    flow: [
      { step: "Input", detail: "A suspicious URL or email enters the scanner." },
      { step: "AI analysis", detail: "Domain, URL signals and content are examined together." },
      { step: "Threat detection", detail: "Patterns of known phishing behavior are matched." },
      { step: "Risk assessment", detail: "Indicators are fused into a single threat score." },
      { step: "Verdict", detail: "SAFE / SUSPICIOUS / MALICIOUS — before you click." },
    ],
    capabilities: [
      "Domain reputation intelligence",
      "URL signal analysis",
      "Email content analysis",
      "Phishing pattern detection",
      "Threat scoring",
      "Instant verdicts",
    ],
    useCases: [
      { title: "Link safety checks", description: "Verify an unfamiliar link before clicking." },
      { title: "Email triage", description: "Decide whether a message is trustworthy." },
      { title: "Account protection", description: "Catch credential-harvesting attempts early." },
      { title: "Teaching moments", description: "Understand why a link was flagged." },
    ],
  },
  {
    id: "hs-code",
    number: "05",
    name: "HS CODE",
    tagline: "AI Code Companion · Windows Desktop",
    description:
      "A desktop-first AI coding companion — still in development. An early build (v0.1.0) that brings AI assistance to your local workflow in a lightweight native app.",
    long: "HS CODE is being built as a local-first desktop companion for working with code. v0.1.0 is an early, installable build — the foundation of a tool where AI help lives in your workflow instead of a browser tab. The desktop app is in active development: the current build is a real, downloadable milestone, and the feature set is evolving with each release.",
    category: "AI DESKTOP",
    url: "",
    status: "development",
    downloadUrl: "/downloads/hs-code-setup.exe",
    features: [
      "Desktop-native app",
      "Lightweight local installer",
      "AI-assisted coding workflows",
      "Early access v0.1.0 build",
      "Windows x64 support",
      "Active development",
      "Iterative releases",
    ],
    technologies: [
      "Windows Desktop",
      "Native App",
      "AI Models",
      "Local-first",
    ],
    accent: "#4ade80",
    preview: "hscode",
    flow: [
      { step: "Install", detail: "Download the Windows installer and run it locally." },
      { step: "Launch", detail: "Open the native desktop app from your machine." },
      { step: "Work with AI", detail: "Use AI assistance as part of your coding flow." },
      { step: "Feedback", detail: "In-development — feedback shapes the next release." },
    ],
    capabilities: [
      "Desktop-native experience",
      "Local-first assistant",
      "Early-stage feature set",
      "Rapid iteration",
    ],
    useCases: [
      { title: "Early adopters", description: "Try the first desktop milestone of HS CODE." },
      { title: "Development testing", description: "Validate the core experience before full release." },
      { title: "Workflow feedback", description: "Shape what the companion becomes next." },
    ],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getProductByPreview = (preview: string) =>
  products.find((p) => p.preview === preview);

export const productIdFromSlug: Record<string, string> = Object.fromEntries(
  products.map((p) => [p.id, p.id])
);
