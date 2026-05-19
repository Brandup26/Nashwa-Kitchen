const CACHE_NAME = 'nashwy-kitchen-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'images/loogoo.jpg'
];

// تثبيت الـ Service Worker وحفظ الملفات الأساسية
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تشغيل وتحديث الكاش لضمان السرعة الفائقة وسلاسة التصفح
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// استدعاء الملفات من الكاش مباشرة ليعمل الأبلكيشن بسرعة البرق بدون أي تأخير
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
