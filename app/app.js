const views = [...document.querySelectorAll('.view')];
const nav = [...document.querySelectorAll('.bottom-nav button')];
const samples = [
  {id:'sample-1',title:'The Midnight Archive',type:'Series',genre:'Mystery · Sample entry',mark:'MA'},
  {id:'sample-2',title:'Beyond the Blue Sky',type:'Anime',genre:'Adventure · Sample entry',mark:'BS'},
  {id:'sample-3',title:'The Last Horizon',type:'Movie',genre:'Science fiction · Sample entry',mark:'LH'},
  {id:'sample-4',title:'Wild Earth',type:'Documentary',genre:'Nature · Sample entry',mark:'WE'}
];
let filter = 'All';
let libraryTab = 'watchlist';
const storageKey = 'elvora-saved';
function readSaved() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return {
      watchlist: Array.isArray(parsed.watchlist) ? parsed.watchlist : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : []
    };
  } catch (_) {
    return {watchlist: [], favorites: []};
  }
}
const saved = readSaved();
function persist() {
  try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (_) {}
}
function showView(id) {
  views.forEach(view => view.classList.toggle('active', view.id === id));
  nav.forEach(button => button.classList.toggle('active', button.dataset.view === id));
  window.scrollTo({top:0, behavior:'smooth'});
  if (id === 'library') renderLibrary();
}
nav.forEach(button => button.addEventListener('click', () => showView(button.dataset.view)));
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => showView(button.dataset.view)));
document.getElementById('profileShortcut')?.addEventListener('click', () => showView('profile'));

function makeTitleCard(item, inLibrary = false) {
  const card = document.createElement('article');
  card.className = 'title-item';
  const poster = document.createElement('div');
  poster.className = 'poster';
  poster.textContent = item.mark;
  const info = document.createElement('div');
  info.className = 'title-info';
  const title = document.createElement('b');
  title.textContent = item.title;
  const meta = document.createElement('p');
  meta.textContent = inLibrary ? item.type : item.type + ' · ' + item.genre;
  info.append(title, meta);
  card.append(poster, info);

  if (inLibrary) {
    const remove = document.createElement('button');
    remove.className = 'save-btn';
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {
      saved[libraryTab] = saved[libraryTab].filter(id => id !== item.id);
      persist();
      renderLibrary();
    });
    card.append(remove);
  } else {
    for (const [listKey, label] of [['watchlist','Watchlist'], ['favorites','Favorite']]) {
      const button = document.createElement('button');
      button.className = 'save-btn';
      button.type = 'button';
      const alreadySaved = saved[listKey].includes(item.id);
      button.textContent = alreadySaved ? '✓ ' + label : '+ ' + label;
      button.setAttribute('aria-pressed', String(alreadySaved));
      button.addEventListener('click', () => {
        saved[listKey] = alreadySaved
          ? saved[listKey].filter(id => id !== item.id)
          : [...saved[listKey], item.id];
        persist();
        renderTitles(document.getElementById('discoverSearch').value);
      });
      card.append(button);
    }
  }
  return card;
}
function renderTitles(query = '') {
  const root = document.getElementById('titleList');
  if (!root) return;
  const normalized = query.trim().toLowerCase();
  const matches = samples.filter(item =>
    (filter === 'All' || item.type === filter) &&
    (item.title + ' ' + item.genre).toLowerCase().includes(normalized)
  );
  root.replaceChildren();
  if (!matches.length) {
    root.className = 'title-list empty-state';
    root.textContent = 'No matching sample titles.';
    return;
  }
  root.className = 'title-list';
  matches.forEach(item => root.append(makeTitleCard(item)));
}
function renderLibrary() {
  const root = document.getElementById('libraryList');
  if (!root) return;
  const items = samples.filter(item => saved[libraryTab].includes(item.id));
  root.replaceChildren();
  if (!items.length) {
    root.className = 'title-list empty-state';
    root.textContent = libraryTab === 'watchlist' ? 'Your watchlist is empty. Save a title from Discover to see it here.' : 'No favorites yet.';
    return;
  }
  root.className = 'title-list';
  items.forEach(item => root.append(makeTitleCard(item, true)));
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('selected', item === button));
  renderTitles(document.getElementById('discoverSearch').value);
}));
document.querySelectorAll('[data-library]').forEach(button => button.addEventListener('click', () => {
  libraryTab = button.dataset.library;
  document.querySelectorAll('[data-library]').forEach(item => item.classList.toggle('selected', item === button));
  renderLibrary();
}));
document.getElementById('discoverSearch')?.addEventListener('input', event => renderTitles(event.target.value));
document.getElementById('homeSearch')?.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    showView('discover');
    const search = document.getElementById('discoverSearch');
    search.value = event.target.value;
    renderTitles(search.value);
  }
});
document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
  const mapping = {Movies:'Movie',Series:'Series',Anime:'Anime',Documentary:'Documentary'};
  showView('discover');
  filter = mapping[button.dataset.category] || 'All';
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('selected', item.dataset.filter === filter));
  renderTitles();
}));
renderTitles();

const themeToggle = document.getElementById('themeToggle');
function applyAppTheme(theme) {
  const selected = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = selected;
  if (themeToggle) {
    themeToggle.textContent = selected === 'dark' ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', selected === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.setAttribute('aria-pressed', String(selected === 'dark'));
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', selected === 'dark' ? '#090909' : '#ffffff');
}
let initialTheme = 'light';
try { initialTheme = localStorage.getItem('elvora-app-theme') || 'light'; } catch (_) {}
applyAppTheme(initialTheme);
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('elvora-app-theme', next); } catch (_) {}
  applyAppTheme(next);
});
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
