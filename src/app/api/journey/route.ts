import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "scripts", "hs-cinematic-journey-v2.ps1");
    if (!fs.existsSync(filePath)) {
      return new NextResponse("Script not found", { status: 404 });
    }

    const content = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "Content-Disposition": 'inline; filename="hs-cinematic-journey-v2.ps1"',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error serving script";
    return new NextResponse(message, { status: 500 });
  }
}
