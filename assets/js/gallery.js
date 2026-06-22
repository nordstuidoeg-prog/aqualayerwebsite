/* AquaLayer™ — gallery.js  (filter case studies by service) */
(function () {
  'use strict';
  function init() {
    var bar = document.querySelector('[data-filter-bar]');
    if (!bar) return;
    var btns = bar.querySelectorAll('[data-filter]');
    var cases = document.querySelectorAll('[data-case]');
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b) return;
      var f = b.getAttribute('data-filter');
      btns.forEach(function (x) {
        var on = x === b;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      cases.forEach(function (c) {
        c.hidden = !(f === 'all' || c.getAttribute('data-service') === f);
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
