// Service Worker for HS AI Solutions Web Push Notifications
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  if (!event.data) return;

  try {
    const payload = event.data.json();
    const title = payload.title || "HS AI Solutions Update";
    const options = {
      body: payload.body || payload.message || "New project update available.",
      icon: payload.icon || "/icon.svg",
      badge: "/icon.svg",
      image: payload.image || undefined,
      tag: payload.tag || "hs-ai-announcement",
      data: {
        url: payload.url || payload.destination_url || "/",
        timestamp: Date.now(),
      },
      vibrate: [100, 50, 100],
      requireInteraction: false,
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (err) {
    // Fallback if data is plain text
    const text = event.data.text();
    event.waitUntil(
      self.registration.showNotification("HS AI Solutions", {
        body: text,
        icon: "/icon.svg",
        data: { url: "/" },
      })
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          if (client.url.includes(self.location.origin)) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
