// System-level OS Notification helper for HS AI Solutions
// Fires native Windows/OS desktop notifications that appear even when the user is on another site or tab

export async function requestOSNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  if (Notification.permission === "default") {
    try {
      return await Notification.requestPermission();
    } catch {
      return "denied";
    }
  }
  return Notification.permission;
}

export interface OSNotificationOptions {
  title: string;
  body: string;
  icon?: string;
  targetUrl?: string;
  delayMs?: number;
}

export async function triggerOSNotification({
  title,
  body,
  icon = "/icon.svg",
  targetUrl = "/",
  delayMs = 0,
}: OSNotificationOptions): Promise<void> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return;
  }

  // Ensure permission is granted or requested
  let perm = Notification.permission;
  if (perm === "default") {
    perm = await requestOSNotificationPermission();
  }

  if (perm !== "granted") {
    return;
  }

  const fire = async () => {
    // 1. Try Service Worker showNotification first (most reliable for cross-site OS popup)
    if ("serviceWorker" in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && "showNotification" in reg) {
          await reg.showNotification(title, {
            body,
            icon,
            badge: icon,
            tag: "hs-ai-download-" + Date.now(),
            requireInteraction: true,
            data: { url: targetUrl, timestamp: Date.now() },
          });
          return;
        }
      } catch {
        // Fallback to Window Notification
      }
    }

    // 2. Window Notification fallback
    try {
      const notif = new Notification(title, {
        body,
        icon,
        tag: "hs-ai-download-" + Date.now(),
        requireInteraction: true,
      });

      notif.onclick = () => {
        try {
          window.focus();
        } catch {}
        if (targetUrl) {
          window.location.href = targetUrl;
        }
        notif.close();
      };
    } catch {
      // Ignored if notifications blocked by browser policy
    }
  };

  if (delayMs > 0) {
    setTimeout(fire, delayMs);
  } else {
    await fire();
  }
}
