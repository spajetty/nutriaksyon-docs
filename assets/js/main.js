// Shared across all documentation pages.
(function () {
  // 1. Highlight the nav link that matches the current page.
  var current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var on = link.getAttribute('href') === current;
    link.classList.toggle('active', on);
    if (on) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  // 2. Subtle shadow on the sticky header once the page scrolls.
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 4); }
  if (header) { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); }

  // 3. Role tabs on features.html (deep link: features.html#admin).
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;

  function select(key, focus) {
    tabs.forEach(function (t) {
      var on = t.dataset.tab === key;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    document.querySelectorAll('[role="tabpanel"]').forEach(function (p) {
      p.hidden = p.id !== 'panel-' + key;
    });
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      select(t.dataset.tab);
      history.replaceState(null, '', '#' + t.dataset.tab);
    });
    t.addEventListener('keydown', function (e) {
      var next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
      if (next === null) return;
      e.preventDefault();
      var target = tabs[(next + tabs.length) % tabs.length];
      select(target.dataset.tab, true);
    });
  });

  var start = location.hash.slice(1);
  select(tabs.some(function (t) { return t.dataset.tab === start; }) ? start : tabs[0].dataset.tab);
})();