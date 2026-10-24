import { NextResponse } from "next/server";
import { getKnowledgeStatus } from "@/lib/knowledge-engine";

export async function GET() {
  const status = getKnowledgeStatus();
  return NextResponse.json({
    success: true,
    ...status,
  });
}
