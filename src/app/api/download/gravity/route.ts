import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { validateCollaboratorId } from "@/lib/collaborator";

// Official cloud mirror URL (OneDrive / Google Drive) for Gravity LLM portable package
const DEFAULT_ONEDRIVE_URL =
  "https://1drv.ms/u/c/A4DE4F83095B15B0/IQDBJNvSemwQRIDCxrLUYtxqAURTChIN5YXmYrolDeUgh1U?e=SKWsrl";

const CLOUD_DOWNLOAD_URL =
  process.env.GRAVITY_CLOUD_DOWNLOAD_URL ||
  process.env.NEXT_PUBLIC_GRAVITY_CLOUD_URL ||
  DEFAULT_ONEDRIVE_URL;

// Primary local workstation location on drive E:, followed by project fallbacks
const CANDIDATE_PATHS = [
  "E:\\Gravity_LLM_HS_AI_Solutions_Portable.zip",
  path.join(process.cwd(), "public", "downloads", "Gravity_LLM_HS_AI_Solutions_Portable.zip"),
  path.join(process.cwd(), "Gravity_LLM_HS_AI_Solutions_Portable.zip"),
];

function resolveGravityFilePath(): string | null {
  for (const p of CANDIDATE_PATHS) {
    try {
      if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
        return p;
      }
    } catch {
      // Ignore filesystem access exceptions on cloud/serverless hosts
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
    const hasCloudMirror = Boolean(CLOUD_DOWNLOAD_URL);
    const fileAvailable = Boolean(filePath || hasCloudMirror);

    return NextResponse.json({
      success: true,
      collaboratorName: validation.collaboratorName,
      downloadUrl: CLOUD_DOWNLOAD_URL || `/api/download/gravity?id=${encodeURIComponent(collaboratorId.trim())}`,
      fileAvailable,
      hasCloudMirror,
      cloudDownloadUrl: CLOUD_DOWNLOAD_URL || null,
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

  // 1. If cloud download mirror is configured, redirect directly to OneDrive / cloud storage
  if (CLOUD_DOWNLOAD_URL) {
    return NextResponse.redirect(CLOUD_DOWNLOAD_URL, 302);
  }

  // 2. Check local workstation filesystem (e.g. running locally on localhost)
  const filePath = resolveGravityFilePath();
  if (!filePath) {
    return new NextResponse(
      JSON.stringify({
        error:
          "Gravity LLM package is 6.12 GB and stored on local workstation Drive E:. On cloud deployments like Vercel, please connect your cloud download mirror.",
        cloudSetupNeeded: true,
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
