/* ============================================================
   AquaLayer™ — site.js  (global, deferred)
   Nav · sticky condense · cursor sheen · scroll reveals · gloss pass
   · depth scroll · the Settle. transform/opacity only; reduced-motion aware.
   ============================================================ */
(function () {
  'use strict';
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var doc = document.documentElement;

  /* ---------- current year in footer ---------- */
  function setYear() {
    var y = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = y; });
  }

  /* ---------- mobile nav overlay ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var overlay = document.getElementById('nav-overlay');
    if (!toggle || !overlay) return;
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      overlay.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    overlay.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && overlay.classList.contains('open')) setOpen(false);
    });
  }

  /* ---------- sticky nav condense (IntersectionObserver sentinel) ---------- */
  function initCondense() {
    var nav = document.querySelector('.site-nav');
    if (!nav) return;
    var sentinel = document.getElementById('nav-sentinel');
    if (sentinel && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        nav.classList.toggle('condensed', !entries[0].isIntersecting);
      }, { rootMargin: '-8px 0px 0px 0px', threshold: 0 }).observe(sentinel);
    } else {
      var onScroll = function () { nav.classList.toggle('condensed', window.scrollY > 24); };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
  }

  /* ---------- scroll reveals + one-shot gloss passes ---------- */
  function initReveal() {
    var targets = document.querySelectorAll('[data-reveal], .gloss');
    if (!('IntersectionObserver' in window) || REDUCE) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          el.classList.add('is-visible');
          // remove will-change hint after the animation has run
          window.setTimeout(function () { el.style.willChange = 'auto'; }, 1100);
          io.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- cursor-reactive sheen (pointer devices only) ---------- */
  function initSheen() {
    if (!FINE || REDUCE) return;
    var els = document.querySelectorAll('.sheen');
    if (!els.length) return;
    els.forEach(function (el) {
      var raf = null, mx = 50, my = 30;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width) * 100;
        my = ((e.clientY - r.top) / r.height) * 100;
        if (raf) return;
        raf = requestAnimationFrame(function () {
          el.style.setProperty('--mx', mx + '%');
          el.style.setProperty('--my', my + '%');
          raf = null;
        });
      });
    });
  }

  /* ---------- depth scroll (imperceptible navy deepening) ---------- */
  function initDepth() {
    if (REDUCE) return;
    var c0 = [10, 22, 32];   // --abyss
    var c1 = [6, 14, 22];    // --abyss-deep
    var ticking = false;
    function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
    function update() {
      var max = document.body.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // descend toward deepest ~0.82, then ease back a touch near the close
      var f = p < 0.82 ? (p / 0.82) : (1 - ((p - 0.82) / 0.18) * 0.45);
      f = Math.max(0, Math.min(1, f)) * 0.9;
      var col = 'rgb(' + lerp(c0[0], c1[0], f) + ',' + lerp(c0[1], c1[1], f) + ',' + lerp(c0[2], c1[2], f) + ')';
      doc.style.setProperty('--depth', col);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- the Settle (home hero, once per session) ---------- */
  function initSettle() {
    var hero = document.querySelector('[data-settle]');
    if (!hero) return;
    if (!doc.classList.contains('settling')) { doc.classList.add('is-settled'); return; }
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { doc.classList.add('is-settled'); });
    });
    try { sessionStorage.setItem('aql_settled', '1'); } catch (e) {}
    window.setTimeout(function () { doc.classList.remove('settling'); }, 2000);
  }

  function init() {
    setYear(); initNav(); initCondense(); initReveal(); initSheen(); initDepth(); initSettle();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
