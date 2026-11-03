import { NextRequest, NextResponse } from "next/server";
import { getAnnouncements, getSubscriptions, getDeliveryLogs } from "@/lib/notifications-store";
import { verifyAdminKey } from "@/lib/security";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const adminKey = authHeader ? authHeader.replace("Bearer ", "").trim() : req.headers.get("x-admin-key");

    if (!verifyAdminKey(adminKey)) {
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
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
