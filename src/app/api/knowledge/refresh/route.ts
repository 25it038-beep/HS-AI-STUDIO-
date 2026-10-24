import { NextRequest, NextResponse } from "next/server";
import { buildVerifiedKnowledgeBase, saveKnowledgeIndex } from "@/lib/knowledge-engine";

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "hs-ai-admin-secret-2026";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const adminKey = authHeader ? authHeader.replace("Bearer ", "").trim() : req.headers.get("x-admin-key");

    if (adminKey !== ADMIN_SECRET_KEY) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Rebuild index from current website pages and canonical sources
    const newDocs = buildVerifiedKnowledgeBase();
    saveKnowledgeIndex(newDocs);

    return NextResponse.json({
      success: true,
      message: "Knowledge base indexed successfully",
      documentsIndexed: newDocs.length,
      syncedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to refresh knowledge index" },
      { status: 500 }
    );
  }
}
