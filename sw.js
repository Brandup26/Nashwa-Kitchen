const CACHE_NAME = 'nashwy-v2';

self.addEventListener('install', (e) => {
  self.skipWaiting(); // تجبر السيستم يثبت فوراً بدون انتظار
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['index.html', 'manifest.json']);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim()); // تشغيل الأبلكيشن فوراً
});

self.addEventListener('fetch', (e) => {
  // استجابة سريعة جداً من الشبكة، ولو مفيش نت يروح للكاش
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
