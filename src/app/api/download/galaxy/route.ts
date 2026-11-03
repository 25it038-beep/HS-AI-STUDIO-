import { NextRequest, NextResponse } from "next/server";
import { validateCollaboratorId } from "@/lib/collaborator";

const GALAXY_ONEDRIVE_MIRROR =
  "https://1drv.ms/u/c/A4DE4F83095B15B0/IQBxmNpxxijbRrZxRbr2j7i6AddHgte4YOJ7o-aURM3-nFk?e=v6QdYB";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { collaboratorId } = body;

    const validation = validateCollaboratorId(collaboratorId);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error:
            validation.error ||
            "Access denied. Valid HS AI Solutions collaborator credentials required.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      collaboratorName: validation.collaboratorName,
      downloadUrl: GALAXY_ONEDRIVE_MIRROR,
      cloudDownloadUrl: GALAXY_ONEDRIVE_MIRROR,
      fileName: "Galaxy-Vision-v1.0.0-Standalone.zip",
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

  if (collaboratorId) {
    const validation = validateCollaboratorId(collaboratorId);
    if (!validation.valid) {
      return new NextResponse(
        JSON.stringify({
          error: "Forbidden. Access is restricted to verified HS AI Solutions collaborators.",
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.redirect(GALAXY_ONEDRIVE_MIRROR, 302);
}
