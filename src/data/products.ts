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
  collaboratorOnly?: boolean;
  notices?: {
    extractionNote?: string;
    latencyNotice?: string;
    hardwareAdvisory?: string;
    securityNote?: string;
  };
}

export interface ProductDetail extends Product {
  long: string;
  flow: { step: string; detail: string }[];
  capabilities: string[];
  useCases: { title: string; description: string }[];
  technicalSpecs?: { property: string; value: string }[];
  batLaunchers?: { file: string; title: string; desc: string; command?: string }[];
}

export const products: ProductDetail[] = [
  {
    id: "gravity-llm",
    number: "01",
    name: "Gravity LLM",
    tagline:
      "Private. Blazing Fast. Fully Autonomous. The Next-Generation Local Intelligence Engine with 44 Built-in Tools, Instant GPU Acceleration, and Zero Cloud Dependency.",
    description:
      "An enterprise-grade, standalone local AI workspace developed by HS AI Solutions. Gravity runs 100% locally on your hardware with zero latency, zero cloud dependency, and complete privacy. Powered by a high-performance native GGUF tensor runtime, Gravity delivers visible live reasoning with active letter tracking (▌), dynamic VRAM auto-tuning, an autonomous suite of 44 integrated tools (native PDF/DOCX/XLSX/PPTX publication, sandboxed Python AST execution, DuckDuckGo scraping, offline Whisper voice), and triple-interface freedom across Desktop, Web, and CLI.",
    long: "Gravity LLM is an enterprise-grade, standalone local AI workspace engineered by Harshan Seliyan B S under HS AI Solutions to eliminate cloud latency, recurring API costs, and corporate data leakage. Running 100% locally on your workstation, Gravity pairs a specialized high-throughput GGUF runtime with dynamic hardware layer offloading (26 to 33 layers on modern RTX GPUs, with intelligent multi-core CPU vector fallback). It features transparent chain-of-thought live reasoning with an active letter-tracking cursor (▌) that automatically collapses upon completion, leaving solutions front-and-center. Beyond standard conversation, Gravity functions as an autonomous multi-step agent equipped with 44 built-in tools: compiling publication-grade PDF, Word, Excel, and PowerPoint decks; executing sandboxed Python scripts with AST syntax verification and recursive self-healing; conducting live web research and scraping via DuckDuckGo without API keys; processing offline Whisper voice input; and handling local SQLite queries and Git repository workflows across three native interfaces: frameless Desktop App, reactive Web UI, and high-speed Rich Terminal CLI.",
    category: "AUTONOMOUS LOCAL AI SUITE",
    url: "",
    status: "live",
    downloadUrl: "/api/download/gravity",
    collaboratorOnly: true,
    notices: {
      extractionNote:
        "After ZIP extraction, launch any interface directly by clicking the corresponding BAT file (gravity_desktop.bat, gravity.bat, or gravity.bat --cli).",
      latencyNotice:
        "Important: First token may be delayed during initial cold-start while tensors and KV caches are dynamically allocated into VRAM/RAM.",
      hardwareAdvisory:
        "More important: Use this according to your hardware specification. Model performance and inference speeds may be reduced on systems with limited GPU VRAM or lower CPU core limits.",
      securityNote:
        "Collaborator Edition: Download access is restricted strictly to authorized HS AI Solutions collaborators with a valid Collaborator ID.",
    },
    features: [
      "Zero-Latency Native GGUF Inference: Sub-0.9s TTFT with custom-compiled high-throughput C++ execution binaries",
      "Smart VRAM Auto-Tuning: Dynamic layer offload (26-33 layers) across RTX 3050, 40-series, or CPU fallback",
      "Visible Live Reasoning: Real-time chain-of-thought with active letter-tracking cursor (▌) and auto-collapsing thoughts",
      "Autonomous Agentic Suite (44 Tools): Native PDF, DOCX, XLSX & PPTX document compilation, web scraping, and SQLite workflows",
      "Sandboxed Python Code Execution: Built-in engine with automated AST syntax validation and error self-healing",
      "Offline Voice & Speech: Integrated MediaRecorder, offline Whisper speech-to-text, and natural Edge-TTS speech output",
      "Triple-Interface Freedom: Frameless Desktop App, Reactive Web UI, and High-Speed Rich CLI Console",
      "100% Air-Gapped & Confidential: Complete offline execution with built-in asset tampering protection",
    ],
    technologies: [
      "Autonomous Multi-Step Agent",
      "44 Integrated Tool Engine",
      "Quantized GGUF Runtime (5.24 GB)",
      "RTX CUDA Dynamic Offload (26-33 Layers)",
      "Whisper STT & Edge-TTS Speech",
      "In-Process Python Sandbox (AST)",
      "Triple Interface (Desktop/Web/CLI)",
      "OpenAI-Compatible API & SSE",
    ],
    accent: "#10b981",
    preview: "gravity-llm",
    flow: [
      {
        step: "Authorized Collaborator Verification",
        detail:
          "Validate your personal Collaborator ID to unlock and download Gravity_LLM_HS_AI_Solutions_Portable.zip.",
      },
      {
        step: "Extract Anywhere",
        detail:
          "Extract the portable suite to any drive without needing administrator privileges or python installation.",
      },
      {
        step: "Hardware-Aware Layer Offload",
        detail:
          "Dynamic allocator auto-detects GPU VRAM (RTX 3050, 40-series, or CPU) and allocates optimal tensor layers.",
      },
      {
        step: "Click Any Interface BAT",
        detail:
          "Double-click gravity_desktop.bat for frameless GUI, gravity.bat for reactive Web UI, or gravity.bat --cli for terminal.",
      },
      {
        step: "Autonomous Agent Execution",
        detail:
          "Execute 44 built-in tools, live reasoning, document publication, and sandboxed Python with 100% privacy.",
      },
    ],
    capabilities: [
      "Sub-0.9s TTFT local inference on RTX hardware",
      "Real-time visible chain-of-thought with letter tracking (▌)",
      "Autonomous 44-tool execution engine",
      "Publication-grade PDF, DOCX, XLSX, and PPTX generation",
      "AST-validated Python sandboxed code runner",
      "DuckDuckGo live web search and scraping without API keys",
      "Offline Whisper speech recognition & Edge-TTS voice synthesis",
      "OpenAI-compatible /v1/chat/completions drop-in endpoint",
    ],
    useCases: [
      {
        title: "Confidential enterprise document generation",
        description:
          "Compile publication-ready PDFs, DOCX briefs, XLSX financial sheets, and PPTX presentations locally without sending proprietary data to cloud APIs.",
      },
      {
        title: "Sandboxed autonomous scripting & coding",
        description:
          "Write, AST-validate, and execute Python code in real-time with automated syntax checks and error self-healing directly on your machine.",
      },
      {
        title: "Air-gapped technical research & web scraping",
        description:
          "Search and scrape technical documentation via DuckDuckGo and local knowledge caches with zero telemetry or API keys.",
      },
      {
        title: "Offline voice-driven technical workflows",
        description:
          "Dictate complex prompts and listen to technical walkthroughs with zero internet connection via embedded Whisper STT and Edge-TTS.",
      },
    ],
    technicalSpecs: [
      { property: "Product Name", value: "Gravity LLM" },
      { property: "Version", value: "1.0.0 (Production Suite)" },
      { property: "Engineering Organization", value: "HS AI Solutions" },
      { property: "Model Format", value: "Quantized GGUF (Gravity_LLM_HS_AI_Solutions_1.0.0.gguf)" },
      { property: "Model Size", value: "5.24 GB (Optimized for 6GB–8GB+ VRAM & CPU Fallback)" },
      { property: "GPU Layer Offload", value: "26 Layers (RTX 3050 6GB) / 33 Layers (8GB+ GPUs)" },
      { property: "Time to First Token (TTFT)", value: "0.45s – 0.88s across all interfaces" },
      { property: "Context Window", value: "4,096 to 16,384 tokens (Configurable via Profiles)" },
      { property: "Performance Profiles", value: "Fast · Balanced · High Performance · High Context · Low Memory" },
      { property: "Protocols Supported", value: "OpenAI-Compatible (/v1/chat/completions) · NDJSON · SSE" },
      { property: "Supported Interfaces", value: "Desktop App (.bat) · Web UI (.bat) · Terminal CLI (--cli)" },
      { property: "Integrated Tool Suite", value: "44 Built-in Tools (PDF, DOCX, XLSX, PPTX, Web, Python, Voice, SQLite)" },
      { property: "Data & Privacy Policy", value: "100% Air-Gapped Local Workstation · Zero Cloud Dependency" },
    ],
    batLaunchers: [
      {
        file: "gravity_desktop.bat",
        title: "Native Desktop Window",
        desc: "Modern, frameless native desktop application with zero browser tabs needed.",
      },
      {
        file: "gravity.bat",
        title: "Single-Page Web UI",
        desc: "Fast reactive interface with dark/light themes, prompt accelerators, workspace file managers, and live markdown preview.",
      },
      {
        file: "gravity.bat --cli",
        title: "Interactive Terminal CLI",
        desc: "High-speed terminal console with streaming Rich markdown, syntax highlighting, and persistent session history.",
      },
    ],
  },
  {
    id: "domcode-llm",
    number: "02",
    name: "Domcode LLM",
    tagline: "The Self-Contained, Air-Gapped AI Coding Assistant for Windows",
    description:
      "An enterprise-grade, standalone desktop AI programming assistant engineered by HS AI Solutions. Domcode LLM delivers high-performance code generation, technical architecture design, and real-time debugging directly on your local hardware—with zero external dependencies and zero cloud reliance. Unlike conventional AI wrappers that require Ollama, Docker, or Python runtimes, Domcode LLM runs an in-process, highly optimized C++ neural engine bundled with an all-in-one installer.",
    long: "Domcode LLM is an enterprise-grade, standalone desktop AI programming assistant engineered by HS AI Solutions. Designed specifically for software engineers, devops teams, and researchers, Domcode LLM delivers high-performance code generation, technical architecture design, and real-time debugging directly on your local hardware—with zero external dependencies and zero cloud reliance. Unlike conventional AI wrappers that require Ollama, Docker, or Python runtimes, Domcode LLM runs an in-process, highly optimized C++ neural engine bundled with an all-in-one installer. Install once and code anywhere: on a flight, in a secure air-gapped lab, or on your daily workstation. Powered by a 3.56 GB GGUF Q4_0 quantized model embedded directly in the installer, Domcode supports a 4,096-token context window (scalable to 16,384), multi-language mastery across Python, TypeScript, JavaScript, Rust, Go, C++, C#, Java, SQL, Docker, and Kubernetes, and smart dataset-aware web search that keeps core coding tasks strictly offline while optionally grounding temporal queries via live Wikipedia and Bing synthesis.",
    category: "AI CODING ASSISTANT",
    url: "",
    status: "live",
    downloadUrl: "/api/download/domcode",
    collaboratorOnly: true,
    notices: {
      securityNote:
        "Collaborator Edition: Access restricted to authorized HS AI Solutions collaborators with a valid Collaborator ID.",
      hardwareAdvisory:
        "Minimum: Intel Core i5 8th Gen+ / AMD Ryzen 5 (AVX2), 8 GB RAM, 6 GB SSD. Recommended: Core i7/i9 or Ryzen 7/9, 16 GB+ RAM, NVIDIA RTX 3060+ for accelerated token streaming.",
    },
    features: [
      "100% Self-Contained & Native: Zero Ollama, Docker, or Python runtime required — in-process C++ neural engine",
      "Embedded Neural Weights: Complete 3.56 GB GGUF Q4_0 model packed directly inside the all-in-one installer",
      "Direct Hardware Acceleration: Multi-core AVX2/AVX-512 and automatic GPU offload libraries",
      "Large Context Window (4,096–16,384 tokens): Full multi-tier architecture and module refactoring without context clipping",
      "Multi-Language Mastery: Python, TypeScript, JavaScript, Rust, Go, C++, C#, Java, SQL, Docker & Kubernetes",
      "Smart Dataset-Aware Web Search: Offline coding tasks + optional dual live grounding (Wikipedia + Bing) with user toggle",
      "Enterprise Air-Gapped Compliance: Zero telemetry, zero cloud transmission — complete data residency on local RAM",
      "Cyber-Aesthetic Dark UI: Glassmorphism interface with streaming tokens, syntax highlighting, and 1-click clipboard copy",
    ],
    technologies: [
      "GGUF Q4_0 Quantized (3.56 GB Embedded)",
      "In-Process llama.cpp C/C++ Binding",
      "AVX2 / AVX-512 Multi-Core",
      "Automatic GPU Offload",
      "Dual Live Grounding (Wikipedia + Bing)",
      "Windows Native Standalone Installer",
      "Zero Ollama / Docker / Python",
    ],
    accent: "#f59e0b",
    preview: "domcode-llm",
    flow: [
      {
        step: "Download & Run",
        detail: "Launch DomcodeLLM-Setup.exe after verifying your Collaborator ID.",
      },
      {
        step: "One-Click Installation",
        detail:
          "The installer unpacks the native C++ runtime, registers the 3.56 GB neural weights, and creates desktop and Start Menu shortcuts automatically.",
      },
      {
        step: "Launch & Start Coding",
        detail:
          "Click 'Launch Domcode LLM' to open the interactive interface. Neural weights load in seconds with real-time progress indicators. Start generating production-ready code instantly.",
      },
    ],
    capabilities: [
      "Production-ready code generation with error handling, docstrings, and typing hints",
      "Technical architecture design for microservices, REST APIs, and database schemas",
      "Real-time debugging and code explanation across 10+ languages",
      "Automatic GPU offload / multi-core CPU fallback inference",
      "Dual live web grounding (Wikipedia + Bing) with user toggle",
      "Export conversations to technical log files with a single click",
      "Precision refactoring with 4,096–16,384 token context window",
      "Contained activity indicator with glowing ring around chat composer",
    ],
    useCases: [
      {
        title: "Air-gapped enterprise code generation",
        description:
          "Generate production-ready code, APIs, and architectures on secure networks with zero cloud transmissions — ideal for defense, fintech, and healthcare environments.",
      },
      {
        title: "Offline technical debugging & code review",
        description:
          "Diagnose bugs, perform OWASP security audits, and review entire modules without sending proprietary code to any external server.",
      },
      {
        title: "Multi-language refactoring & architecture design",
        description:
          "Refactor large codebases across Python, TypeScript, Rust, Go, and more with a 16,384-token context window for full module awareness.",
      },
      {
        title: "DevOps & infrastructure scripting",
        description:
          "Generate Docker Compose files, Kubernetes manifests, CI/CD pipelines, and shell automation scripts locally with expert-level precision.",
      },
    ],
    technicalSpecs: [
      { property: "Product Version", value: "1.0.0" },
      { property: "Developer / Vendor", value: "HS AI Solutions" },
      { property: "Target OS", value: "Windows 10 / Windows 11 (64-bit)" },
      { property: "Model Format", value: "GGUF Q4_0 Quantized (Enhanced BPW)" },
      { property: "Model Size", value: "3.56 GB Neural Weights (Embedded)" },
      { property: "Engine Core", value: "In-Process llama.cpp Native C/C++ Binding" },
      { property: "Context Window", value: "4,096 Tokens (Scalable up to 16,384)" },
      { property: "Inference Modes", value: "Automatic GPU Offload / Multi-Core CPU Fallback" },
      { property: "Search Capabilities", value: "Dual Live Grounding (Wikipedia + Bing) with User Toggle" },
      { property: "Installer Type", value: "All-in-One Standalone Setup (DomcodeLLM-Setup.exe)" },
    ],
  },
  {
    id: "galaxy-vision",
    number: "03",
    name: "Galaxy Vision",
    tagline: "The AI that understands what it sees — and what you mean.",
    description:
      "A locally-hosted multimodal vision-language AI by HS AI Solutions — built for real-world analysis, not just chat. It sees images, reads documents, understands video frames, searches the web in real time, and holds full multi-turn conversations with pronoun and context awareness. All inference runs on your own GPU — no cloud, no subscriptions, complete privacy.",
    long: "Galaxy Vision 1.0.0 is an enterprise-grade, locally-deployed multimodal vision-language AI system developed by HS AI Solutions for professionals who require deep visual understanding, automated document intelligence, and context-aware conversation without sending data to any third-party cloud. Running entirely on your local GPU (optimized for NVIDIA RTX 3050+ with 6GB VRAM), Galaxy Vision processes high-resolution images, complex invoices, receipts, technical schematics, and video frame sequences with surgical precision. It features full pronoun resolution and conversational entity tracking, offline-first DuckDuckGo web search synthesis, and a drop-in OpenAI-compatible REST API. With portable one-click BAT launchers, you can start the native Desktop GUI, Web UI, CLI, or API server immediately after extracting the ZIP file.",
    category: "MULTIMODAL VISION-LANGUAGE AI",
    url: "",
    status: "live",
    downloadUrl:
      "https://1drv.ms/u/c/A4DE4F83095B15B0/IQBxmNpxxijbRrZxRbr2j7i6AddHgte4YOJ7o-aURM3-nFk?e=KJ0txZ",
    features: [
      "Vision & OCR: Analyze images, text extraction, chart interpretation & object detection",
      "Document Intelligence: Parse invoices, receipts & tables into structured JSON",
      "Video Frame Analysis: Sample keyframes & synthesize chronological event narratives",
      "Live Screenshot AI: Instant real-time breakdown of visible screen, code, errors & UI",
      "Web Search + AI Synthesis: Grounded DuckDuckGo queries without API keys",
      "Conversational Context Memory: Full pronoun resolution & multi-turn entity tracking",
      "100% Local & Private: Runs on local RTX GPU with zero cloud leakage",
      "OpenAI-Compatible API: Drop-in support for VS Code, Continue.dev, AnythingLLM & Open WebUI",
      "One-Click BAT Launchers: Run as Desktop App, Web UI, CLI, or REST API",
    ],
    technologies: [
      "Multimodal Vision-Language",
      "Q4_K_M 4-bit Quantization",
      "8,192 Token Context Window",
      "NVIDIA RTX GPU Accelerated",
      "DuckDuckGo Search Bridge",
      "OpenAI /v1 API Endpoints",
      "Portable Windows Bundle (.bat)",
      "Desktop App & Web UI",
    ],
    accent: "#c084fc",
    preview: "galaxy-vision",
    flow: [
      { step: "Download Standalone ZIP", detail: "Download Galaxy-Vision-v1.0.0-Standalone.zip directly from high-speed cloud mirror." },
      { step: "Extract Anywhere", detail: "Extract the zip contents to any local folder without admin rights or external installations." },
      { step: "Run setup.bat", detail: "Execute setup.bat once to configure your local Python environment and check GPU readiness." },
      { step: "Select BAT Launcher", detail: "Launch start_desktop.bat for GUI, start_web_ui.bat for browser, start_cli.bat for CLI, or start_api.bat for REST server." },
      { step: "Local Multimodal Analysis", detail: "Feed images, documents, screenshots, and queries with full context memory and 100% privacy." },
    ],
    capabilities: [
      "Sub-second OCR & structured table parsing",
      "Multi-turn pronoun and entity tracking across dialogue",
      "Sequential video keyframe narrative synthesis",
      "DuckDuckGo real-time cited web search",
      "OpenAI-compatible /v1/chat/completions drop-in",
      "100% Air-gapped local execution on NVIDIA RTX GPUs",
    ],
    useCases: [
      { title: "Confidential document parsing", description: "Extract tables and financial figures from invoices and legal contracts without uploading to cloud servers." },
      { title: "Visual coding & error debugging", description: "Capture live screenshots of code, terminals, and UI errors for instant diagnosis and solution generation." },
      { title: "Video & surveillance auditing", description: "Analyze video footage keyframes chronologically to extract timelines and event summaries." },
      { title: "Air-gapped enterprise intelligence", description: "Deploy an OpenAI-compatible vision-language API for internal developer tools in secure offline networks." },
    ],
    technicalSpecs: [
      { property: "Model Family", value: "Galaxy (HS AI Solutions)" },
      { property: "Version", value: "1.0.0" },
      { property: "Architecture", value: "Multimodal Vision-Language" },
      { property: "Foundation", value: "Apache 2.0 open-source base" },
      { property: "Quantization", value: "Q4_K_M (4-bit)" },
      { property: "Context Window", value: "8,192 tokens" },
      { property: "Recommended GPU", value: "NVIDIA RTX 3050+ (6 GB VRAM)" },
      { property: "Interface", value: "Web UI · Desktop App · CLI · REST API" },
      { property: "Inference", value: "Local only — fully air-gapped capable" },
    ],
    batLaunchers: [
      {
        file: "start_desktop.bat",
        title: "Desktop Application (GUI)",
        desc: "Native desktop window with file dropzone, image preview, OCR inspector, and chat dialogue.",
      },
      {
        file: "start_web_ui.bat",
        title: "Browser Web UI",
        desc: "Full browser interface on localhost with document parsing, multi-turn history, and live markdown.",
      },
      {
        file: "start_cli.bat",
        title: "Command-Line Interface (CLI)",
        desc: "Fast terminal session for power users, scripts, batch processing, and headless servers.",
      },
      {
        file: "start_api.bat",
        title: "OpenAI-Compatible REST API",
        desc: "Local server at /v1/chat/completions compatible with VS Code, Continue.dev, and Open WebUI.",
      },
      {
        file: "galaxy-vision.bat",
        title: "Master Interactive Launcher",
        desc: "Interactive console menu to choose any interface mode with one keystroke.",
      },
      {
        file: "setup.bat",
        title: "One-Click Environment Setup",
        desc: "Verifies Python dependencies, initializes local configuration, and tests GPU readiness.",
      },
    ],
  },
  {
    id: "electron",
    number: "04",
    name: "Electron AI",
    tagline: "Proprietary Offline AI Model & Real-Time Web Search",
    description:
      "A lightweight, standalone AI model developed and fully owned by HS AI Solutions. Runs completely offline without network on any laptop with 4GB RAM — with zero Ollama setup — and performs universal real-time web search.",
    long: "Electron AI is a proprietary AI model designed, developed, and fully owned by Harshan Seliyan B S under HS AI Solutions. Tuned with Knowledge Distillation and packaged into an ultra-optimized standalone engine, Electron runs 100% offline without any network connection on standard laptops with as little as 4GB of RAM — requiring no Ollama installation or complex environment setup. When connected to the internet, its integrated search bridge automatically performs real-time DuckDuckGo web searches across any interface. After downloading the ZIP file, simply extract it and click Start-Electron.bat to launch your private AI workspace.",
    category: "OWN AI MODEL",
    url: "",
    status: "live",
    downloadUrl: "https://1drv.ms/u/c/A4DE4F83095B15B0/IQDY8K9iXhZkQayEL_CMStd_AU2Kq61gd1RgfIles4t9BrE?e=76ltt3",
    features: [
      "100% Offline execution without network",
      "Universal real-time web search integration",
      "Ultra-lightweight: Runs smoothly on 4GB RAM laptops",
      "Standalone package: Zero Ollama required",
      "Proprietary model by HS AI Solutions",
      "One-click launch with Start-Electron.bat",
      "OpenAI & Ollama compatible local API endpoints",
    ],
    technologies: [
      "HS AI Proprietary Model",
      "Knowledge Distillation",
      "GGUF Runtime",
      "llama-server",
      "DuckDuckGo Search Bridge",
      "Standalone Windows Bundle",
      "Local Web UI",
    ],
    accent: "#38bdf8",
    preview: "electron",
    flow: [
      { step: "Download ZIP", detail: "Download Electron-AI-Standalone-NoOllama.zip directly to your machine." },
      { step: "Extract Archive", detail: "Extract the zip contents to any folder without admin rights or dependencies." },
      { step: "Click Start-Electron.bat", detail: "Launch the engine, real-time web search bridge, and browser interface with one click." },
      { step: "Offline & Web Reasoning", detail: "Chat without network, or query live web search results seamlessly." },
    ],
    capabilities: [
      "100% Offline local intelligence",
      "DuckDuckGo real-time web search",
      "4GB RAM low-spec laptop optimization",
      "Zero telemetry & total data privacy",
      "Universal interface compatibility",
      "No Ollama or external dependencies",
    ],
    useCases: [
      { title: "Offline productivity", description: "Work without internet connection on flights, commutes, or remote locations." },
      { title: "Budget & 4GB RAM laptops", description: "Run an AI model locally without lag on entry-level hardware." },
      { title: "Real-time web research", description: "Get answers backed by live web data directly in your private chat." },
      { title: "Air-gapped security", description: "Keep your data, prompts, and code strictly on your local machine." },
    ],
  },
  {
    id: "pendulum",
    number: "05",
    name: "Pendulum",
    tagline: "Automated Private Browser",
    description:
      "An intelligent, privacy-first automated desktop browser engineered with AI workflow automation, anti-tracking shields, and stealth web exploration.",
    long: "Pendulum redefines how you explore, extract, and automate the web with uncompromising privacy. Built as a native desktop browser, Pendulum pairs automated intelligent agents with hardened stealth capabilities — blocking trackers, isolating fingerprints, automating repetitive browsing tasks, and letting you direct complex web workflows locally on your machine.",
    category: "AI BROWSER & PRIVACY",
    url: "",
    status: "live",
    downloadUrl: "/downloads/pendulum-setup.exe",
    features: [
      "AI-powered web automation",
      "Private stealth browsing",
      "Anti-fingerprinting & tracker blocking",
      "Automated session isolation",
      "Intelligent web agent workflows",
      "Local-first desktop performance",
      "Windows x64 installer",
    ],
    technologies: [
      "Electron",
      "Chromium Engine",
      "AI Browser Agents",
      "Stealth & Anti-Tracking",
      "Workflow Automation",
      "TypeScript",
      "Windows Desktop",
    ],
    accent: "#a855f7",
    preview: "pendulum",
    flow: [
      { step: "Stealth initialization", detail: "Session launches in an isolated, tracker-free sandbox with spoofed fingerprints." },
      { step: "Intent & workflow brief", detail: "Natural language instructions or automated routines guide the browser agent." },
      { step: "Intelligent DOM navigation", detail: "AI parses pages, solves navigation paths, and automates multi-step interactions." },
      { step: "Data extraction & privacy guard", detail: "Extracts target insights while filtering telemetry and tracking scripts." },
      { step: "Clean session export", detail: "Deliverables are saved locally; cookies and temporary cache are purged on demand." },
    ],
    capabilities: [
      "Autonomous multi-step browsing",
      "Tracker & fingerprint shielding",
      "Intelligent web data extraction",
      "Isolated private container tabs",
      "Natural language automation triggers",
      "Zero telemetry local execution",
    ],
    useCases: [
      { title: "Private research & intelligence", description: "Scrape, monitor, and research without leaving telemetry or digital footprints." },
      { title: "Repetitive web automation", description: "Automate form filling, portal checks, and multi-step web flows hands-free." },
      { title: "Stealth testing & QA", description: "Test web apps across clean environments with custom browser parameters." },
      { title: "Privacy-first daily browsing", description: "Experience high-speed web navigation with built-in ad and tracker annihilation." },
    ],
  },
  {
    id: "lumina",
    number: "06",
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
    number: "07",
    name: "HSBot",
    tagline: "Multi-Model AI Chatbot",
    description:
      "A multi-model AI assistant that brings different AI models into one intelligent conversational workspace.",
    long: "One question asked once — answered by many intelligences. HSBot routes a single conversation through multiple AI models, so you can compare reasoning, pick the strongest response, and switch perspective mid-conversation. It turns model choice from a technical decision into part of the conversation itself.",
    category: "AI INTELLIGENCE",
    url: "https://hs-chatbot-1-wudb.onrender.com/",
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
    number: "08",
    name: "Ledger",
    tagline: "AI Digital Identity & Career Intelligence",
    description:
      "An AI-powered digital identity system that connects documents, credentials, projects, skills, and career intelligence into one personal knowledge archive.",
    long: "Ledger turns scattered evidence of a career — certificates, resumes, projects, portfolios — into a connected personal intelligence layer. It ingests documents, builds a knowledge graph of what you have done and what you can do, and answers career questions: which gaps block the role you want, how your profile matches a job description, and what to build next.",
    category: "AI CAREER",
    url: "https://ledger-2-awfn.onrender.com/",
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
    number: "09",
    name: "Phishing Defence",
    tagline: "AI Phishing & Malicious Link Protection",
    description:
      "An AI-powered security system designed to identify suspicious emails, URLs, and malicious links before users interact with them.",
    long: "Phishing Defence sits between people and the links they are about to trust. A URL or email is analyzed before any click: domain reputation, URL signals, structural anomalies and language patterns are checked together, scored, and answered with a clear verdict — safe, suspicious, or malicious — before it becomes a problem.",
    category: "AI SECURITY",
    url: "https://forensic-ai-hs.onrender.com/",
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
    number: "10",
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
  {
    id: "academia",
    number: "11",
    name: "Academia AI",
    tagline: "Personal AI Learning Operating System",
    description:
      "An AI learning platform that turns your syllabus, books, notes, and previous papers into a personalized roadmap, live tutor, quiz generator, and progress analytics engine.",
    long: "Academia AI is a learning operating system for students. Upload your syllabus, textbooks, notes, and previous exam papers — the AI builds a semester roadmap, teaches every concept through an interactive AI tutor, answers doubts, generates adaptive quizzes, predicts weak areas, and tracks mastery with detailed analytics. From PDFs and PPTX to voice learning, Academia AI covers the full learning loop.",
    category: "AI EDUCATION",
    url: "https://acdemia01-2.onrender.com/",
    status: "live",
    features: [
      "Personalized learning roadmap",
      "AI tutor for every topic",
      "Knowledge graph of concepts",
      "Smart notes generation",
      "Adaptive quiz generator",
      "Progress analytics",
      "Voice learning",
      "Multi-file upload (PDF, PPTX, DOCX, images, video, ZIP)",
    ],
    technologies: [
      "LLM APIs",
      "RAG",
      "Knowledge Graphs",
      "Next.js",
      "Node.js",
      "Python",
      "Voice AI",
      "Cloud Deployment",
    ],
    accent: "#60a5fa",
    preview: "academia",
    flow: [
      { step: "Upload materials", detail: "Syllabus, books, notes, and previous papers enter the system." },
      { step: "Roadmap generation", detail: "A personalized semester roadmap is built automatically." },
      { step: "AI tutoring", detail: "Every concept is explained like a one-on-one professor session." },
      { step: "Assessment", detail: "Adaptive quizzes surface weak areas and reinforce learning." },
      { step: "Analytics", detail: "Mastery tracking shows exactly what to revise next." },
    ],
    capabilities: [
      "Document understanding",
      "Syllabus-aware planning",
      "Concept-level tutoring",
      "Knowledge graph mapping",
      "Adaptive question generation",
      "Mastery analytics",
      "Voice interaction",
    ],
    useCases: [
      { title: "Semester preparation", description: "Turn a syllabus into a complete learning roadmap." },
      { title: "Exam revision", description: "Previous papers become adaptive practice and weak-spot analysis." },
      { title: "Concept mastery", description: "Learn any topic with a tutor that adapts to you." },
      { title: "Hands-free study", description: "Talk to the AI tutor while commuting or multitasking." },
    ],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getProductByPreview = (preview: string) =>
  products.find((p) => p.preview === preview);

export const productIdFromSlug: Record<string, string> = Object.fromEntries(
  products.map((p) => [p.id, p.id])
);
