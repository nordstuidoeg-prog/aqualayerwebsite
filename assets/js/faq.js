/* ============================================================
   AquaLayer™ — faq.js  (accessible accordion; content stays in DOM for FAQPage schema)
   ============================================================ */
(function () {
  'use strict';
  function init() {
    document.querySelectorAll('[data-accordion]').forEach(function (acc) {
      var triggers = acc.querySelectorAll('[data-acc-trigger]');
      triggers.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var open = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', open ? 'false' : 'true');
          var panel = document.getElementById(btn.getAttribute('aria-controls'));
          if (panel) panel.classList.toggle('open', !open);
          btn.closest('[data-acc-item]').classList.toggle('open', !open);
        });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
