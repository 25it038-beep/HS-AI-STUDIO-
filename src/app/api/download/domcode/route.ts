import { NextRequest, NextResponse } from "next/server";
import { validateCollaboratorId } from "@/lib/collaborator";

// Official cloud mirror URL (OneDrive) for Domcode LLM installer
const DOMCODE_ONEDRIVE_URL =
  "https://1drv.ms/u/c/A4DE4F83095B15B0/IQBE8mmADSXtS6polDPwwbUmAXJTbzfIjNdAWDn2Z0to1VM?e=korcxj";

const CLOUD_DOWNLOAD_URL =
  process.env.DOMCODE_CLOUD_DOWNLOAD_URL || DOMCODE_ONEDRIVE_URL;

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

    return NextResponse.json({
      success: true,
      collaboratorName: validation.collaboratorName,
      downloadUrl: CLOUD_DOWNLOAD_URL,
      fileAvailable: true,
      hasCloudMirror: true,
      cloudDownloadUrl: CLOUD_DOWNLOAD_URL,
      fileName: "DomcodeLLM-Setup.exe",
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

  // Self-triggering download page that initiates download from cloud mirror and rapidly returns to HS AI Studio
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HS AI Studio - Downloading Domcode LLM...</title>
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
      background: #0d121c;
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 20px;
      padding: 40px 32px;
      text-align: center;
      max-width: 460px;
      width: 100%;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(245, 158, 11, 0.15);
    }
    .spinner {
      width: 48px;
      height: 48px;
      border: 3px solid rgba(245, 158, 11, 0.2);
      border-top-color: #f59e0b;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .badge {
      display: inline-block;
      background: rgba(245, 158, 11, 0.15);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.35);
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
      color: #f59e0b;
      font-weight: 600;
    }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      border-radius: 999px;
      background: #f59e0b;
      color: #000;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      box-shadow: 0 0 25px rgba(245, 158, 11, 0.4);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <div class="badge">Domcode LLM 1.0.0 · Verified Download</div>
    <h1>Download Initiated</h1>
    <p>Your setup package is downloading from the verified high-speed cloud mirror.<br/>Returning you back to <strong>HS AI Studio</strong> rapidly...</p>
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
