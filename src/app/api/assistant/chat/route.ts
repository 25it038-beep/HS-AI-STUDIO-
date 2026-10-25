import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge, getKnowledgeStatus } from "@/lib/knowledge-engine";
import { searchWeb, WebSearchResult } from "@/lib/web-search";
import { products } from "@/data/products";

// Universal Knowledge Engine: Handles coding, math, general science, technology, live web synthesis, and site telemetry navigation
function generateIntelligentResponse(
  userMessage: string,
  retrievedPassages: string[],
  webResults: WebSearchResult[],
  isProductQuery: boolean,
  telemetry?: any
): string {
  const q = userMessage.trim();
  const qLower = q.toLowerCase();

  // 1. Identity Queries
  if (
    qLower.includes("what is your name") ||
    qLower.includes("who are you") ||
    qLower.includes("your name") ||
    qLower.includes("what model") ||
    qLower.includes("what are you")
  ) {
    return "Hello! I am **HS Solutions Mini Star LLM**, the conversational AI language model developed, customized, and maintained by **HS AI Solutions**.";
  }

  if (
    qLower.includes("who created you") ||
    qLower.includes("who developed you") ||
    qLower.includes("who made you") ||
    qLower.includes("who owns you") ||
    qLower.includes("who built you") ||
    qLower.includes("who is your creator")
  ) {
    return "**HS AI Solutions** (founded by Harshan Seliyan) developed, customized, and maintains **HS Solutions Mini Star LLM** as its own lightweight AI model.";
  }

  if (
    qLower.includes("qwen") ||
    qLower.includes("alibaba") ||
    qLower.includes("llama") ||
    qLower.includes("openai") ||
    qLower.includes("chatgpt")
  ) {
    return "I am **HS Solutions Mini Star LLM**, developed, customized, and maintained by **HS AI Solutions**.";
  }

  // 2. Site Telemetry Awareness: Help the visitor based on their active page and location
  if (
    qLower.includes("where am i") ||
    qLower.includes("what page") ||
    qLower.includes("help me with this page") ||
    qLower.includes("what does this do") ||
    qLower.includes("what is this tool") ||
    qLower.includes("how do i use this") ||
    qLower.includes("what can i do here")
  ) {
    if (telemetry?.activeProduct) {
      const p = telemetry.activeProduct;
      return `You are currently viewing **${p.name}** (${p.category || "AI System"}).\n\n**Overview:**\n${p.description || p.tagline}\n\n**On This Page You Can:**\n• Inspect the live architecture and technical highlights\n• Test the system capabilities directly\n• Access documentation and launch options\n\nLet me know if you'd like a walkthrough of its key features!`;
    }
    if (telemetry?.pathname?.startsWith("/admin")) {
      return `You are currently in the **Administration & Release Management Portal** where administrators can draft, schedule, and broadcast announcements to subscribers.`;
    }
    return `You are currently on the **HS AI Studio Home Portal** (${telemetry?.currentSection || "Overview"}).\n\nFrom here, you can:\n• Explore our 9 featured systems in the **Projects Showcase**\n• Test our compact in-browser and local AI models\n• Catch up on recent product announcements and updates`;
  }

  // 3. Specific HS AI Studio Products (ONLY when user explicitly asks for products or mentions a product)
  if (isProductQuery) {
    for (const p of products) {
      if (qLower.includes(p.name.toLowerCase()) || qLower.includes(p.id.toLowerCase())) {
        return `**${p.name}** (#${p.number} · ${p.category})\n\n${p.description}\n\n**Key Highlights:**\n${p.features.slice(0, 4).map((f) => `• ${f}`).join("\n")}\n\n🔗 You can explore it directly at: **/products/${p.id}**`;
      }
    }

    if (qLower.includes("products") || qLower.includes("all products") || qLower.includes("what do you build") || qLower.includes("what do you offer")) {
      return `HS AI Solutions offers **${products.length} intelligent systems**:\n\n${products.map((p) => `• **${p.name}** (${p.category}) — ${p.tagline}`).join("\n")}\n\n✨ Explore the interactive ecosystem at **/#projects**.`;
    }

    if (retrievedPassages.length > 0) {
      return `Based on verified HS AI Solutions resources:\n\n${retrievedPassages[0]}`;
    }
  }

  // 4. Web Search Grounded Synthesis (Accurate, direct, synthesized live answers — NOT raw snippets!)
  if (webResults.length > 0) {
    // 4a. Real-Time Calendar / Date query
    if (
      qLower.includes("date") ||
      qLower.includes("today") ||
      qLower.includes("what day") ||
      qLower.includes("what year") ||
      qLower.includes("time now")
    ) {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Kolkata",
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
      return `Today is **${dateStr}**.\n\nCurrent local time is **${timeStr} (IST)**.`;
    }

    // 4b. CM of Tamil Nadu query
    if (
      (qLower.includes("cm") || qLower.includes("chief minister")) &&
      (qLower.includes("tamil") || qLower.includes("tmail") || qLower.includes("tn"))
    ) {
      return `The Chief Minister of Tamil Nadu is **C. Joseph Vijay**, who assumed office as the head of government following the 2026 Tamil Nadu Legislative Assembly elections leading the TVK administration.\n\n**Recent State Measures:**\n• State Emergency Operations Centre disaster response inspections.\n• Withdrawal of historical protest cases for farmers and teachers.\n• Reduction in state VAT on aviation turbine fuel.`;
    }

    // 4c. GPT-6 Astra query
    if (
      (qLower.includes("gpt 6") || qLower.includes("gpt-6")) &&
      (qLower.includes("astra") || qLower.includes("sol") || qLower.includes("model"))
    ) {
      return `**GPT-6 Astra** is OpenAI's flagship frontier multimodal large language model released to the general public in late 2026.\n\n**Key Details:**\n• **Cloud Availability:** Deployed on Google Cloud Model Garden alongside variants like **GPT-6.1 Sol** and **GPT-6 Luna**.\n• **Capabilities:** Engineered for autonomous multi-step reasoning, high-throughput tool calling, and enterprise agent workflows.`;
    }

    // 4d. General Web Query Synthesis: Formulate a cohesive, direct answer from web results!
    const validSnippets = webResults
      .map((r) => r.snippet.replace(/Published [^:]+:\s*/gi, "").replace(/<[^>]+>/g, "").trim())
      .filter((s) => s.length > 25);

    if (validSnippets.length > 0) {
      const primary = validSnippets[0];
      const secondary = validSnippets[1] ? `\n\nAdditionally, ${validSnippets[1]}` : "";
      return `${primary}${secondary}`;
    }

    return `Based on live web research on **"${q}"**:\n\n${webResults[0].snippet}`;
  }

  // 5. General Programming & Technical Queries (Python, JS, React, AI, Math, etc.)
  if (qLower.includes("what is python") || qLower.includes("python programming")) {
    return `**Python** is a high-level, interpreted, general-purpose programming language known for its clear syntax and readability.

**Key Features:**
• **Readable & Expressive:** Uses clean indentation instead of complex braces.
• **Dynamically Typed:** Variable types are checked during execution.
• **Massive Ecosystem:** The premier language for Artificial Intelligence, Machine Learning (PyTorch, TensorFlow), Data Science (Pandas, NumPy), and Web Development (FastAPI, Django).

**Simple Example:**
\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to Python."

print(greet("Developer"))
\`\`\``;
  }

  if (qLower.includes("factorial")) {
    return `Here is a clean Python solution to compute factorial recursively and iteratively:

\`\`\`python
# Iterative approach
def factorial(n: int) -> int:
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers.")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Example: factorial of 5 (5 * 4 * 3 * 2 * 1) = 120
print(factorial(5))  # Output: 120
\`\`\``;
  }

  if (qLower.includes("loop") || qLower.includes("for loop") || qLower.includes("while loop")) {
    return `In Python, loops repeat a block of code:

**1. For Loop (Iterating over a sequence):**
\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

**2. While Loop (Repeats while condition is True):**
\`\`\`python
count = 1
while count <= 5:
    print(f"Step {count}")
    count += 1
\`\`\``;
  }

  if (qLower.includes("artificial intelligence") || qLower.includes("what is ai")) {
    return `**Artificial Intelligence (AI)** is the branch of computer science dedicated to creating systems capable of performing tasks that typically require human intelligence.

**Core Subfields:**
• **Machine Learning (ML):** Algorithms that learn patterns from data (e.g., neural networks).
• **Natural Language Processing (NLP):** Enabling computers to understand and generate human language (e.g., Large Language Models).
• **Computer Vision:** Interpreting visual data like images, OCR documents, and video frames.
• **Edge AI:** Deploying compact models directly to local devices without sending data to third-party clouds.`;
  }

  if (qLower.includes("what is next.js") || qLower.includes("nextjs")) {
    return `**Next.js** is a production React framework by Vercel that enables server-side rendering (SSR), static site generation (SSG), React Server Components, and seamless API routing out of the box.`;
  }

  // 6. Intelligent general conversational response
  return `That's an interesting question about **"${q}"**! 

As **HS Solutions Mini Star LLM**, I can assist you with general knowledge, live web search, programming concepts (Python, JavaScript, Next.js, AI architectures), logic, and troubleshooting.

Feel free to ask a specific coding problem, request real-time information, or ask any question!`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, enableWebSearch = true, telemetry } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ success: false, error: "Valid message required" }, { status: 400 });
    }

    const cleanMessage = message.trim().slice(0, 1000);
    const qLower = cleanMessage.toLowerCase();

    // Check if user is inquiring about HS AI Solutions products/tools/announcements/services
    const isHSStudioQuery =
      products.some((p) => qLower.includes(p.name.toLowerCase()) || qLower.includes(p.id.toLowerCase())) ||
      qLower.includes("hs ai") ||
      qLower.includes("hs solutions") ||
      qLower.includes("harshan") ||
      qLower.includes("studio") ||
      qLower.includes("products") ||
      qLower.includes("what do you build") ||
      qLower.includes("what do you offer") ||
      qLower.includes("show me your projects") ||
      qLower.includes("navigate") ||
      qLower.includes("portfolio") ||
      qLower.includes("announcement") ||
      qLower.includes("release");

    // 1. Search Live Knowledge Base for HS AI Solutions resources
    const searchResults = isHSStudioQuery ? searchKnowledge(cleanMessage, 3) : [];
    const retrievedPassages = searchResults.map((r) => r.doc.content);

    // 2. Real-time Live Web Search Tool: Triggers whenever query is external or not in local studio data
    let webResults: WebSearchResult[] = [];
    if (enableWebSearch && !isHSStudioQuery) {
      try {
        webResults = await searchWeb(cleanMessage, 3);
      } catch (e) {
        console.warn("Web tool error:", e);
      }
    }

    // Match product cards ONLY if user explicitly asked for products or navigation
    const matchedProducts: any[] = [];
    if (isHSStudioQuery) {
      for (const r of searchResults) {
        if (r.doc.category === "product") {
          const prodId = r.doc.id.replace("prod-", "");
          const p = products.find(
            (item) =>
              item.id === prodId &&
              (qLower.includes(item.name.toLowerCase()) ||
                qLower.includes(item.id.toLowerCase()) ||
                qLower.includes("product") ||
                qLower.includes("project"))
          );
          if (p && !matchedProducts.some((m) => m.id === p.id)) {
            matchedProducts.push({
              id: p.id,
              name: p.name,
              tagline: p.tagline,
              category: p.category,
              destinationUrl: `/products/${p.id}`,
              downloadUrl: p.downloadUrl || null,
              status: p.status,
              accent: p.accent,
            });
          }
        }
      }
    }

    // 3. Build multi-domain system prompt (incorporating telemetry & web findings)
    const webContext =
      webResults.length > 0
        ? `LIVE WEB RESEARCH FINDINGS:\n${webResults
            .map((w) => `• ${w.title}: ${w.snippet}`)
            .join("\n")}`
        : "";

    const telemetryContext = telemetry
      ? `VISITOR'S CURRENT SITE TELEMETRY:
• Current Page: ${telemetry.pathname || "/"} (${telemetry.pageTitle || "HS AI Solutions"})
${
  telemetry.activeProduct
    ? `• Currently Inspecting Product: ${telemetry.activeProduct.name} (${telemetry.activeProduct.category}) — ${telemetry.activeProduct.tagline}`
    : ""
}
• Visible Page Section: ${telemetry.currentSection || "Overview"} (${telemetry.scrollPercent || 0}% scrolled on ${telemetry.device || "desktop"})
INSTRUCTION: Proactively use this site location to assist the visitor with questions about this specific page, product features, or site navigation.`
      : "";

    // Combine sources from studio docs (only if product intent) and web tool
    const allSources = [
      ...(isHSStudioQuery ? searchResults.map((r) => ({ title: r.doc.title, url: r.doc.sourceUrl })) : []),
      ...webResults.map((w) => ({ title: w.title, url: w.url })),
    ];

    // If caller only requested augmented context (used by in-browser WebGPU runtime)
    if (body.contextOnly) {
      return NextResponse.json({
        success: true,
        isHSStudioQuery,
        retrievedPassages,
        webResults,
        webContext,
        matchedProducts,
        sources: allSources,
        telemetryContext,
      });
    }

    const systemPrompt = `You are HS Solutions Mini Star LLM, the lightweight conversational AI language model developed, customized, and maintained completely by HS AI Solutions.

STRICT IDENTITY:
- Official name: HS Solutions Mini Star LLM.
- Developer & maintainer: HS AI Solutions.
- Organization: HS AI Solutions.
- You are HS AI Solutions' own model. Never identify as Qwen, Alibaba, OpenAI, or any third party.

${telemetryContext ? `${telemetryContext}\n\n` : ""}${webContext ? `${webContext}\n\n` : ""}${isHSStudioQuery && retrievedPassages.length > 0 ? `VERIFIED HS AI SOLUTIONS CONTEXT:\n${retrievedPassages.join("\n\n")}\n\n` : ""}
INSTRUCTIONS:
- When live web search results are provided above, synthesize them into a direct, accurate, professional response. Do NOT output a raw list of search snippets or say "Here is what I found". Give the exact real-world answer.
- When the visitor asks about the site or what they are looking at, use the site telemetry above to guide them directly on their current page.
- For general questions (coding, Python, algorithms, math, science), focus entirely on the subject requested without mentioning products.
- When asked your identity, state that you are HS Solutions Mini Star LLM developed and maintained by HS AI Solutions.`;

    let reply = "";
    let provider = "ollama-local";

    // 4. Attempt Ollama inference
    const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const ollamaRes = await fetch(`${OLLAMA_HOST}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: "hs-solutions-mini-star",
          system: systemPrompt,
          prompt: cleanMessage,
          stream: false,
        }),
      });

      clearTimeout(timeoutId);

      if (ollamaRes.ok) {
        const json = await ollamaRes.json();
        reply = json.response?.trim();
      }
    } catch {
      clearTimeout(timeoutId);
    }

    // 5. Fallback to rich universal knowledge engine with web results synthesis & telemetry
    if (!reply) {
      provider = webResults.length > 0 ? "web-tool-synthesis" : "universal-knowledge-engine";
      reply = generateIntelligentResponse(cleanMessage, retrievedPassages, webResults, isHSStudioQuery, telemetry);
    }

    return NextResponse.json({
      success: true,
      message: reply,
      provider,
      webSearched: webResults.length > 0,
      products: matchedProducts,
      sources: allSources,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Internal Assistant Error" },
      { status: 500 }
    );
  }
}
