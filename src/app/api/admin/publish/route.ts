import { NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
import {
  getAnnouncements,
  saveAnnouncements,
  getSubscriptions,
  saveSubscriptions,
  saveDeliveryLog,
  Announcement,
  DeliveryLog,
} from "@/lib/notifications-store";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:harshanseliyan28@gmail.com";
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "hs-ai-admin-secret-2026";

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const adminKey = authHeader ? authHeader.replace("Bearer ", "").trim() : req.headers.get("x-admin-key");

    if (adminKey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Invalid Admin Key." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, message, category, imageUrl, destinationUrl, channels, status } = body;

    if (!title || !message) {
      return NextResponse.json(
        { success: false, error: "Title and message are required" },
        { status: 400 }
      );
    }

    const newAnnouncement: Announcement = {
      id: `ann_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim(),
      message: message.trim(),
      category: category || "Product Release",
      imageUrl: imageUrl?.trim() || undefined,
      destinationUrl: destinationUrl?.trim() || "/#projects",
      channels: channels || "both",
      status: status || "published",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    // Save announcement
    const announcements = getAnnouncements();
    announcements.unshift(newAnnouncement);
    saveAnnouncements(announcements);

    // If channel includes push and it is published, send web push notifications
    let deliveryResult: DeliveryLog | null = null;
    if ((newAnnouncement.channels === "push" || newAnnouncement.channels === "both") && newAnnouncement.status === "published") {
      const subscriptions = getSubscriptions().filter((s) => s.isActive);
      let successCount = 0;
      let failureCount = 0;
      let expiredCount = 0;

      const payload = JSON.stringify({
        title: newAnnouncement.title,
        message: newAnnouncement.message,
        body: newAnnouncement.message,
        category: newAnnouncement.category,
        image: newAnnouncement.imageUrl,
        url: newAnnouncement.destinationUrl,
        tag: newAnnouncement.id,
      });

      const updatedSubscriptions = [...subscriptions];

      if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
        await Promise.all(
          subscriptions.map(async (sub) => {
            try {
              await webPush.sendNotification(
                {
                  endpoint: sub.endpoint,
                  keys: sub.keys,
                },
                payload
              );
              successCount++;
            } catch (err: any) {
              failureCount++;
              // 404 or 410 means subscription is expired or unsubscribed by the user
              if (err.statusCode === 404 || err.statusCode === 410) {
                expiredCount++;
                const idx = updatedSubscriptions.findIndex((s) => s.endpoint === sub.endpoint);
                if (idx >= 0) {
                  updatedSubscriptions[idx].isActive = false;
                }
              }
            }
          })
        );

        if (expiredCount > 0) {
          saveSubscriptions(updatedSubscriptions);
        }
      }

      deliveryResult = {
        id: `log_${Date.now()}`,
        announcementId: newAnnouncement.id,
        announcementTitle: newAnnouncement.title,
        totalSubscribers: subscriptions.length,
        successful: successCount,
        failed: failureCount,
        expiredRemoved: expiredCount,
        timestamp: new Date().toISOString(),
      };

      saveDeliveryLog(deliveryResult);
    }

    return NextResponse.json({
      success: true,
      message: "Announcement published successfully",
      announcement: newAnnouncement,
      delivery: deliveryResult,
    });
  } catch (error: any) {
    console.error("Error publishing announcement:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to publish announcement" },
      { status: 500 }
    );
  }
}
