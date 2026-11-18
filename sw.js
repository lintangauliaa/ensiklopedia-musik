// Service worker sederhana: simpan file aplikasi agar bisa dibuka offline.
// Naikkan angka versi CACHE setiap kali Anda mengubah file.
const CACHE = "musik-nusantara-v4";
const SHELL = ["./","index.html","ensiklopedia.html","detail.html","peta.html","kuis.html","tentang.html","css/style.css","js/main.js","js/instruments.js","js/quiz.js","manifest.webmanifest","icon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || e.request.headers.has("range")) return; // audio/video streaming dilewati
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => {
    const net = fetch(e.request).then(r => {
      if (r && (r.ok || r.type === "opaque") && r.status !== 206) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
      return r;
    }).catch(() => hit);
    return hit || net; // tampilkan cache dulu, perbarui di latar belakang
  }));
});
