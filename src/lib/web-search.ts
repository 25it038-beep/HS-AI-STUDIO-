export interface WebSearchResult {
  title: string;
  snippet: string;
  url: string;
}

export async function searchWeb(query: string, maxResults = 3): Promise<WebSearchResult[]> {
  try {
    const cleanQuery = encodeURIComponent(query.trim());
    const endpoint = `https://html.duckduckgo.com/html/?q=${cleanQuery}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) return [];

    const html = await res.text();
    const results: WebSearchResult[] = [];

    // Parse DuckDuckGo standard html results without ES2018 's' flag
    const resultBlocks = html.split('<div class="result results_links results_links_deep');

    for (let i = 1; i < resultBlocks.length && results.length < maxResults; i++) {
      const block = resultBlocks[i];

      // Extract title and link using [\s\S]* instead of dot-all
      const titleMatch = block.match(/<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
      const snippetMatch = block.match(/<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);

      if (titleMatch) {
        let rawUrl = titleMatch[1];
        const uddgMatch = rawUrl.match(/uddg=([^&]+)/);
        if (uddgMatch) {
          rawUrl = decodeURIComponent(uddgMatch[1]);
        }

        const rawTitle = titleMatch[2].replace(/<[^>]+>/g, "").trim();
        const rawSnippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, "").trim() : "";

        if (rawTitle && rawSnippet) {
          results.push({
            title: rawTitle,
            snippet: rawSnippet,
            url: rawUrl,
          });
        }
      }
    }

    return results;
  } catch (err) {
    console.warn("Web search lookup warning:", err);
    return [];
  }
}
