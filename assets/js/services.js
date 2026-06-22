/* ============================================================
   AquaLayer™ — services.js
   Oxidation diagnostic · surface map · protection timeline.
   All keyboard-operable; reduced-motion safe (CSS handles motion).
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Oxidation diagnostic: pick a level -> recommendation ---------- */
  function initDiagnostic() {
    var group = document.querySelector('[data-diagnostic]');
    if (!group) return;
    var opts = group.querySelectorAll('[data-level]');
    var panels = group.querySelectorAll('[data-level-panel]');
    function select(level) {
      opts.forEach(function (o) {
        var on = o.getAttribute('data-level') === level;
        o.setAttribute('aria-pressed', on ? 'true' : 'false');
        o.classList.toggle('is-active', on);
      });
      panels.forEach(function (p) {
        var on = p.getAttribute('data-level-panel') === level;
        p.hidden = !on;
        if (on) { p.classList.remove('is-visible'); void p.offsetWidth; p.classList.add('is-visible'); }
      });
    }
    opts.forEach(function (o) {
      o.addEventListener('click', function () { select(o.getAttribute('data-level')); });
    });
  }

  /* ---------- Surface map: choose a zone -> reveal its layer ---------- */
  function initSurfaceMap() {
    var map = document.querySelector('[data-surfacemap]');
    if (!map) return;
    var zones = map.querySelectorAll('[data-zone]');
    var details = map.querySelectorAll('[data-zone-detail]');
    var shapes = map.querySelectorAll('[data-zone-shape]');
    function select(zone) {
      zones.forEach(function (z) {
        var on = z.getAttribute('data-zone') === zone;
        z.classList.toggle('is-active', on);
        z.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      shapes.forEach(function (s) { s.classList.toggle('is-active', s.getAttribute('data-zone-shape') === zone); });
      details.forEach(function (d) { d.hidden = d.getAttribute('data-zone-detail') !== zone; });
    }
    zones.forEach(function (z) { z.addEventListener('click', function () { select(z.getAttribute('data-zone')); }); });
    if (shapes.length) shapes.forEach(function (s) {
      s.addEventListener('click', function () { select(s.getAttribute('data-zone-shape')); });
    });
  }

  /* ---------- Protection timeline: wax -> ceramic -> ppf ---------- */
  function initTimeline() {
    var tl = document.querySelector('[data-timeline]');
    if (!tl) return;
    var stops = tl.querySelectorAll('[data-stop]');
    var bar = tl.querySelector('[data-timeline-bar]');
    var fig = tl.querySelector('[data-timeline-figure]');
    var unit = tl.querySelector('[data-timeline-unit]');
    var name = tl.querySelector('[data-timeline-name]');
    var note = tl.querySelector('[data-timeline-note]');
    function select(el) {
      stops.forEach(function (s) {
        var on = s === el;
        s.setAttribute('aria-pressed', on ? 'true' : 'false');
        s.classList.toggle('is-active', on);
      });
      if (bar) bar.style.width = el.getAttribute('data-width');
      if (fig) fig.textContent = el.getAttribute('data-figure');
      if (unit) unit.textContent = el.getAttribute('data-unit') || 'MONTHS';
      if (name) name.textContent = el.getAttribute('data-name');
      if (note) note.textContent = el.getAttribute('data-note') || '';
    }
    stops.forEach(function (s) { s.addEventListener('click', function () { select(s); }); });
  }

  function init() { initDiagnostic(); initSurfaceMap(); initTimeline(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
