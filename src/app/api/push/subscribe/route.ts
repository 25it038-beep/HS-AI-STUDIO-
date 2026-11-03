import { NextRequest, NextResponse } from "next/server";
import { getSubscriptions, saveSubscriptions, PushSubscriptionItem } from "@/lib/notifications-store";
import { sanitizeInput } from "@/lib/security";

const MAX_SUBSCRIPTIONS = 10_000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { endpoint, keys } = body;

    // Strict validation of push subscription parameters
    if (
      !endpoint ||
      typeof endpoint !== "string" ||
      !endpoint.startsWith("https://") ||
      endpoint.length > 500 ||
      !keys ||
      typeof keys.p256dh !== "string" ||
      typeof keys.auth !== "string" ||
      keys.p256dh.length < 20 ||
      keys.p256dh.length > 250 ||
      keys.auth.length < 10 ||
      keys.auth.length > 100
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid subscription payload format." },
        { status: 400 }
      );
    }

    const subscriptions = getSubscriptions();
    const existingIndex = subscriptions.findIndex((s) => s.endpoint === endpoint);

    // Prevent storage exhaustion attack
    if (existingIndex < 0 && subscriptions.length >= MAX_SUBSCRIPTIONS) {
      return NextResponse.json(
        { success: false, error: "Subscription pool limit reached." },
        { status: 429 }
      );
    }

    const rawUserAgent = req.headers.get("user-agent") || "";
    const sanitizedUserAgent = sanitizeInput(rawUserAgent, 200) || undefined;

    const subscriptionItem: PushSubscriptionItem = {
      id: existingIndex >= 0 ? subscriptions[existingIndex].id : `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      endpoint: endpoint.trim(),
      keys: {
        p256dh: keys.p256dh.trim(),
        auth: keys.auth.trim(),
      },
      userAgent: sanitizedUserAgent,
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
    const body = await req.json().catch(() => ({}));
    const { endpoint } = body;

    if (!endpoint || typeof endpoint !== "string") {
      return NextResponse.json({ success: false, error: "Endpoint required" }, { status: 400 });
    }

    const subscriptions = getSubscriptions();
    const filtered = subscriptions.filter((s) => s.endpoint !== endpoint.trim());
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
