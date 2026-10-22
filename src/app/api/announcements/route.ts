import { NextResponse } from "next/server";
import { getAnnouncements } from "@/lib/notifications-store";

export async function GET() {
  try {
    const list = getAnnouncements();
    // Only return published announcements sorted by publishedAt descending
    const published = list
      .filter((a) => a.status === "published" && new Date(a.publishedAt) <= new Date())
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({
      success: true,
      announcements: published,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch announcements" },
      { status: 500 }
    );
  }
}
