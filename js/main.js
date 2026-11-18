const PAGES = [["index.html","Beranda"],["ensiklopedia.html","Ensiklopedia"],["peta.html","Peta Nusantara"],["kuis.html","Kuis"],["tentang.html","Tentang"]];
const page = document.body.dataset.page;
const $ = (s, r = document) => r.querySelector(s);
// Format file yang dicoba otomatis (cukup taruh salah satu, nama file = id alat musik)
const AUDIO_TYPES = [["mp3","audio/mpeg"],["ogg","audio/ogg"],["wav","audio/wav"],["m4a","audio/mp4"]];
const VIDEO_TYPES = [["mp4","video/mp4"],["webm","video/webm"],["mov","video/quicktime"]];
const IMG_EXT = ["jpg","jpeg","png","webp"];
const mediaSources = (base, types) => { const b = base.replace(/\.\w+$/, ""); return types.map(([e, t]) => `<source src="${b}.${e}" type="${t}">`).join(""); };

// Placeholder jika foto belum ada
function fallbackImg(img, id) {
  const i = instruments.find(x => x.id === id);
  const n = +(img.dataset.n || 0) + 1; img.dataset.n = n;
  if (n < IMG_EXT.length) { img.src = i.image.replace(/\.\w+$/, "") + "." + IMG_EXT[n]; return; }
  img.onerror = null;
  img.src = "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260'><rect width='100%' height='100%' fill='${i.color}'/><text x='50%' y='62%' font-size='96' text-anchor='middle'>${i.emoji}</text></svg>`);
}

// Navbar + footer
function buildLayout() {
  const links = PAGES.map(([h, t]) => {
    const cur = (h === "index.html" && page === "home") || h.startsWith(page) || (page === "detail" && h === "ensiklopedia.html");
    return `<li><a href="${h}" ${cur ? 'aria-current="page"' : ""}>${t}</a></li>`;
  }).join("");
  $("#site-header").innerHTML = `<header class="nav"><div class="container nav-in">
    <a class="brand" href="index.html">🎶 Musik Nusantara</a>
    <button class="theme" id="theme" aria-label="Ganti mode gelap/terang">🌓</button>
    <button class="burger" aria-label="Buka menu" aria-expanded="false">☰</button>
    <ul class="menu">${links}</ul></div></header>`;
  $("#site-footer").innerHTML = `<footer class="foot"><p>© 2026 Ensiklopedia Interaktif Alat Musik Tradisional Nusantara</p></footer>`;
  $("#theme").onclick = () => {
    const d = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = d;
    try { localStorage.setItem("theme", d); } catch (e) {}
  };
  const b = $(".burger");
  b.onclick = () => { const o = $(".menu").classList.toggle("open"); b.setAttribute("aria-expanded", o); };
}

// Kartu alat musik
function card(i) {
  return `<article class="card reveal">
    <img src="${i.image}" alt="Ilustrasi ${i.name}" loading="lazy" onerror="fallbackImg(this,'${i.id}')">
    <div class="card-b"><h3>${i.name}</h3>
    <p class="meta">📍 ${i.origin} · <span class="tag">${i.category}</span></p>
    <p>${i.short}</p>
    <a class="btn small" href="detail.html?id=${i.id}">Lihat Detail</a></div></article>`;
}

// Animasi muncul saat scroll
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

// ---- Beranda
function initHome() { $("#homeGrid").innerHTML = instruments.map(card).join(""); }

// ---- Katalog: search + filter tanpa reload
function initCatalog() {
  const q = $("#q"), r = $("#fRegion"), t = $("#fType");
  r.innerHTML = `<option value="">Semua Daerah</option>` + REGIONS.map(x => `<option>${x}</option>`).join("");
  t.innerHTML = `<option value="">Semua Jenis</option>` + TYPES.map(x => `<option>${x}</option>`).join("");
  const render = () => {
    const k = q.value.trim().toLowerCase();
    const list = instruments.filter(i =>
      (!r.value || i.region === r.value) && (!t.value || i.category === t.value) &&
      (!k || (i.name + i.origin + i.short).toLowerCase().includes(k)));
    $("#count").textContent = `${list.length} alat musik ditemukan`;
    $("#catalog").innerHTML = list.length ? list.map(card).join("") : "<p>Tidak ada alat musik yang cocok.</p>";
    reveal();
  };
  [q, r, t].forEach(el => el.addEventListener("input", render));
  render();
}

// ---- Detail
function initDetail() {
  const id = new URLSearchParams(location.search).get("id");
  const i = instruments.find(x => x.id === id);
  const box = $("#detail");
  if (!i) { box.innerHTML = `<p>Alat musik tidak ditemukan. <a href="ensiklopedia.html">Kembali ke Ensiklopedia</a></p>`; return; }
  const hs = (i.hotspots || []).filter(h => h.p).map((h, n) => `<button class="hotspot" slot="hotspot-${n}" data-position="${h.p}" data-normal="${h.n}" aria-label="${h.t}"><span class="hs-tip"><b>${h.t}</b><br>${h.d}</span></button>`).join("");
  const parts = (i.hotspots || []).length ? `<ul class="parts">${i.hotspots.map(h => `<li><strong>${h.t}:</strong> ${h.d}</li>`).join("")}</ul>` : "";
  document.title = i.name + " | Ensiklopedia Musik Nusantara";
  box.innerHTML = `
  <a href="ensiklopedia.html">← Kembali</a>
  <div class="detail">
    <div class="viewer">
      <model-viewer id="mv" src="${i.model}" alt="Model 3D ${i.name}" camera-controls auto-rotate shadow-intensity="1" touch-action="pan-y">${hs}</model-viewer>
      <p class="note" id="mvNote" hidden>Model 3D belum tersedia. Letakkan file di <code>${i.model}</code>.</p>
      <button class="btn small" id="reset">⟲ Reset Tampilan</button>
      ${parts}
    </div>
    <div class="info">
      <h1>${i.name}</h1>
      <p><strong>Asal:</strong> ${i.origin}<br><strong>Jenis:</strong> ${i.category}</p>
      <div class="audio">
        <button class="btn small" id="play" aria-label="Dengarkan suara ${i.name}">▶ Dengarkan Suara</button>
        <button class="btn btn-alt small" id="pause" aria-label="Jeda suara">⏸ Jeda</button>
        <div class="wave" id="wave" aria-hidden="true">${"<i></i>".repeat(12)}</div>
        <audio id="aud" preload="auto">${mediaSources(i.audio, AUDIO_TYPES)}</audio>
        <p class="note" id="audNote" hidden>File audio belum tersedia di <code>${i.audio}</code>.</p>
      </div>
      <h2>Sejarah</h2><p>${i.history}</p>
      <h2>Cara Memainkan</h2><p>${i.play}</p>
      <h2>Bahan</h2><p>${i.materials}</p>
      <h2>Fungsi</h2><p>${i.function}</p>
      <h2>Fakta Menarik</h2><ul>${i.facts.map(f => `<li>${f}</li>`).join("")}</ul>
    </div>
  </div>
  <h2 class="title small">Video: Cara Memainkan ${i.name}</h2>
  <div class="video"><video controls preload="none" aria-label="Video cara memainkan ${i.name}">${mediaSources(i.video, VIDEO_TYPES)}</video></div>
  <p class="note" id="vidNote" hidden>Video belum tersedia di <code>${i.video}</code>.</p>
  <p class="center">Video singkat tentang cara memainkan ${i.name}.</p>`;

  const mv = $("#mv"), aud = $("#aud"), wave = $("#wave");
  // Mode kalibrasi hotspot: tambahkan &dev=1 pada URL, klik model, salin hasil dari Console
  if (location.search.includes("dev=1")) mv.addEventListener("click", e => { const r = mv.positionAndNormalFromPoint(e.clientX, e.clientY); if (r) console.log(`p:"${r.position}", n:"${r.normal}"`); });
  mv.addEventListener("error", () => $("#mvNote").hidden = false);
  $("#reset").onclick = () => { mv.cameraOrbit = "0deg 75deg 105%"; mv.fieldOfView = "auto"; mv.jumpCameraToGoal && mv.jumpCameraToGoal(); };
  $("#play").onclick = () => aud.play().catch(() => $("#audNote").hidden = false);
  $("#pause").onclick = () => aud.pause();
  aud.onplay = () => wave.classList.add("on");
  aud.onpause = aud.onended = () => wave.classList.remove("on");
  aud.onerror = () => $("#audNote").hidden = false;
  $("video source:last-of-type").addEventListener("error", () => $("#vidNote").hidden = false);
}

// ---- Peta: tombol wilayah
function initMap() {
  const m = $("#map");
  m.innerHTML = REGIONS.map(r => `<button class="reg" data-r="${r}" style="grid-area:${r.split(" ")[0].toLowerCase()}">${r}</button>`).join("");
  m.addEventListener("click", e => {
    const b = e.target.closest(".reg"); if (!b) return;
    document.querySelectorAll(".reg").forEach(x => x.classList.toggle("sel", x === b));
    const list = instruments.filter(i => i.region === b.dataset.r);
    $("#mapTitle").textContent = `Alat musik dari ${b.dataset.r}`;
    $("#mapResult").innerHTML = list.length ? list.map(card).join("") : "<p>Belum ada data untuk wilayah ini.</p>";
    reveal();
  });
}

buildLayout();
({ home: initHome, ensiklopedia: initCatalog, detail: initDetail, peta: initMap }[page] || (() => {}))();
reveal();

// PWA: service worker (butuh localhost/HTTPS)
if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
