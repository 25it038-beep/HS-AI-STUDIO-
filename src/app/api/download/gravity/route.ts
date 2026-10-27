import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { validateCollaboratorId } from "@/lib/collaborator";

// Primary location on drive E:, followed by local project fallbacks
const CANDIDATE_PATHS = [
  "E:\\Gravity_LLM_HS_AI_Solutions_Portable.zip",
  path.join(process.cwd(), "public", "downloads", "Gravity_LLM_HS_AI_Solutions_Portable.zip"),
  path.join(process.cwd(), "Gravity_LLM_HS_AI_Solutions_Portable.zip"),
];

function resolveGravityFilePath(): string | null {
  for (const p of CANDIDATE_PATHS) {
    if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
      return p;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { collaboratorId } = body;

    const validation = validateCollaboratorId(collaboratorId);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error || "Access denied. Valid collaborator credentials required.",
        },
        { status: 403 }
      );
    }

    const filePath = resolveGravityFilePath();
    const fileAvailable = Boolean(filePath);

    return NextResponse.json({
      success: true,
      collaboratorName: validation.collaboratorName,
      downloadUrl: `/api/download/gravity?id=${encodeURIComponent(collaboratorId.trim())}`,
      fileAvailable,
      fileName: "Gravity_LLM_HS_AI_Solutions_Portable.zip",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error during verification." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const collaboratorId = searchParams.get("id");

  const validation = validateCollaboratorId(collaboratorId);
  if (!validation.valid) {
    return new NextResponse(
      JSON.stringify({
        error: "Forbidden. Access is restricted to verified HS AI Solutions collaborators.",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const filePath = resolveGravityFilePath();
  if (!filePath) {
    return new NextResponse(
      JSON.stringify({
        error:
          "Gravity LLM package is currently localized to workstation drive E:. Please contact Harshan Seliyan or connect the designated storage volume.",
      }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  const stat = fs.statSync(/*turbopackIgnore: true*/ filePath);
  const fileSize = stat.size;

  // Handle HTTP Range requests for resuming large downloads (6.12 GB)
  const range = req.headers.get("range");

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      return new NextResponse(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${fileSize}` },
      });
    }

    const chunksize = end - start + 1;
    const fileStream = fs.createReadStream(/*turbopackIgnore: true*/ filePath, { start, end });

    // Transform Node.js ReadStream into web ReadableStream
    const readable = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new NextResponse(readable, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize.toString(),
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="Gravity_LLM_HS_AI_Solutions_Portable.zip"`,
      },
    });
  }

  // Full file stream
  const nodeStream = fs.createReadStream(/*turbopackIgnore: true*/ filePath);
  const webStream = new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => controller.enqueue(chunk));
      nodeStream.on("end", () => controller.close());
      nodeStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      nodeStream.destroy();
    },
  });

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Length": fileSize.toString(),
      "Accept-Ranges": "bytes",
      "Content-Disposition": `attachment; filename="Gravity_LLM_HS_AI_Solutions_Portable.zip"`,
    },
  });
}
