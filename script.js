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
document.getElementById('year').textContent = new Date().getFullYear();

// The download button intentionally remains disabled until a real, tested APK is published.


const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('elvora-site-theme');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    const dark = theme === 'dark';
    themeToggle.innerHTML = dark ? '☀ <span>Light</span>' : '☾ <span>Dark</span>';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#090912' : '#f4f4f4');
}
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('elvora-site-theme', next);
  applyTheme(next);
});
