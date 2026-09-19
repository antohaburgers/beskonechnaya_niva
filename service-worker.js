const CACHE_NAME = "beskonechnaya-niva-v1";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Local notification handler.
// The page schedules the reminder logic and sends messages to this worker.
self.addEventListener("message", event => {
  if (!event.data) return;

  if (event.data.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification(
      "🚙 Бесконечная Нива",
      {
        body: event.data.text,
        icon: "/icon-192.png",
        badge: "/icon-192.png"
      }
    );
  }
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(list => {
        if (list.length) return list[0].focus();
        return clients.openWindow("/");
      })
  );
});
