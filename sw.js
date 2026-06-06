/* IronPath service worker — offline app shell + lazy image caching */
const SHELL = 'ironpath-shell-v3';
const IMG   = 'ironpath-img-v3';
const SHELL_FILES = [
  './', './index.html', './manifest.webmanifest', './icon.svg'
];

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

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Exercise demo images (jsdelivr): cache-first, store after first view → works offline next time.
  if (req.url.includes('cdn.jsdelivr.net')) {
    e.respondWith(
      caches.open(IMG).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try { const res = await fetch(req); cache.put(req, res.clone()); return res; }
        catch { return hit || Response.error(); }
      })
    );
    return;
  }

  // App shell: cache-first, fall back to network.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(SHELL).then(c => c.put(req, copy)).catch(()=>{});
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
