import { NextRequest, NextResponse } from "next/server";
import { getSubscriptions, saveSubscriptions, PushSubscriptionItem } from "@/lib/notifications-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, keys } = body;

    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return NextResponse.json(
        { success: false, error: "Invalid subscription payload" },
        { status: 400 }
      );
    }

    const subscriptions = getSubscriptions();
    const existingIndex = subscriptions.findIndex((s) => s.endpoint === endpoint);

    const subscriptionItem: PushSubscriptionItem = {
      id: existingIndex >= 0 ? subscriptions[existingIndex].id : `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      endpoint,
      keys: {
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
      userAgent: req.headers.get("user-agent") || undefined,
      createdAt: existingIndex >= 0 ? subscriptions[existingIndex].createdAt : new Date().toISOString(),
      isActive: true,
    };

    if (existingIndex >= 0) {
      subscriptions[existingIndex] = subscriptionItem;
    } else {
      subscriptions.push(subscriptionItem);
    }

    saveSubscriptions(subscriptions);

    return NextResponse.json({
      success: true,
      message: "Subscription saved successfully",
      subscriptionId: subscriptionItem.id,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save subscription" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint } = body;

    if (!endpoint) {
      return NextResponse.json({ success: false, error: "Endpoint required" }, { status: 400 });
    }

    const subscriptions = getSubscriptions();
    const filtered = subscriptions.filter((s) => s.endpoint !== endpoint);
    saveSubscriptions(filtered);

    return NextResponse.json({
      success: true,
      message: "Unsubscribed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
