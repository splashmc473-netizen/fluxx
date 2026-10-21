/* ==========================================================================
   Fluxx Code — Service Worker
   v8.0.3 — regra de bypass para /demos/ e /sites/
   ========================================================================== */

const CACHE = 'fluxxcode-v8.0.6';
const SHELL = [
  './',
  './index.html',
  './demos.html',
  './admin/index.html',

  './css/style.css',
  './css/extra.css',

  './js/api.js',
  './js/store.js',
  './js/data.js',
  './js/public.js',
  './js/app.js',
  './js/demos.js',

  './admin/painel.js',
  './admin/logger.js',
  './admin/admin.css',

  './logo-data.js',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-maskable.svg'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL).catch(err => console.warn('Pré-cache parcial:', err)))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // ✨ REGRA CRÍTICA — /demos/ e /sites/ NUNCA vão para o cache
  // Sempre rede primeiro. Cache só como fallback offline.
  if(/\/(demos|sites)\//.test(url.pathname)){
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // Google Fonts — stale-while-revalidate
  if(url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    e.respondWith(staleWhileRevalidate(req).catch(() => fetch(req)));
    return;
  }

  // Same-origin (site principal) — network-first
  if(url.origin === self.location.origin){
    e.respondWith(networkFirst(req).catch(() => fetch(req)));
    return;
  }
});

async function networkFirst(req){
  const cache = await caches.open(CACHE);
  try{
    const res = await fetch(req);
    if(res && res.ok) cache.put(req, res.clone());
    return res;
  }catch(err){
    const hit = await cache.match(req);
    if(hit) return hit;
    throw err;
  }
}

async function staleWhileRevalidate(req){
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  const fetching = fetch(req).then(r => {
    if(r && r.ok) cache.put(req, r.clone());
    return r;
  }).catch(() => hit);
  return hit || fetching;
}