
// API CONFIGURATION


const API_BASE = 'https://api.alquran.cloud/v1/ayah';
const ARABIC_EDITION = 'quran-uthmani';

// tafseerId from api.quran.com/api/v4/resources/tafsirs
// Languages without a native tafseer fall back to English Ibn Kathir (169)
const LANGUAGES = [
  { label: "English",     edition: "en.sahih",       tafseerId: 169 }, // Ibn Kathir (English)
  { label: "Urdu",        edition: "ur.ahmedali",    tafseerId: 160 }, // Ibn Kathir (Urdu)
  { label: "French",      edition: "fr.hamidullah",  tafseerId: 169 }, // fallback English
  { label: "Spanish",     edition: "es.asad",        tafseerId: 169 }, // fallback English
  { label: "German",      edition: "de.bubenheim",   tafseerId: 169 }, // fallback English
  { label: "Turkish",     edition: "tr.diyanet",     tafseerId: 169 }, // fallback English
  { label: "Indonesian",  edition: "id.indonesian",  tafseerId: 169 }, // fallback English
  { label: "Bengali",     edition: "bn.bengali",     tafseerId: 164 }, // Ibn Kathir (Bengali)
  { label: "Russian",     edition: "ru.kuliev",      tafseerId: 170 }, // Al-Sa'di (Russian)
  { label: "Dutch",       edition: "nl.keyzer",      tafseerId: 169 }, // fallback English
  { label: "Bosnian",     edition: "bs.korkut",      tafseerId: 169 }, // fallback English
  { label: "Hindi",       edition: "hi.hindi",       tafseerId: 169 }, // fallback English
  { label: "Swahili",     edition: "sw.barwani",     tafseerId: 169 }, // fallback English
  { label: "Malayalam",   edition: "ml.abdulhameed", tafseerId: 169 }, // fallback English
  { label: "Persian",     edition: "fa.ansarian",    tafseerId: 169 }, // fallback English
];

const STORAGE_KEY     = 'quran-ext-language';
const THEME_KEY       = 'quran-ext-theme';      // stores 'light' or 'dark'


// QURAN DATA


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


// DARK MODE


function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
  // Check for a saved manual preference first
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
    return;
  }
  // Otherwise follow the system preference (prefers-color-scheme)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  // Save manual override so it persists across tabs
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
initTheme();



// SHORTCUTS (chrome.topSites)


function buildShortcuts() {
  // chrome.topSites is only available inside Chrome extensions
  if (!chrome?.topSites) return;

  chrome.topSites.get(sites => {
    const container = document.getElementById('shortcuts');
    // Show up to 8 sites in a 4-column grid (2 rows)
    sites.slice(0, 8).forEach(site => {
      const a = document.createElement('a');
      a.href      = site.url;
      a.className = 'shortcut';

      // Get the favicon via Google's favicon service
      const domain  = new URL(site.url).hostname;
      const iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

      // Truncate long titles to keep the grid tidy
      const title = site.title.length > 12 ? site.title.slice(0, 12) + '…' : site.title;

      a.innerHTML = `
        <div class="shortcut__icon">
          <img src="${iconUrl}" alt="${title}" onerror="this.style.display='none'" />
        </div>
        <span class="shortcut__label">${title}</span>
      `;
      container.appendChild(a);
    });
  });
}


// VERSE SELECTION (date-seeded, stable all day)


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


// 
// API FETCHING
// 

async function fetchAyah(surah, ayah, edition) {
  const res = await fetch(`${API_BASE}/${surah}:${ayah}/${edition}`);
  if (!res.ok) throw new Error(`${res.status}`);
  const json = await res.json();
  return json.data.text;
}


// 
// LANGUAGE DROPDOWN


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



// TAFSEER PANEL


function hideTafseer() {
  const panel = document.getElementById('tafseer-panel');
  const btn   = document.getElementById('tafseer-btn');
  panel.style.display = 'none';
  panel.textContent   = '';
  btn.textContent     = 'Show Tafseer';
}

async function toggleTafseer() {
  const panel = document.getElementById('tafseer-panel');
  const btn   = document.getElementById('tafseer-btn');

  if (panel.style.display === 'block') {
    hideTafseer();
    return;
  }

  panel.style.display = 'block';
  panel.innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';
  btn.textContent = 'Hide Tafseer';

  const { surah, ayah } = getTodayVerse();
  const tafseerID       = getSelectedTafseerID();

  try {
    const res = await fetch(`https://api.quran.com/api/v4/tafsirs/${tafseerID}/by_ayah/${surah}:${ayah}`);
    if (!res.ok) throw new Error(res.status);
    const json = await res.json();
    const raw  = json.tafsir?.text || json.tafsirs?.[0]?.text || '';
    panel.textContent = raw.replace(/<[^>]*>/g, '').trim() || 'No tafseer available for this verse.';
  } catch (err) {
    panel.textContent = 'Tafseer could not be loaded.';
    console.error('Tafseer error:', err);
  }
}


// MAIN: LOAD AND DISPLAY THE VERSE

async function loadVerse() {
  const { surah, ayah } = getTodayVerse();
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

// SEARCH BAR


function doSearch(lucky) {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;
  const base = lucky
    ? 'https://www.google.com/search?btnI=1&q='
    : 'https://www.google.com/search?q=';
  window.location.href = base + encodeURIComponent(query);
}

document.getElementById('search-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch(false);
});
document.getElementById('google-search-btn').addEventListener('click', () => doSearch(false));
document.getElementById('lucky-btn').addEventListener('click',         () => doSearch(true));
document.getElementById('tafseer-btn').addEventListener('click',       toggleTafseer);


// CLOCK

function updateDate() {
  const now  = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const gregorianMonths = ['January','February','March','April','May','June',
                           'July','August','September','October','November','December'];

  // Gregorian date e.g. "Sunday, 15 March 2026"
  const gregorian = `${days[now.getDay()]}, ${now.getDate()} ${gregorianMonths[now.getMonth()]} ${now.getFullYear()}`;

  // Islamic (Hijri) date using the built-in Intl API with islamic-umalqura calendar
  // Same calendar used in Saudi Arabia, widely accepted
  let hijri = '';
  try {
    hijri = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).format(now);
  } catch {
    hijri = '';
  }

  const el = document.getElementById('clock');
  el.innerHTML = hijri ? `${gregorian} &nbsp;·&nbsp; ${hijri}` : gregorian;
}

updateDate();
buildShortcuts();
buildDropdown();
loadVerse();



// COLOUR THEMES


const COLOUR_KEY = 'quran-ext-colour';

function applyColour(colour) {
  // Set or remove data-colour on <html> — 'default' uses the base :root variables
  if (colour && colour !== 'default') {
    document.documentElement.setAttribute('data-colour', colour);
  } else {
    document.documentElement.removeAttribute('data-colour');
  }
}

function initColour() {
  const saved = localStorage.getItem(COLOUR_KEY) || 'default';
  // Restore the dropdown to the saved value
  const select = document.getElementById('colour-select');
  if (select) select.value = saved;
  applyColour(saved);
}

// Save and apply when user picks from the dropdown
document.getElementById('colour-select').addEventListener('change', function () {
  localStorage.setItem(COLOUR_KEY, this.value);
  applyColour(this.value);
});

initColour();