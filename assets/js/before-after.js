/* ============================================================
   AquaLayer™ — before-after.js
   Draggable gloss-reveal (signature moment #5). Pointer + keyboard.
   Component ships now with CSS-rendered surface states; real same-vessel
   image pairs drop into .ba__media later (Addendum 18).
   ============================================================ */
(function () {
  'use strict';
  function initBA(root) {
    var grip = root.querySelector('[data-ba-grip]');
    var live = root.querySelector('[data-ba-live]');
    if (!grip) return;
    var val = parseFloat(root.style.getPropertyValue('--reveal')) || 50;

    function set(v, announce) {
      val = Math.max(2, Math.min(98, v));
      root.style.setProperty('--reveal', val + '%');
      grip.setAttribute('aria-valuenow', Math.round(val));
      if (announce && live) live.textContent = Math.round(val) + '% protected surface revealed';
    }

    var dragging = false;
    function fromEvent(clientX) {
      var r = root.getBoundingClientRect();
      set(((clientX - r.left) / r.width) * 100, false);
    }
    root.addEventListener('pointerdown', function (e) {
      dragging = true; root.setPointerCapture && root.setPointerCapture(e.pointerId);
      root.classList.add('is-grabbing'); fromEvent(e.clientX); e.preventDefault();
    });
    root.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e.clientX); });
    function end() { if (dragging) { dragging = false; root.classList.remove('is-grabbing'); set(val, true); } }
    root.addEventListener('pointerup', end);
    root.addEventListener('pointercancel', end);
    window.addEventListener('pointerup', end);

    grip.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 10 : 2, handled = true;
      switch (e.key) {
        case 'ArrowLeft': case 'ArrowDown': set(val - step, true); break;
        case 'ArrowRight': case 'ArrowUp': set(val + step, true); break;
        case 'Home': set(2, true); break;
        case 'End': set(98, true); break;
        case 'PageUp': set(val + 10, true); break;
        case 'PageDown': set(val - 10, true); break;
        default: handled = false;
      }
      if (handled) e.preventDefault();
    });

    set(val, false);
  }
  function init() { document.querySelectorAll('[data-ba]').forEach(initBA); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
