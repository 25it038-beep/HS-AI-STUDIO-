import { NextRequest, NextResponse } from "next/server";
import { getAnnouncements, getSubscriptions, getDeliveryLogs } from "@/lib/notifications-store";

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "hs-ai-admin-secret-2026";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const adminKey = authHeader ? authHeader.replace("Bearer ", "").trim() : req.headers.get("x-admin-key");

    if (adminKey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const announcements = getAnnouncements();
    const subscriptions = getSubscriptions();
    const deliveryLogs = getDeliveryLogs();

    return NextResponse.json({
      success: true,
      stats: {
        totalAnnouncements: announcements.length,
        totalSubscribers: subscriptions.filter((s) => s.isActive).length,
        totalDeliveries: deliveryLogs.reduce((acc, curr) => acc + curr.successful, 0),
      },
      announcements,
      deliveryLogs,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
