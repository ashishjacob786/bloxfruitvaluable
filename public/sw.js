self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/favicon.ico',
      badge: data.badge || '/favicon.ico',
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      data: {
        url: data.url || '/'
      }
    };
    
    // eslint-disable-next-line no-undef
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // eslint-disable-next-line no-undef
  event.waitUntil(
    // eslint-disable-next-line no-undef
    clients.openWindow(event.notification.data.url)
  );
});
