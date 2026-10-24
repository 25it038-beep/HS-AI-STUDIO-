import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge, getKnowledgeStatus } from "@/lib/knowledge-engine";
import { searchWeb, WebSearchResult } from "@/lib/web-search";
import { products } from "@/data/products";

// Universal Knowledge Engine: Handles coding, math, general science, technology, and studio navigation
function generateIntelligentResponse(userMessage: string, retrievedPassages: string[], webResults: WebSearchResult[]): string {
  const q = userMessage.trim();
  const qLower = q.toLowerCase();

  // 1. Identity Queries
  if (qLower.includes("what is your name") || qLower.includes("who are you")) {
    return "Hello! I am **HS Solutions Mini Star LLM**, an intelligent conversational AI assistant customized and maintained by **HS AI Solutions**. I have integrated web search tools and studio knowledge to help you with programming, real-time research, and navigating our AI applications.";
  }

  if (qLower.includes("who created you") || qLower.includes("who developed you") || qLower.includes("who made you")) {
    return "**HS AI Solutions** (founded by Harshan Seliyan) customized and maintains **HS Solutions Mini Star LLM**. My underlying foundation is based on open-weight architecture (Qwen2.5-0.5B-Instruct-uncensored), tailored for edge-ready execution and website intelligence.";
  }

  // 2. Specific HS AI Studio Products
  for (const p of products) {
    if (qLower.includes(p.name.toLowerCase()) || qLower.includes(p.id.toLowerCase())) {
      return `**${p.name}** (#${p.number} · ${p.category})\n\n${p.description}\n\n**Key Highlights:**\n${p.features.slice(0, 4).map((f) => `• ${f}`).join("\n")}\n\n🔗 You can explore and test it directly at: **/products/${p.id}**`;
    }
  }

  if (qLower.includes("products") || qLower.includes("all products") || qLower.includes("what do you build") || qLower.includes("what do you offer")) {
    return `HS AI Solutions offers **${products.length} intelligent systems**:\n\n${products.map((p) => `• **${p.name}** (${p.category}) — ${p.tagline}`).join("\n")}\n\n✨ Explore the interactive ecosystem at **/#projects**.`;
  }

  // 3. Web Search Grounded Synthesis (If real-time web results were retrieved)
  if (webResults.length > 0) {
    const topResult = webResults[0];
    return `Here is what I found from live web research on **"${q}"**:\n\n${topResult.snippet}\n\n${webResults.slice(1).map((r) => `• **${r.title}:** ${r.snippet}`).join("\n\n")}\n\n*Source: [${topResult.title}](${topResult.url})*`;
  }

  // 4. General Programming & Technical Queries (Python, JS, React, AI, Math, etc.)
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
• **Natural Language Processing (NLP):** Enabling computers to read, generate, and converse in human languages (e.g., Large Language Models).
• **Computer Vision:** Interpreting visual data like images, OCR documents, and video frames (such as our **Galaxy Vision** system).
• **Edge AI:** Deploying compact models directly to local devices without sending data to third-party clouds.`;
  }

  if (qLower.includes("what is next.js") || qLower.includes("nextjs")) {
    return `**Next.js** is a production React framework by Vercel that enables server-side rendering (SSR), static site generation (SSG), React Server Components, and seamless API routing out of the box. This website (HS AI Solutions) is built using Next.js!`;
  }

  // 5. Grounded Knowledge Retrieval fallback
  if (retrievedPassages.length > 0 && (qLower.includes("model") || qLower.includes("system") || qLower.includes("studio") || qLower.includes("ai"))) {
    return `Based on verified HS AI Solutions resources:\n\n${retrievedPassages[0]}`;
  }

  // 6. Intelligent general conversational response
  return `That's an interesting question about **"${q}"**! 

As **HS Solutions Mini Star LLM**, I can assist you with general knowledge, live web search, programming concepts (Python, JavaScript, Next.js, AI architectures), logic, and navigating HS AI Solutions' suite of products.

Feel free to ask a specific coding problem, request real-time information, or explore applications like **Lumina**, **Galaxy Vision**, or **Electron AI**!`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, enableWebSearch = true } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ success: false, error: "Valid message required" }, { status: 400 });
    }

    const cleanMessage = message.trim().slice(0, 1000);
    const qLower = cleanMessage.toLowerCase();

    // 1. Search Knowledge Base for studio products and documentation
    const searchResults = searchKnowledge(cleanMessage, 3);
    const retrievedPassages = searchResults.map((r) => r.doc.content);

    // 2. Web Tool: If the query asks for external live info, news, weather, or real-time web research
    let webResults: WebSearchResult[] = [];
    const isStudioSpecific = products.some((p) => qLower.includes(p.name.toLowerCase()) || qLower.includes(p.id.toLowerCase()));

    // Perform web search when web search is enabled and the query is not purely studio-internal
    if (enableWebSearch && (!isStudioSpecific || qLower.includes("search") || qLower.includes("web") || qLower.includes("latest") || qLower.includes("news") || qLower.includes("who is") || qLower.includes("what is"))) {
      try {
        webResults = await searchWeb(cleanMessage, 3);
      } catch (e) {
        console.warn("Web tool error:", e);
      }
    }

    // Match product cards if relevant
    const matchedProducts: any[] = [];
    for (const r of searchResults) {
      if (r.doc.category === "product") {
        const prodId = r.doc.id.replace("prod-", "");
        const p = products.find((item) => item.id === prodId);
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

    // 3. Build multi-domain system prompt (incorporating web tool findings)
    const webContext = webResults.length > 0
      ? `LIVE WEB TOOL SEARCH RESULTS:\n${webResults.map((w) => `Title: ${w.title}\nSnippet: ${w.snippet}\nSource: ${w.url}`).join("\n\n")}`
      : "";

    const systemPrompt = `You are HS Solutions Mini Star LLM, an intelligent, helpful conversational AI assistant developed and maintained by HS AI Solutions, equipped with live Web Search tools.

You assist visitors with:
1. General knowledge, science, programming (Python, JS, algorithms, logic, writing, etc.).
2. Real-time web search findings when provided.
3. Explaining and navigating HS AI Solutions products and resources.

${webContext ? `${webContext}\n\n` : ""}${retrievedPassages.length > 0 ? `VERIFIED HS AI SOLUTIONS CONTEXT:\n${retrievedPassages.join("\n\n")}\n\n` : ""}
INSTRUCTIONS:
- If live web search results are provided above, synthesize them to give a fresh, factual, and direct answer with source citations.
- If the user asks a general question (e.g. "What is Python?", "Write a program to...", "Explain quantum physics"), answer their question directly, thoroughly, and helpfully with code examples and clear explanations.
- If the user asks about HS AI Solutions, Lumina, Galaxy Vision, Electron, or studio tools, use the verified knowledge above and provide direct links.
- When asked your name, you are HS Solutions Mini Star LLM by HS AI Solutions.
- Be concise, friendly, intelligent, and natural.`;

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

    // 5. Fallback to rich universal knowledge engine with web results synthesis
    if (!reply) {
      provider = webResults.length > 0 ? "web-tool-synthesis" : "universal-knowledge-engine";
      reply = generateIntelligentResponse(cleanMessage, retrievedPassages, webResults);
    }

    // Combine sources from studio docs and web tool
    const allSources = [
      ...searchResults.map((r) => ({ title: r.doc.title, url: r.doc.sourceUrl })),
      ...webResults.map((w) => ({ title: w.title, url: w.url })),
    ];

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
