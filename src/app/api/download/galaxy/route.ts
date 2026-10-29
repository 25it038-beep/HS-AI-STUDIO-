import { NextRequest, NextResponse } from "next/server";

// Official cloud mirror (OneDrive) for Galaxy Vision standalone package
const GALAXY_ONEDRIVE_MIRROR =
  "https://1drv.ms/u/c/A4DE4F83095B15B0/IQBxmNpxxijbRrZxRbr2j7i6AddHgte4YOJ7o-aURM3-nFk?e=v6QdYB";

export async function GET(_req: NextRequest) {
  // Direct redirect to verified OneDrive high-speed download link
  return NextResponse.redirect(GALAXY_ONEDRIVE_MIRROR, 302);
}
