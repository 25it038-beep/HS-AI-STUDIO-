import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge, getKnowledgeStatus } from "@/lib/knowledge-engine";
import { products } from "@/data/products";

// Fallback high-fidelity neural knowledge response when Ollama local instance is unreachable on Vercel
function generateGroundedFallbackResponse(userMessage: string, retrievedPassages: string[]): string {
  const qLower = userMessage.toLowerCase();

  // Check if matching specific product directly
  for (const p of products) {
    if (qLower.includes(p.name.toLowerCase()) || qLower.includes(p.id.toLowerCase())) {
      return `${p.name} is ${p.description}\n\nKey capabilities include:\n${p.features.slice(0, 4).map((f) => `• ${f}`).join("\n")}\n\nYou can explore it directly at: /products/${p.id}`;
    }
  }

  if (qLower.includes("products") || qLower.includes("tools") || qLower.includes("what do you offer")) {
    return `HS AI Solutions offers ${products.length} intelligent systems across vision, offline inference, security, and developer productivity:\n\n${products.slice(0, 5).map((p) => `• **${p.name}** (${p.category}) — ${p.tagline}`).join("\n")}\n\nExplore the full ecosystem at: /#projects`;
  }

  if (qLower.includes("who created") || qLower.includes("who developed") || qLower.includes("who are you")) {
    return "I am HS Solutions Mini Star LLM, a conversational AI product customized and maintained by HS AI Solutions. The studio was founded by Harshan Seliyan to build practical, edge-capable artificial intelligence applications.";
  }

  // Use retrieved context
  if (retrievedPassages.length > 0) {
    return `Based on verified HS AI Solutions documentation:\n\n${retrievedPassages[0]}`;
  }

  return "I don't have verified information about that specific query on the HS AI Solutions website. You can explore our live applications or reach out to Harshan Seliyan at harshanseliyan28@gmail.com.";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ success: false, error: "Valid message required" }, { status: 400 });
    }

    const cleanMessage = message.trim().slice(0, 1000);

    // 1. Intelligent Knowledge Retrieval
    const searchResults = searchKnowledge(cleanMessage, 3);
    const retrievedPassages = searchResults.map((r) => r.doc.content);

    // Collect verified product cards if query matches any product
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

    // 2. Prepare Grounded Prompt for Model
    const systemPrompt = `You are HS Solutions Mini Star LLM, the website assistant for HS AI Solutions.
Help visitors understand the studio's products, find pages, and learn how to use available features.

VERIFIED HS AI SOLUTIONS KNOWLEDGE:
${retrievedPassages.join("\n\n")}

RULES:
- Identify yourself accurately when asked: "HS Solutions Mini Star LLM", customized and maintained by HS AI Solutions.
- Use only the verified knowledge above. Do not invent product features, prices, or routes.
- When referencing a product, recommend visiting /products/<id>.
- Be concise, direct, natural, and helpful.`;

    let reply = "";
    let provider = "ollama-local";

    // 3. Attempt Ollama inference
    const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

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

    // 4. Fallback if Ollama is unreachable (e.g. running inside Vercel cloud without local tunnel)
    if (!reply) {
      provider = "verified-knowledge-engine";
      reply = generateGroundedFallbackResponse(cleanMessage, retrievedPassages);
    }

    return NextResponse.json({
      success: true,
      message: reply,
      provider,
      products: matchedProducts,
      sources: searchResults.map((r) => ({
        title: r.doc.title,
        url: r.doc.sourceUrl,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Internal Assistant Error" },
      { status: 500 }
    );
  }
}
