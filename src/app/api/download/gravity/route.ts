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

  // 1. If cloud download mirror is configured, initiate download and rapidly return to HS AI Studio
  if (CLOUD_DOWNLOAD_URL) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HS AI Studio - Downloading Gravity LLM...</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #06090e;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .card {
      background: #0a0f0d;
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 20px;
      padding: 40px 32px;
      text-align: center;
      max-width: 460px;
      width: 100%;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(16, 185, 129, 0.15);
    }
    .spinner {
      width: 48px;
      height: 48px;
      border: 3px solid rgba(16, 185, 129, 0.2);
      border-top-color: #10b981;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .badge {
      display: inline-block;
      background: rgba(16, 185, 129, 0.15);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 999px;
      padding: 4px 12px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 14px;
    }
    h1 { font-size: 22px; font-weight: 700; margin: 0 0 10px; }
    p { font-size: 13.5px; color: rgba(255, 255, 255, 0.65); line-height: 1.55; margin: 0 0 24px; }
    .countdown {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 10px;
      margin-bottom: 24px;
      font-size: 12px;
      color: #10b981;
      font-weight: 600;
    }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      border-radius: 999px;
      background: #10b981;
      color: #000;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      box-shadow: 0 0 25px rgba(16, 185, 129, 0.4);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <div class="badge">Gravity LLM 1.0.0 · Verified Download</div>
    <h1>Download Initiated</h1>
    <p>Your 6.12 GB portable package is downloading from the verified high-speed cloud mirror.<br/>Returning you back to <strong>HS AI Studio</strong> rapidly...</p>
    <div class="countdown" id="cd">Returning to HS AI Studio in 2s...</div>
    <a href="/" class="btn">Return to HS AI Studio Now</a>
  </div>
  <script>
    const cloudUrl = "${CLOUD_DOWNLOAD_URL}";
    
    // 1. Silent invisible iframe download trigger
    try {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = cloudUrl;
      document.body.appendChild(iframe);
    } catch (e) {}

    // 2. Fallback tab opening in background
    try {
      window.open(cloudUrl, "_blank", "noopener,noreferrer");
    } catch (e) {}

    // 3. Rapid return to HS AI Studio in 1.8 seconds
    let secs = 2;
    const cdEl = document.getElementById("cd");
    const interval = setInterval(function() {
      secs--;
      if (secs > 0 && cdEl) {
        cdEl.textContent = "Returning to HS AI Studio in " + secs + "s...";
      }
    }, 1000);

    setTimeout(function() {
      clearInterval(interval);
      window.location.href = "/";
    }, 1800);
  </script>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
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
