// ─────────────────────────────────────────────
// API CONFIGURATION
// ─────────────────────────────────────────────

const API_BASE       = 'https://api.alquran.cloud/v1/ayah';
const ARABIC_EDITION = 'quran-uthmani';

const STORAGE_KEY = 'quran-ext-language';
const THEME_KEY   = 'quran-ext-theme';
const COLOUR_KEY  = 'quran-ext-colour';

// tafseerId from api.quran.com/api/v4/resources/tafsirs
const LANGUAGES = [
  { label: "English",     edition: "en.sahih",       tafseerId: 169 },
  { label: "Urdu",        edition: "ur.ahmedali",    tafseerId: 160 },
  { label: "French",      edition: "fr.hamidullah",  tafseerId: 169 },
  { label: "Spanish",     edition: "es.asad",        tafseerId: 169 },
  { label: "German",      edition: "de.bubenheim",   tafseerId: 169 },
  { label: "Turkish",     edition: "tr.diyanet",     tafseerId: 169 },
  { label: "Indonesian",  edition: "id.indonesian",  tafseerId: 169 },
  { label: "Bengali",     edition: "bn.bengali",     tafseerId: 164 },
  { label: "Russian",     edition: "ru.kuliev",      tafseerId: 170 },
  { label: "Dutch",       edition: "nl.keyzer",      tafseerId: 169 },
  { label: "Bosnian",     edition: "bs.korkut",      tafseerId: 169 },
  { label: "Hindi",       edition: "hi.hindi",       tafseerId: 169 },
  { label: "Swahili",     edition: "sw.barwani",     tafseerId: 169 },
  { label: "Malayalam",   edition: "ml.abdulhameed", tafseerId: 169 },
  { label: "Persian",     edition: "fa.ansarian",    tafseerId: 169 },
];


// ─────────────────────────────────────────────
// QURAN DATA
// ─────────────────────────────────────────────

const SURAH_LENGTHS = [
  7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,
  98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,
  75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,
  14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,22,33,39,29,22,
  21,20,21,17,18,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,
  4,7,3,6,3,5,4,5,6
];

const SURAH_NAMES = [
  "Al-Fatihah","Al-Baqarah","Aali Imran","An-Nisa","Al-Ma'idah","Al-An'am",
  "Al-A'raf","Al-Anfal","At-Tawbah","Yunus","Hud","Yusuf","Ar-Ra'd","Ibrahim",
  "Al-Hijr","An-Nahl","Al-Isra","Al-Kahf","Maryam","Ta-Ha","Al-Anbiya",
  "Al-Hajj","Al-Mu'minun","An-Nur","Al-Furqan","Ash-Shu'ara","An-Naml",
  "Al-Qasas","Al-Ankabut","Ar-Rum","Luqman","As-Sajdah","Al-Ahzab","Saba",
  "Fatir","Ya-Sin","As-Saffat","Sad","Az-Zumar","Ghafir","Fussilat","Ash-Shuraa",
  "Az-Zukhruf","Ad-Dukhan","Al-Jathiyah","Al-Ahqaf","Muhammad","Al-Fath",
  "Al-Hujurat","Qaf","Adh-Dhariyat","At-Tur","An-Najm","Al-Qamar","Ar-Rahman",
  "Al-Waqi'ah","Al-Hadid","Al-Mujadila","Al-Hashr","Al-Mumtahanah","As-Saf",
  "Al-Jumu'ah","Al-Munafiqun","At-Taghabun","At-Talaq","At-Tahrim","Al-Mulk",
  "Al-Qalam","Al-Haqqah","Al-Ma'arij","Nuh","Al-Jinn","Al-Muzzammil",
  "Al-Muddaththir","Al-Qiyamah","Al-Insan","Al-Mursalat","An-Naba",
  "An-Nazi'at","Abasa","At-Takwir","Al-Infitar","Al-Mutaffifin","Al-Inshiqaq",
  "Al-Buruj","At-Tariq","Al-A'la","Al-Ghashiyah","Al-Fajr","Al-Balad",
  "Ash-Shams","Al-Layl","Ad-Duha","Ash-Sharh","At-Tin","Al-Alaq","Al-Qadr",
  "Al-Bayyinah","Az-Zalzalah","Al-Adiyat","Al-Qari'ah","At-Takathur","Al-Asr",
  "Al-Humazah","Al-Fil","Quraysh","Al-Ma'un","Al-Kawthar","Al-Kafirun",
  "An-Nasr","Al-Masad","Al-Ikhlas","Al-Falaq","An-Nas"
];


// ─────────────────────────────────────────────
// DARK MODE
// ─────────────────────────────────────────────

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) { applyTheme(saved); return; }
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
  // Re-apply colour theme after switching so it recalculates for the new mode
  const savedColour = localStorage.getItem(COLOUR_KEY) || DEFAULT_COLOUR;
  setTimeout(() => applyColour(savedColour), 10);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
});

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
initTheme();


// ─────────────────────────────────────────────
// COLOUR PICKER
// ─────────────────────────────────────────────

const DEFAULT_COLOUR = '#b5832a'; // default gold accent

// Convert hex to RGB object
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return { r, g, b };
}

// Convert RGB to hex string
function rgbToHex(r, g, b) {
  return '#' + [r,g,b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2,'0')).join('');
}

// Mix a colour toward white (factor 0=original, 1=white)
function lighten(r, g, b, factor) {
  return {
    r: r + (255 - r) * factor,
    g: g + (255 - g) * factor,
    b: b + (255 - b) * factor
  };
}

// Mix a colour toward black (factor 0=original, 1=black)
function darken(r, g, b, factor) {
  return { r: r * (1-factor), g: g * (1-factor), b: b * (1-factor) };
}

// Generate a full theme from a single picked colour.
// Works for both light and dark mode — dark mode vars are handled separately.
function applyColour(hex) {
  const { r, g, b } = hexToRgb(hex);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const root   = document.documentElement;

  if (isDark) {
    // Dark mode: use the colour to tint dark backgrounds
    const bg      = darken(r, g, b, 0.85);
    const surface = darken(r, g, b, 0.78);
    const surf2   = darken(r, g, b, 0.72);
    const border  = darken(r, g, b, 0.60);
    const textCol = lighten(r, g, b, 0.85);
    const textSoft= lighten(r, g, b, 0.55);
    const textMut = lighten(r, g, b, 0.25);
    const gold    = lighten(r, g, b, 0.20);
    const goldL   = { r, g, b };

    root.style.setProperty('--bg',           rgbToHex(bg.r,bg.g,bg.b));
    root.style.setProperty('--surface',      rgbToHex(surface.r,surface.g,surface.b));
    root.style.setProperty('--surface-2',    rgbToHex(surf2.r,surf2.g,surf2.b));
    root.style.setProperty('--border',       rgbToHex(border.r,border.g,border.b));
    root.style.setProperty('--text',         rgbToHex(textCol.r,textCol.g,textCol.b));
    root.style.setProperty('--text-soft',    rgbToHex(textSoft.r,textSoft.g,textSoft.b));
    root.style.setProperty('--text-muted',   rgbToHex(textMut.r,textMut.g,textMut.b));
    root.style.setProperty('--gold',         rgbToHex(gold.r,gold.g,gold.b));
    root.style.setProperty('--gold-light',   rgbToHex(goldL.r,goldL.g,goldL.b));
    root.style.setProperty('--shortcut-bg',  `rgba(${r},${g},${b},0.12)`);
    root.style.setProperty('--shortcut-hover',`rgba(${r},${g},${b},0.2)`);
  } else {
    // Light mode: use the colour to tint light backgrounds
    const bg      = lighten(r, g, b, 0.88);
    const surface = lighten(r, g, b, 0.96);
    const surf2   = lighten(r, g, b, 0.82);
    const border  = lighten(r, g, b, 0.65);
    const textCol = darken(r, g, b, 0.82);
    const textSoft= darken(r, g, b, 0.55);
    const textMut = lighten(r, g, b, 0.25);
    const gold    = darken(r, g, b, 0.25);
    const goldL   = lighten(r, g, b, 0.30);

    root.style.setProperty('--bg',           rgbToHex(bg.r,bg.g,bg.b));
    root.style.setProperty('--surface',      rgbToHex(surface.r,surface.g,surface.b));
    root.style.setProperty('--surface-2',    rgbToHex(surf2.r,surf2.g,surf2.b));
    root.style.setProperty('--border',       rgbToHex(border.r,border.g,border.b));
    root.style.setProperty('--text',         rgbToHex(textCol.r,textCol.g,textCol.b));
    root.style.setProperty('--text-soft',    rgbToHex(textSoft.r,textSoft.g,textSoft.b));
    root.style.setProperty('--text-muted',   rgbToHex(textMut.r,textMut.g,textMut.b));
    root.style.setProperty('--gold',         rgbToHex(gold.r,gold.g,gold.b));
    root.style.setProperty('--gold-light',   rgbToHex(goldL.r,goldL.g,goldL.b));
    root.style.setProperty('--shortcut-bg',  `rgba(${r},${g},${b},0.08)`);
    root.style.setProperty('--shortcut-hover',`rgba(${r},${g},${b},0.15)`);
  }

  // Sync the input swatch
  const input = document.getElementById('colour-input');
  if (input) input.value = hex;
}

function initColour() {
  const saved = localStorage.getItem(COLOUR_KEY) || DEFAULT_COLOUR;
  applyColour(saved);
}

document.getElementById('colour-input').addEventListener('input', function () {
  localStorage.setItem(COLOUR_KEY, this.value);
  applyColour(this.value);
});



initColour();


// ─────────────────────────────────────────────
// SHORTCUTS (chrome.topSites)
// ─────────────────────────────────────────────

function buildShortcuts() {
  if (!chrome?.topSites) return;
  chrome.topSites.get(sites => {
    const container = document.getElementById('shortcuts');
    sites.slice(0, 4).forEach(site => {
      const a      = document.createElement('a');
      a.href       = site.url;
      a.className  = 'shortcut';
      const domain = new URL(site.url).hostname;
      const icon   = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
      const title  = site.title.length > 12 ? site.title.slice(0, 12) + '…' : site.title;
      a.innerHTML  = `
        <div class="shortcut__icon">
          <img src="${icon}" alt="${title}" onerror="this.style.display='none'" />
        </div>
        <span class="shortcut__label">${title}</span>
      `;
      container.appendChild(a);
    });
  });
}


// ─────────────────────────────────────────────
// VERSE SELECTION (date-seeded, stable all day)
// ─────────────────────────────────────────────

function getTodayVerse() {
  const now  = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
  const surah = Math.floor(rand() * 114) + 1;
  const ayah  = Math.floor(rand() * SURAH_LENGTHS[surah - 1]) + 1;
  return { surah, ayah };
}


// ─────────────────────────────────────────────
// API FETCHING
// ─────────────────────────────────────────────

async function fetchAyah(surah, ayah, edition) {
  const res = await fetch(`${API_BASE}/${surah}:${ayah}/${edition}`);
  if (!res.ok) throw new Error(`${res.status}`);
  const json = await res.json();
  return json.data.text;
}


// ─────────────────────────────────────────────
// LANGUAGE DROPDOWN
// ─────────────────────────────────────────────

function buildDropdown() {
  const select = document.getElementById('lang-select');
  const saved  = localStorage.getItem(STORAGE_KEY) || 'en.sahih';

  LANGUAGES.forEach(({ label, edition }) => {
    const option       = document.createElement('option');
    option.value       = edition;
    option.textContent = label;
    if (edition === saved) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener('change', () => {
    localStorage.setItem(STORAGE_KEY, select.value);
    hideTafseer();
    loadVerse();
  });
}

function getSelectedTafseerID() {
  const selectedEdition = document.getElementById('lang-select').value;
  const match = LANGUAGES.find(l => l.edition === selectedEdition);
  return match ? match.tafseerId : 169;
}


// ─────────────────────────────────────────────
// TAFSEER PANEL
// ─────────────────────────────────────────────

// Current font size in px — starts at 13, can go from 10 to 20
let tafseerFontSize = 13;

function hideTafseer() {
  const panel    = document.getElementById('tafseer-panel');
  const btn      = document.getElementById('tafseer-btn');
  const controls = document.getElementById('tafseer-controls');
  panel.style.display    = 'none';
  panel.textContent      = '';
  btn.textContent        = 'Show Tafseer';
  controls.classList.remove('visible');
}

async function toggleTafseer() {
  const panel = document.getElementById('tafseer-panel');
  const btn   = document.getElementById('tafseer-btn');

  if (panel.style.display === 'block') { hideTafseer(); return; }

  panel.style.display = 'block';
  panel.innerHTML     = '<span class="dots"><span></span><span></span><span></span></span>';
  btn.textContent     = 'Hide Tafseer';
  document.getElementById('tafseer-controls').classList.add('visible');
  panel.style.fontSize = tafseerFontSize + 'px';

  const { surah, ayah } = getVerse();
  const tafseerID       = getSelectedTafseerID();

  try {
    const res  = await fetch(`https://api.quran.com/api/v4/tafsirs/${tafseerID}/by_ayah/${surah}:${ayah}`);
    if (!res.ok) throw new Error(res.status);
    const json = await res.json();
    const raw  = json.tafsir?.text || json.tafsirs?.[0]?.text || '';
    // Strip HTML tags, then split on double newlines or sentence breaks to form paragraphs
    const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) { panel.textContent = 'No tafseer available for this verse.'; }
    else {
      // Split into paragraphs on double spaces or long gaps left by removed HTML tags
      const paragraphs = clean.split(/(?<=\.) {2,}/).filter(p => p.trim().length > 0);
      panel.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
    }
  } catch (err) {
    panel.textContent = 'Tafseer could not be loaded.';
    console.error('Tafseer error:', err);
  }
}


// ─────────────────────────────────────────────
// MAIN: LOAD AND DISPLAY THE VERSE
// ─────────────────────────────────────────────

async function loadVerse() {
  const { surah, ayah } = getVerse();
  const arabicEl        = document.getElementById('arabic');
  const transEl         = document.getElementById('translation');
  const refEl           = document.getElementById('ref');
  const selectedEdition = document.getElementById('lang-select').value;

  transEl.innerHTML  = '<span class="dots"><span></span><span></span><span></span></span>';
  arabicEl.innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';

  try {
    const [arabicText, transText] = await Promise.all([
      fetchAyah(surah, ayah, ARABIC_EDITION),
      fetchAyah(surah, ayah, selectedEdition)
    ]);
    arabicEl.textContent = arabicText;
    transEl.textContent  = transText;
    refEl.textContent    = `Surah ${SURAH_NAMES[surah - 1]}  ·  ${surah}:${ayah}`;
    transEl.classList.toggle('urdu', selectedEdition === 'ur.ahmedali');
  } catch (err) {
    arabicEl.textContent = '';
    transEl.textContent  = 'Could not load verse — check your connection.';
    refEl.textContent    = '';
  }
}


// ─────────────────────────────────────────────
// SEARCH BAR
// ─────────────────────────────────────────────

function doSearch(lucky) {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;
  const base = lucky
    ? 'https://www.google.com/search?btnI=1&q='
    : 'https://www.google.com/search?q=';
  window.location.href = base + encodeURIComponent(query);
}

document.getElementById('search-input').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(false); });
document.getElementById('tafseer-btn').addEventListener('click',       toggleTafseer);


// ─────────────────────────────────────────────
// DATE
// ─────────────────────────────────────────────

function updateDate() {
  const now  = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const gregorianMonths = ['January','February','March','April','May','June',
                           'July','August','September','October','November','December'];
  const gregorian = `${days[now.getDay()]}, ${now.getDate()} ${gregorianMonths[now.getMonth()]} ${now.getFullYear()}`;
  let hijri = '';
  try {
    hijri = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).format(now);
  } catch { hijri = ''; }
  const el = document.getElementById('clock');
  el.innerHTML = hijri ? `${gregorian} &nbsp;·&nbsp; ${hijri}` : gregorian;
}


// ─────────────────────────────────────────────
// TAFSEER FONT SIZE
// ─────────────────────────────────────────────

document.getElementById('font-increase').addEventListener('click', () => {
  if (tafseerFontSize >= 20) return;
  tafseerFontSize++;
  document.getElementById('tafseer-panel').style.fontSize = tafseerFontSize + 'px';
});

document.getElementById('font-decrease').addEventListener('click', () => {
  if (tafseerFontSize <= 10) return;
  tafseerFontSize--;
  document.getElementById('tafseer-panel').style.fontSize = tafseerFontSize + 'px';
});



// ─────────────────────────────────────────────
// BACKGROUND IMAGE (uses IndexedDB for large file support)
// ─────────────────────────────────────────────

// IndexedDB can store much larger files than localStorage (hundreds of MB vs ~5MB)
// We open a database called 'quran-ext' with an object store called 'bg'

const DB_NAME    = 'quran-ext';
const DB_VERSION = 1;
const DB_STORE   = 'bg';
const BG_KEY     = 'background';

// Opens (or creates) the IndexedDB database and returns it
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    // Called when the database is first created or upgraded
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE); // simple key-value store
      }
    };

    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
}

// Saves a value to IndexedDB under the given key
async function dbSet(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(DB_STORE, 'readwrite');
    const req = tx.objectStore(DB_STORE).put(value, key);
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
}

// Retrieves a value from IndexedDB by key
async function dbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(DB_STORE, 'readonly');
    const req = tx.objectStore(DB_STORE).get(key);
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
}

// Deletes a value from IndexedDB by key
async function dbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(DB_STORE, 'readwrite');
    const req = tx.objectStore(DB_STORE).delete(key);
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
}

// Applies a base64 image string as the page background
function applyBackground(dataUrl) {
  if (dataUrl) {
    document.body.style.backgroundImage = `url(${dataUrl})`;
    document.body.classList.add('has-bg');
    document.getElementById('bg-remove-btn').classList.add('visible');
  } else {
    document.body.style.backgroundImage = '';
    document.body.classList.remove('has-bg');
    document.getElementById('bg-remove-btn').classList.remove('visible');
  }
}

// Load saved background from IndexedDB on startup
async function initBackground() {
  try {
    const saved = await dbGet(BG_KEY);
    if (saved) applyBackground(saved);
  } catch (e) {
    console.error('Could not load background:', e);
  }
}

// Trigger file picker when button is clicked
document.getElementById('bg-upload-btn').addEventListener('click', () => {
  document.getElementById('bg-file-input').click();
});

// When a file is selected, read it as base64 and save to IndexedDB
document.getElementById('bg-file-input').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function (e) {
    const dataUrl = e.target.result;
    console.log('Image read, length:', dataUrl.length);
    try {
      await dbSet(BG_KEY, dataUrl);
      console.log('Saved to IndexedDB');
    } catch (err) {
      console.error('Could not save background:', err);
    }
    console.log('Applying background...');
    applyBackground(dataUrl);
    console.log('Done. has-bg:', document.body.classList.contains('has-bg'));
  };
  reader.readAsDataURL(file);
});

// Remove button clears the background from IndexedDB and the page
document.getElementById('bg-remove-btn').addEventListener('click', async () => {
  await dbDelete(BG_KEY);
  applyBackground(null);
  document.getElementById('bg-file-input').value = '';
});

initBackground();


// ─────────────────────────────────────────────
// VERSE MODE (daily vs random)
// ─────────────────────────────────────────────

const MODE_KEY = 'quran-ext-mode'; // 'daily' or 'random'

function getVerseMode() {
  return localStorage.getItem(MODE_KEY) || 'daily';
}

// Override getTodayVerse to respect the mode setting
const _origGetTodayVerse = getTodayVerse;
function getVerse() {
  if (getVerseMode() === 'random') {
    // Pure random — new verse every tab open
    const surah = Math.floor(Math.random() * 114) + 1;
    const ayah  = Math.floor(Math.random() * SURAH_LENGTHS[surah - 1]) + 1;
    return { surah, ayah };
  }
  return _origGetTodayVerse();
}

function initVerseMode() {
  const mode = getVerseMode();
  document.getElementById('mode-daily').classList.toggle('active', mode === 'daily');
  document.getElementById('mode-random').classList.toggle('active', mode === 'random');
}

document.getElementById('mode-daily').addEventListener('click', () => {
  localStorage.setItem(MODE_KEY, 'daily');
  initVerseMode();
  loadVerse();
});

document.getElementById('mode-random').addEventListener('click', () => {
  localStorage.setItem(MODE_KEY, 'random');
  initVerseMode();
  loadVerse();
});

initVerseMode();


// ─────────────────────────────────────────────
// PRAYER TIMES
// ─────────────────────────────────────────────

const PRAYER_CITY_KEY = 'quran-ext-prayer-city';
const PRAYER_NAMES    = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const PRAYER_KEYS     = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

// Fetches prayer times from aladhan.com API using lat/lng
async function fetchPrayersByCoords(lat, lng) {
  const today = new Date();
  const date  = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
  const res   = await fetch(`https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=2`);
  if (!res.ok) throw new Error('Failed to fetch');
  const json  = await res.json();
  return json.data.timings;
}

// Fetches prayer times by city name
async function fetchPrayersByCity(city) {
  const today = new Date();
  const date  = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
  const res   = await fetch(`https://api.aladhan.com/v1/timingsByCity/${date}?city=${encodeURIComponent(city)}&country=&method=2`);
  if (!res.ok) throw new Error('City not found');
  const json  = await res.json();
  return json.data.timings;
}

// Works out which prayer is next based on current time
function getNextPrayer(timings) {
  const now   = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  for (const name of PRAYER_KEYS) {
    const [h, m] = timings[name].split(':').map(Number);
    if (h * 60 + m > nowMins) return name;
  }
  return 'Fajr'; // wrap to next day Fajr
}

// Renders prayer times into the panel
function renderPrayers(timings) {
  const list = document.getElementById('prayer-times-list');
  const next = getNextPrayer(timings);
  list.innerHTML = PRAYER_KEYS.map(name => `
    <div class="prayer-row ${name === next ? 'next' : ''}">
      <span class="prayer-row__name">${name}</span>
      <span class="prayer-row__time">${timings[name]}</span>
    </div>
  `).join('');
}

// Main load function — tries auto location first, falls back to saved city
async function loadPrayerTimes(cityOverride) {
  const list = document.getElementById('prayer-times-list');
  list.innerHTML = '<div class="prayer-status">Loading...</div>';

  try {
    let timings;
    if (cityOverride) {
      // User typed a city manually
      localStorage.setItem(PRAYER_CITY_KEY, cityOverride);
      timings = await fetchPrayersByCity(cityOverride);
    } else {
      const savedCity = localStorage.getItem(PRAYER_CITY_KEY);
      if (savedCity) {
        // Use previously saved city
        timings = await fetchPrayersByCity(savedCity);
        document.getElementById('prayer-city-input').value = savedCity;
      } else {
        // Auto-detect using browser geolocation
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
        );
        timings = await fetchPrayersByCoords(pos.coords.latitude, pos.coords.longitude);
      }
    }
    renderPrayers(timings);
  } catch (err) {
    list.innerHTML = '<div class="prayer-status">Could not load. Enter your city below.</div>';
  }
}

// Toggle prayer panel open/close
let prayerLoaded = false;
document.getElementById('prayer-toggle-btn').addEventListener('click', () => {
  const panel = document.getElementById('prayer-panel');
  panel.classList.toggle('open');
  // Only fetch on first open
  if (panel.classList.contains('open') && !prayerLoaded) {
    prayerLoaded = true;
    loadPrayerTimes(null);
  }
});

// ── City autocomplete ──
// Uses Open-Meteo's free geocoding API to search cities by name
// Returns results with city name, country, and coordinates
let autocompleteTimer = null;
let selectedLat = null;
let selectedLng = null;
let selectedCityName = null;

async function searchCities(query) {
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`);
  if (!res.ok) return [];
  const json = await res.json();
  return json.results || [];
}

function showSuggestions(results) {
  const box = document.getElementById('city-suggestions');
  box.innerHTML = '';
  if (!results.length) { box.classList.remove('open'); return; }

  results.forEach(city => {
    const div = document.createElement('div');
    div.className = 'city-suggestion';
    // Show city name + region + country so users can distinguish e.g. London ON vs London UK
    const parts = [city.name, city.admin1, city.country].filter(Boolean);
    div.textContent = parts.join(', ');

    div.addEventListener('click', () => {
      // Store the exact coordinates for this city
      selectedLat      = city.latitude;
      selectedLng      = city.longitude;
      selectedCityName = parts.join(', ');

      document.getElementById('prayer-city-input').value = selectedCityName;
      localStorage.setItem(PRAYER_CITY_KEY, selectedCityName);
      box.classList.remove('open');

      // Fetch prayer times using the exact coordinates
      loadPrayerTimesByCoords(selectedLat, selectedLng);
    });

    box.appendChild(div);
  });
  box.classList.add('open');
}

// Separate fetch function that takes coords directly
async function loadPrayerTimesByCoords(lat, lng) {
  const list = document.getElementById('prayer-times-list');
  list.innerHTML = '<div class="prayer-status">Loading...</div>';
  try {
    const timings = await fetchPrayersByCoords(lat, lng);
    renderPrayers(timings);
  } catch {
    list.innerHTML = '<div class="prayer-status">Could not load prayer times.</div>';
  }
}

// Trigger autocomplete search as user types, with a small delay
document.getElementById('prayer-city-input').addEventListener('input', function () {
  const query = this.value.trim();
  clearTimeout(autocompleteTimer);

  if (query.length < 2) {
    document.getElementById('city-suggestions').classList.remove('open');
    return;
  }

  // Wait 300ms after user stops typing before searching
  autocompleteTimer = setTimeout(async () => {
    const results = await searchCities(query);
    showSuggestions(results);
  }, 300);
});

// Close suggestions if user clicks outside
document.addEventListener('click', e => {
  if (!e.target.closest('.prayer-location')) {
    document.getElementById('city-suggestions').classList.remove('open');
  }
});


// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────

updateDate();
buildShortcuts();
buildDropdown();
loadVerse();