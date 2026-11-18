// Kuis tebak suara: 5 soal acak, +20 poin per jawaban benar
const TOTAL = 5, POINT = 20;
let qs, idx, score, locked, mode = "audio";
const box = document.getElementById("quizBox");
// Efek suara kuis: pakai file assets/audio/sfx-*.mp3 jika ada, kalau tidak ada pakai suara bawaan (tanpa file)
const sfxBox = document.getElementById("sfxOn");
sfxBox.checked = localStorage.getItem("sfx") !== "off";
sfxBox.onchange = () => { try { localStorage.setItem("sfx", sfxBox.checked ? "on" : "off"); } catch (e) {} };
function synth(n) {
  try {
    const C = new (window.AudioContext || window.webkitAudioContext)();
    const seq = n === "benar" ? [[523, 0], [659, .12], [784, .24]] : n === "salah" ? [[220, 0], [165, .18]] : [[523, 0], [659, .15], [784, .3], [1047, .45]];
    seq.forEach(([f, t]) => {
      const o = C.createOscillator(), g = C.createGain();
      o.type = n === "salah" ? "sawtooth" : "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(.18, C.currentTime + t); g.gain.exponentialRampToValueAtTime(.001, C.currentTime + t + .25);
      o.connect(g).connect(C.destination); o.start(C.currentTime + t); o.stop(C.currentTime + t + .26);
    });
  } catch (e) {}
}
function sfx(n) {
  if (!sfxBox.checked) return;
  new Audio(`assets/audio/sfx-${n}.mp3`).play().catch(() => synth(n));
}
const shuffle = a => [...a].sort(() => Math.random() - .5);

function menu() {
  box.innerHTML = `<div class="panel center"><h2>Pilih Mode Kuis</h2>
    <button class="btn" id="mA">🔊 Tebak Suara</button> <button class="btn btn-alt" id="mI">🖼️ Tebak Gambar</button></div>`;
  document.getElementById("mA").onclick = () => start("audio");
  document.getElementById("mI").onclick = () => start("image");
}
function start(m = mode) {
  mode = m;
  // Soal diambil acak dari data; jika alat musik < 5, soal berulang dengan urutan pilihan berbeda
  let pool = [];
  while (pool.length < TOTAL) pool = pool.concat(shuffle(instruments));
  qs = pool.slice(0, TOTAL); idx = 0; score = 0; show();
}

function show() {
  locked = false;
  const ans = qs[idx];
  const others = shuffle(instruments.filter(i => i.id !== ans.id)).slice(0, 3);
  const opts = shuffle([ans, ...others]);
  const media = mode === "image"
    ? `<h2>Alat musik apakah yang ditampilkan pada gambar ini?</h2><img class="qimg" src="${ans.image}" alt="Gambar alat musik yang harus ditebak" onerror="fallbackImg(this,'${ans.id}')">`
    : `<h2>Alat musik apakah yang menghasilkan suara ini?</h2><button class="btn" id="snd" aria-label="Putar suara">🔊 Putar Suara</button>
    <audio id="qa" preload="auto">${mediaSources(ans.audio, AUDIO_TYPES)}</audio><p class="note" id="qn" hidden>File audio belum tersedia (${ans.audio}).</p>`;
  box.innerHTML = `<div class="panel">
    <p>Soal ${idx + 1} / ${TOTAL} · Skor: <strong id="sc">${score}</strong></p>
    ${media}
    <div class="opts">${opts.map((o, n) => `<button class="opt" data-id="${o.id}">${"ABCD"[n]}. ${o.name}</button>`).join("")}</div>
    <div id="fb" aria-live="polite"></div></div>`;
  const snd = document.getElementById("snd");
  if (snd) snd.onclick = () => document.getElementById("qa").play().catch(() => document.getElementById("qn").hidden = false);
  box.querySelectorAll(".opt").forEach(b => b.onclick = () => pick(b, ans));
}

function pick(b, ans) {
  if (locked) return; locked = true;
  const ok = b.dataset.id === ans.id;
  if (ok) score += POINT;
  sfx(ok ? "benar" : "salah");
  box.querySelectorAll(".opt").forEach(x => {
    x.disabled = true;
    if (x.dataset.id === ans.id) x.classList.add("right");           // ikon ✔ agar tidak hanya warna
    else if (x === b) x.classList.add("wrong");
    if (x.dataset.id === ans.id) x.textContent = "✔ " + x.textContent;
    else if (x === b) x.textContent = "✖ " + x.textContent;
  });
  const qa = document.getElementById("qa"); if (qa) qa.pause();
  document.getElementById("sc").textContent = score;
  document.getElementById("fb").innerHTML = `<p class="fb ${ok ? "ok" : "no"}">${ok ? "Benar! 🎉" : "Belum tepat. Coba lagi!"}</p>
    <p><strong>${ans.name}</strong> (${ans.origin}): ${ans.short} ${ans.function}</p>
    <button class="btn" id="next">${idx + 1 < TOTAL ? "Soal Berikutnya" : "Lihat Skor"}</button>`;
  document.getElementById("next").onclick = () => { idx++; idx < TOTAL ? show() : finish(); };
}

function finish() {
  sfx("selesai");
  const best = Math.max(score, +(localStorage.getItem("bestScore") || 0));
  try { localStorage.setItem("bestScore", best); } catch (e) {}
  const t = score >= 80 ? "Pakar Musik Nusantara 🏆" : score >= 60 ? "Penjelajah Budaya 🎵" : score >= 40 ? "Pelajar Nusantara 📚" : "Ayo Eksplorasi Lagi 🌱";
  box.innerHTML = `<div class="panel center"><h2>SKOR AKHIR</h2>
    <p class="big" id="big">0 / 100</p><h3>${t}</h3><p>Skor terbaik: ${best}</p>
    <button class="btn" id="again">Main Lagi</button> <button class="btn btn-alt" id="mode">Ganti Mode</button> <a class="btn btn-alt" href="ensiklopedia.html">Kembali ke Ensiklopedia</a></div>`;
  document.getElementById("again").onclick = () => start();
  document.getElementById("mode").onclick = menu;
  // animasi hitung skor
  let n = 0; const el = document.getElementById("big");
  const iv = setInterval(() => { n = Math.min(score, n + 4); el.textContent = `${n} / 100`; if (n >= score) clearInterval(iv); }, 30);
}
menu();
