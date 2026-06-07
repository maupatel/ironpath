/* IronPath service worker
   - App shell (HTML/JS/manifest): NETWORK-FIRST so updates always show when online,
     falling back to cache when offline. Fixes "app not refreshing / glitchy".
   - Exercise images: CACHE-FIRST (they never change), only caching successful responses. */
const SHELL = 'ironpath-shell-v8';
const IMG   = 'ironpath-img-v8';
const SHELL_FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES).catch(()=>{})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== SHELL && k !== IMG).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

const isImage = url => /\/exercises\/|\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // only handle same-origin (let anything external pass straight through)
  if (url.origin !== self.location.origin) return;

  // Images: cache-first, store only good responses.
  if (isImage(url.pathname)) {
    e.respondWith(
      caches.open(IMG).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        } catch { return hit || Response.error(); }
      })
    );
    return;
  }

  // App shell / everything else: network-first, fall back to cache (offline).
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(SHELL).then(c => c.put(req, copy)).catch(()=>{});
      }
      return res;
    }).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
  );
});
