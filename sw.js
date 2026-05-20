const CACHE_NAME = 'nashwy-kitchen-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'images/loogoo.jpg'
];

// تثبيت السيرفس وركر وحفظ الملفات الأساسية
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل السيرفس وركر وحذف الكاش القديم
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

// استراتيجية جلب البيانات (الشبكة أولاً، ثم الكاش لو مفيش نت)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
