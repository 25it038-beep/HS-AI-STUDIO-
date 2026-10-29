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

  // Self-triggering download page that initiates download from cloud mirror in companion window and rapidly returns to HS AI Studio
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
      max-width: 480px;
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
      padding: 12px;
      margin-bottom: 24px;
      font-size: 12.5px;
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
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="spinner"></div>
    <div class="badge">Domcode LLM 1.0.0 · Verified Download</div>
    <h1>Download Initiated</h1>
    <p>Your setup package is downloading in a companion window.<br/>Returning you back to <strong>HS AI Studio</strong> rapidly...</p>
    <div class="countdown" id="cd">Returning to HS AI Studio in 6s...</div>
    <a href="/" onclick="returnStudioNow(event)" class="btn">Return to HS AI Studio Now</a>
  </div>
  <script>
    const cloudUrl = "${CLOUD_DOWNLOAD_URL}";
    let win = null;
    
    // Open companion window for high-speed download
    try {
      const width = 860;
      const height = 660;
      const left = Math.max(0, (window.screen.width - width) / 2);
      const top = Math.max(0, (window.screen.height - height) / 2);
      win = window.open(cloudUrl, "HS_Downloader", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",resizable=yes,scrollbars=yes");
    } catch (e) {
      win = window.open(cloudUrl, "_blank");
    }

    function returnStudioNow(e) {
      if (e) e.preventDefault();
      try { if (win && !win.closed) win.close(); } catch(err) {}
      window.location.href = "/";
    }

    // Auto-return countdown
    let secs = 6;
    const cdEl = document.getElementById("cd");
    const interval = setInterval(function() {
      secs--;
      if (secs > 0 && cdEl) {
        cdEl.textContent = "Returning to HS AI Studio in " + secs + "s...";
      } else if (secs <= 0) {
        clearInterval(interval);
        returnStudioNow();
      }
    }, 1000);

    // Refocus listener to close companion window when user returns to this tab
    window.addEventListener("focus", function() {
      setTimeout(returnStudioNow, 1500);
    }, { once: true });
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
