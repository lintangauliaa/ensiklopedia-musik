// Data alat musik. Tambah objek baru di sini -> otomatis muncul di semua halaman.
// region harus salah satu dari daftar REGIONS di bawah.
const REGIONS = ["Jawa","Sumatra","Kalimantan","Sulawesi","Bali & Nusa Tenggara","Maluku","Papua"];
const TYPES = ["Idiophone","Membranophone","Chordophone","Aerophone"];

const instruments = [
  {
    id: "angklung", name: "Angklung", origin: "Jawa Barat", region: "Jawa", category: "Idiophone",
    emoji: "🎋", color: "#f6c453",
    short: "Alat musik bambu yang digoyangkan hingga berbunyi.",
    history: "Angklung berkembang di masyarakat Sunda dan dahulu dipakai dalam upacara kesuburan padi. UNESCO menetapkannya sebagai Warisan Budaya Takbenda pada 2010.",
    play: "Pegang rangka bambu, lalu goyangkan agar tabung bambu bergetar. Satu angklung biasanya menghasilkan satu nada, jadi lagu dimainkan bersama-sama.",
    materials: "Bambu (misalnya bambu hitam atau wulung) dan tali pengikat.",
    function: "Pengiring upacara adat, hiburan, pendidikan musik, dan pertunjukan kolaboratif.",
    facts: ["Dimainkan bersama oleh banyak orang, tiap orang memegang satu atau dua nada.", "Nadanya diatur dengan menyetem tabung bambu."],
    // Hotspot pin 3D (opsional): tambahkan p:"x y z", n:"x y z" pada hotspot (lihat README). Tanpa itu, hanya daftar bagian yang tampil.
    hotspots: [{t:"Tabung bambu",d:"Tabung dengan panjang berbeda menghasilkan nada berbeda."},{t:"Rangka bambu",d:"Bagian yang dipegang dan digoyangkan."}],
    image: "assets/images/angklung.jpg", model: "assets/models/angklung.glb",
    audio: "assets/audio/angklung.mp3", video: "assets/video/angklung.mp4"
  },
  {
    id: "sasando", name: "Sasando", origin: "Nusa Tenggara Timur", region: "Bali & Nusa Tenggara", category: "Chordophone",
    emoji: "🪕", color: "#7fd1b9",
    short: "Alat musik petik dari Pulau Rote dengan resonator daun lontar.",
    history: "Sasando berasal dari Pulau Rote, NTT, dan sudah dimainkan secara turun-temurun oleh masyarakat setempat.",
    play: "Dawai dipetik dengan jari kedua tangan: tangan kiri memainkan melodi dan tangan kanan mengiringi dengan akor.",
    materials: "Bambu, kayu, dan daun lontar.",
    function: "Mengiringi nyanyian, upacara adat, dan hiburan.",
    facts: ["Resonatornya berbentuk kipas dari daun lontar.", "Suaranya lembut dan menenangkan."],
    // Hotspot pin 3D (opsional): tambahkan p:"x y z", n:"x y z" pada hotspot (lihat README). Tanpa itu, hanya daftar bagian yang tampil.
    hotspots: [{t:"Resonator daun lontar",d:"Kipas daun lontar memperkuat suara dawai."},{t:"Dawai",d:"Dipetik dengan jari untuk menghasilkan nada."}],
    image: "assets/images/sasando.jpg", model: "assets/models/sasando.glb",
    audio: "assets/audio/sasando.mp3", video: "assets/video/sasando.mp4"
  },
  {
    id: "kendang", name: "Kendang", origin: "Jawa", region: "Jawa", category: "Membranophone",
    emoji: "🥁", color: "#ef8a6b",
    short: "Gendang pengatur irama dalam gamelan.",
    history: "Kendang telah lama menjadi bagian dari ansambel gamelan di Jawa dan berperan sebagai pemimpin irama.",
    play: "Dipukul dengan telapak tangan dan jari pada kedua sisi membran, menghasilkan berbagai pola bunyi.",
    materials: "Kayu (misalnya nangka) dan kulit hewan.",
    function: "Mengatur tempo dan peralihan dalam gamelan, serta mengiringi tari dan wayang.",
    facts: ["Pemain kendang sering disebut pemimpin irama gamelan.", "Ada beberapa ukuran kendang dengan suara berbeda."],
    // Hotspot pin 3D (opsional): tambahkan p:"x y z", n:"x y z" pada hotspot (lihat README). Tanpa itu, hanya daftar bagian yang tampil.
    hotspots: [{t:"Membran kulit",d:"Bagian yang dipukul dengan tangan."},{t:"Badan kayu",d:"Badan berongga yang memperkuat bunyi."}],
    image: "assets/images/kendang.jpg", model: "assets/models/kendang.glb",
    audio: "assets/audio/kendang.mp3", video: "assets/video/kendang.mp4"
  },
  {
    id: "tifa", name: "Tifa", origin: "Papua/Maluku", region: "Papua", category: "Membranophone",
    emoji: "🪘", color: "#9b8bd9",
    short: "Gendang tradisional timur Indonesia.",
    history: "Tifa dikenal luas di Maluku dan Papua serta digunakan dalam berbagai upacara dan tarian adat.",
    play: "Membran dipukul dengan tangan; tifa biasanya dipegang atau diletakkan lalu dipukul mengikuti irama tarian.",
    materials: "Kayu dan kulit.",
    function: "Mengiringi tarian, upacara adat, dan penyampaian pesan.",
    facts: ["Bentuk dan ukirannya berbeda-beda di tiap daerah.", "Sering dimainkan bersama nyanyian dan tarian."],
    // Hotspot pin 3D (opsional): tambahkan p:"x y z", n:"x y z" pada hotspot (lihat README). Tanpa itu, hanya daftar bagian yang tampil.
    hotspots: [{t:"Membran kulit",d:"Bagian yang dipukul dengan tangan."},{t:"Badan kayu",d:"Badan berongga yang memperkuat bunyi."}],
    image: "assets/images/tifa.jpg", model: "assets/models/tifa.glb",
    audio: "assets/audio/tifa.mp3", video: "assets/video/tifa.mp4"
  },
  {
    id: "sape", name: "Sape", origin: "Kalimantan", region: "Kalimantan", category: "Chordophone",
    emoji: "🎸", color: "#8fc7e8",
    short: "Alat musik petik suku Dayak dengan ukiran khas.",
    history: "Sape dikenal dari suku Dayak di Kalimantan dan dahulu dimainkan dalam upacara adat serta pengiring tarian.",
    play: "Dawai dipetik dengan jari; satu tangan memetik melodi sambil tangan lain menekan dawai.",
    materials: "Kayu dan dawai.",
    function: "Mengiringi tari dan upacara adat Dayak.",
    facts: ["Badannya sering dihiasi ukiran motif Dayak.", "Suaranya mengalun lembut dan khas."],
    hotspots: [{t:"Badan berukir",d:"Badan kayu dengan ukiran motif Dayak."},{t:"Dawai",d:"Dipetik dengan jari untuk melodi."}],
    image: "assets/images/sape.jpg", model: "assets/models/sape.glb",
    audio: "assets/audio/sape.mp3", video: "assets/video/sape.mp4"
  },
  {
    id: "kecapi-baduy", name: "Kecapi Baduy", origin: "Banten (Suku Baduy)", region: "Jawa", category: "Chordophone",
    emoji: "🎼", color: "#c9a0e8",
    short: "Kecapi kecil khas Suku Baduy pengiring cerita pantun.",
    history: "Kecapi Baduy, sering disebut kecapi buhun, adalah alat musik tradisional Suku Baduy di Banten. Alat ini dipakai untuk mengiringi carita pantun, tradisi bercerita masyarakat Baduy.",
    play: "Dawai dipetik dengan jari sambil pemain melantunkan cerita pantun. Ukurannya relatif kecil sehingga dapat dipetik sambil dibawa.",
    materials: "Kayu (menurut sumber, kayu pohon lame) dan dawai.",
    function: "Mengiringi carita pantun dalam tradisi Baduy.",
    facts: ["Ukurannya lebih kecil daripada kecapi pada umumnya.", "Menurut sumber, pembuatannya memiliki aturan dan pantangan adat."],
    hotspots: [{t:"Badan kayu",d:"Badan berongga yang memperkuat suara dawai."},{t:"Dawai",d:"Dipetik untuk mengiringi cerita pantun."}],
    image: "assets/images/kecapi-baduy.jpg", model: "assets/models/kecapi-baduy.glb",
    audio: "assets/audio/kecapi-baduy.mp3", video: "assets/video/kecapi-baduy.mp4"
  },
  {
    id: "keso-keso", name: "Keso-keso", origin: "Sulawesi Selatan (Makassar)", region: "Sulawesi", category: "Chordophone",
    emoji: "🎻", color: "#e8b08f",
    short: "Alat musik gesek dua dawai pengiring tradisi sinrilik.",
    history: "Keso-keso adalah alat musik gesek masyarakat Makassar, Sulawesi Selatan, yang dikenal sebagai pengiring sinrilik, yaitu tradisi bercerita yang dilagukan.",
    play: "Dua dawai digesek dengan busur sambil pemain menuturkan cerita secara berlagu.",
    materials: "Kayu atau bambu untuk badan dan leher, serta tempurung kelapa sebagai resonator.",
    function: "Mengiringi sinrilik (tradisi bertutur) dan upacara adat.",
    facts: ["Mirip rebab, tetapi hanya memiliki dua dawai.", "Suaranya sering terdengar melankolis."],
    hotspots: [{t:"Resonator tempurung kelapa",d:"Memperkuat suara dawai yang digesek."},{t:"Dawai dan busur",d:"Dua dawai digesek dengan busur."}],
    image: "assets/images/keso-keso.jpg", model: "assets/models/keso-keso.glb",
    audio: "assets/audio/keso-keso.mp3", video: "assets/video/keso-keso.mp4"
  },
  {
    id: "gong", name: "Gong", origin: "Jawa (gamelan)", region: "Jawa", category: "Idiophone",
    emoji: "🔔", color: "#d9b44a",
    short: "Gong perunggu besar penanda akhir frasa dalam gamelan.",
    history: "Gong adalah bagian penting ansambel gamelan di Jawa dan dikenal luas di berbagai daerah Nusantara.",
    play: "Gong digantung pada rangka lalu dipukul bagian tengahnya (pencu) dengan pemukul berlapis kain.",
    materials: "Perunggu (logam) dan rangka kayu penggantung.",
    function: "Menandai akhir siklus melodi dan memberi kesan megah pada gamelan.",
    facts: ["Gong besar menghasilkan bunyi rendah yang bergema lama.", "Dipukul pada titik tertentu dalam siklus lagu."],
    hotspots: [{t:"Pencu",d:"Tonjolan di tengah yang dipukul."},{t:"Bidang gong",d:"Lingkaran logam yang bergetar menghasilkan suara dalam."}],
    image: "assets/images/gong.jpg", model: "assets/models/gong.glb",
    audio: "assets/audio/gong.mp3", video: "assets/video/gong.mp4"
  },
  {
    id: "saron", name: "Saron", origin: "Jawa (gamelan)", region: "Jawa", category: "Idiophone",
    emoji: "🎹", color: "#8fb5e8",
    short: "Instrumen bilah logam pemegang melodi pokok gamelan.",
    history: "Saron adalah bagian ansambel gamelan Jawa dan memegang melodi dasar (balungan).",
    play: "Bilah dipukul dengan tabuh kayu, sedangkan tangan lain menahan bilah sebelumnya agar bunyi tidak bercampur.",
    materials: "Bilah perunggu atau logam dan rancak (rangka) kayu.",
    function: "Memainkan melodi pokok untuk mengiringi tari, wayang, dan upacara.",
    facts: ["Biasanya ada beberapa saron dalam satu gamelan.", "Menahan bilah dengan tepat membuat nada terdengar jernih."],
    hotspots: [{t:"Bilah logam",d:"Dipukul dengan tabuh kayu."},{t:"Rancak",d:"Rangka kayu penyangga bilah."}],
    image: "assets/images/saron.jpg", model: "assets/models/saron.glb",
    audio: "assets/audio/saron.mp3", video: "assets/video/saron.mp4"
  },
  {
    id: "suling-bambu", name: "Suling Bambu", origin: "Berbagai daerah Nusantara", region: "Jawa", category: "Aerophone",
    emoji: "🪈", color: "#8ddba0",
    short: "Seruling bambu yang ditiup, dikenal di banyak daerah.",
    history: "Suling bambu dimainkan di banyak daerah Indonesia, antara lain Jawa Barat dan Bali, dalam beragam musik tradisional.",
    play: "Ditiup pada lubang tiup sambil jari menutup dan membuka lubang nada.",
    materials: "Bambu.",
    function: "Melodi dalam musik tradisional, pengiring tari, dan hiburan.",
    facts: ["Nadanya halus dan melodius.", "Panjang dan lubang nada memengaruhi tinggi nada."],
    hotspots: [{t:"Lubang tiup",d:"Tempat udara ditiup."},{t:"Lubang nada",d:"Ditutup-buka dengan jari untuk mengubah nada."}],
    image: "assets/images/suling-bambu.jpg", model: "assets/models/suling-bambu.glb",
    audio: "assets/audio/suling-bambu.mp3", video: "assets/video/suling-bambu.mp4"
  }
];
