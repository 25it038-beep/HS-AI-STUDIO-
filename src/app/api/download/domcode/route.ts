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

  // Direct redirect to verified OneDrive high-speed cloud download
  return NextResponse.redirect(CLOUD_DOWNLOAD_URL, 302);
}
