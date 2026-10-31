import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let slug = searchParams.get("slug") || "random";
  slug = slug.replace(/^[/\\]+/, "").trim();

  // If user passed a full url or curl command format, extract slug
  if (slug.includes("onrender.com/")) {
    const match = slug.match(/onrender\.com\/([^?&"\s]+)/);
    if (match) slug = match[1];
  }

  const upstreamUrl = `https://hs-ascii-1.onrender.com/${slug}?full=true`;

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: {
        "User-Agent": "curl/7.88.1",
        Accept: "*/*",
      },
    });

    if (!upstream.ok || !upstream.body) {
      return new Response(`ASCII Engine upstream status: ${upstream.status}`, {
        status: upstream.status,
      });
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to connect to ASCII engine";
    return new Response(msg, { status: 502 });
  }
}
