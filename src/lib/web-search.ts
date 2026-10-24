export interface WebSearchResult {
  title: string;
  snippet: string;
  url: string;
}

export async function searchWeb(query: string, maxResults = 3): Promise<WebSearchResult[]> {
  const cleanQ = query.trim();
  if (!cleanQ) return [];

  const qLower = cleanQ.toLowerCase();
  const results: WebSearchResult[] = [];

  // 1. Instant Real-Time Calendar & Clock Resolution
  if (
    qLower.includes("date") ||
    qLower.includes("today") ||
    qLower.includes("time") ||
    qLower.includes("day is it") ||
    qLower.includes("what year")
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
    results.push({
      title: "Real-Time System Calendar & Clock",
      snippet: `Today's verified date is ${dateStr}, and the current time is ${timeStr} (IST).`,
      url: "https://time.is/",
    });
  }

  // Normalize common phonetic typos (e.g. "tmail nadu" -> "tamil nadu", "te" -> "the")
  const normalizedQuery = cleanQ
    .replace(/\btmail\b/gi, "tamil")
    .replace(/\bte\b/gi, "the")
    .replace(/\bcm\b/gi, "chief minister");

  // 2. Fetch Live Google News RSS (unblocked, fresh breaking news, politics, tech)
  try {
    const newsUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(normalizedQuery)}&hl=en-IN&gl=IN&ceid=IN:en`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const newsRes = await fetch(newsUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    clearTimeout(timeoutId);

    if (newsRes.ok) {
      const xml = await newsRes.text();
      const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
      for (let i = 0; i < Math.min(items.length, maxResults); i++) {
        const item = items[i];
        const title = item.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<[^>]+>/g, "").trim();
        const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim();
        const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim();

        if (title && link) {
          results.push({
            title,
            snippet: `Published ${pubDate || "recently"}: ${title}`,
            url: link,
          });
        }
      }
    }
  } catch (err) {
    console.warn("News RSS fetch warning:", err);
  }

  // 3. Fetch Wikipedia Knowledge API (encyclopedic entities, AI models, places, people)
  if (results.length < maxResults + 1) {
    try {
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        normalizedQuery
      )}&utf8=&format=json`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const wikiRes = await fetch(wikiUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        const items = wikiData.query?.search?.slice(0, 2) || [];
        for (const item of items) {
          const cleanSnippet = item.snippet.replace(/<[^>]+>/g, "").trim();
          results.push({
            title: `${item.title} — Wikipedia`,
            snippet: cleanSnippet,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, "_"))}`,
          });
        }
      }
    } catch (err) {
      console.warn("Wikipedia lookup warning:", err);
    }
  }

  return results.slice(0, Math.max(maxResults, 3));
}
