import { NextRequest, NextResponse } from "next/server";
import { validateCollaboratorId } from "@/lib/collaborator";

interface ProductDownloadInfo {
  name: string;
  fileName: string;
  cloudUrl: string;
}

const PRODUCT_DOWNLOADS: Record<string, ProductDownloadInfo> = {
  "gravity-llm": {
    name: "Gravity LLM",
    fileName: "Gravity_LLM_HS_AI_Solutions_Portable.zip",
    cloudUrl:
      "https://1drv.ms/u/c/A4DE4F83095B15B0/IQDBJNvSemwQRIDCxrLUYtxqAURTChIN5YXmYrolDeUgh1U?e=SKWsrl",
  },
  "domcode-llm": {
    name: "Domcode LLM",
    fileName: "DomcodeLLM-Setup.exe",
    cloudUrl:
      "https://1drv.ms/u/c/A4DE4F83095B15B0/IQBE8mmADSXtS6polDPwwbUmAXJTbzfIjNdAWDn2Z0to1VM?e=korcxj",
  },
  "galaxy-vision": {
    name: "Galaxy Vision",
    fileName: "Galaxy-Vision-v1.0.0-Standalone.zip",
    cloudUrl:
      "https://1drv.ms/u/c/A4DE4F83095B15B0/IQBxmNpxxijbRrZxRbr2j7i6AddHgte4YOJ7o-aURM3-nFk?e=v6QdYB",
  },
  electron: {
    name: "Electron AI",
    fileName: "Electron-AI-Standalone-NoOllama.zip",
    cloudUrl:
      "https://1drv.ms/u/c/A4DE4F83095B15B0/IQDY8K9iXhZkQayEL_CMStd_AU2Kq61gd1RgfIles4t9BrE?e=76ltt3",
  },
  "july-llm": {
    name: "July LLM",
    fileName: "start.ps1",
    cloudUrl:
      "https://raw.githubusercontent.com/25it038-beep/julyllm/main/july_distribution/installer/start.ps1",
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { collaboratorId, productId, downloadUrl, fileName } = body;

    const validation = validateCollaboratorId(collaboratorId);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error:
            validation.error ||
            "Access denied. Valid HS AI Solutions collaborator credentials required (Format: YourName-HS AI Solution@2026).",
        },
        { status: 403 }
      );
    }

    // Lookup known product configuration
    const productInfo = productId ? PRODUCT_DOWNLOADS[productId] : null;

    const resolvedDownloadUrl =
      productInfo?.cloudUrl ||
      downloadUrl ||
      PRODUCT_DOWNLOADS["gravity-llm"].cloudUrl;

    const resolvedFileName =
      productInfo?.fileName ||
      fileName ||
      "HS_AI_Solutions_Release.zip";

    return NextResponse.json({
      success: true,
      collaboratorName: validation.collaboratorName,
      downloadUrl: resolvedDownloadUrl,
      cloudDownloadUrl: resolvedDownloadUrl,
      fileName: resolvedFileName,
      productName: productInfo?.name || "HS AI Solutions",
      message: `Collaborator access granted for ${validation.collaboratorName}.`,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during collaborator verification.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const collaboratorId = searchParams.get("id");
  const productId = searchParams.get("product") || "gravity-llm";

  const validation = validateCollaboratorId(collaboratorId);
  if (!validation.valid) {
    return new NextResponse(
      JSON.stringify({
        error:
          "Forbidden. Access is restricted to verified HS AI Solutions collaborators.",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const productInfo = PRODUCT_DOWNLOADS[productId] || PRODUCT_DOWNLOADS["gravity-llm"];
  return NextResponse.redirect(productInfo.cloudUrl, 302);
}
