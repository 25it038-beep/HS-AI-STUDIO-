import { NextRequest, NextResponse } from "next/server";

// Official cloud mirrors (OneDrive) for Galaxy Vision standalone package
const GALAXY_ONEDRIVE_MIRROR =
  "https://1drv.ms/u/c/A4DE4F83095B15B0/IQRxmNpxxijbRrZxRbr2j7i6AeBygvP-vfi1QV88qHgfONE";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mirror = searchParams.get("mirror");

  // If user explicitly requests cloud mirror, redirect to OneDrive
  if (mirror === "cloud" || mirror === "onedrive") {
    return NextResponse.redirect(GALAXY_ONEDRIVE_MIRROR, 302);
  }

  // Default: Instant automatic download of the standalone package directly in the browser
  return NextResponse.redirect(
    new URL("/downloads/Galaxy-Vision-v1.0.0-Standalone.zip", req.url),
    302
  );
}
