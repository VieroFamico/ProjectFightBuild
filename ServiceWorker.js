// Replacement for the old PWA service worker: wipes its caches, unregisters
// itself, and reloads any tab it controlled so visitors get the live site.
self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys()
            .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
            .then(function () { return self.registration.unregister(); })
            .then(function () { return self.clients.matchAll({ type: 'window' }); })
            .then(function (clients) { clients.forEach(function (c) { c.navigate(c.url); }); })
    );
});
