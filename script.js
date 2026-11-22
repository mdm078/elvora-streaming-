const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  const opened = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// The download button intentionally remains disabled until a real, tested APK is published.

// ELVORA theme preference: default to light and persist the user's choice.
const themeToggle = document.getElementById('themeToggle');
const themeStorageKey = 'elvora-site-theme';
function readSavedTheme() {
  try { return localStorage.getItem(themeStorageKey); } catch (_) { return null; }
}
function saveTheme(theme) {
  try { localStorage.setItem(themeStorageKey, theme); } catch (_) { /* storage may be unavailable */ }
}
function applyTheme(theme) {
  const selected = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = selected;
  if (themeToggle) {
    const dark = selected === 'dark';
    const icon = themeToggle.querySelector('.theme-icon');
    const label = themeToggle.querySelector('.theme-label');
    if (icon) icon.textContent = dark ? '☀' : '☾';
    if (label) label.textContent = dark ? 'Light' : 'Dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', selected === 'dark' ? '#090912' : '#f5f5f7');
}
applyTheme(readSavedTheme() || 'light');
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  saveTheme(next);
});
