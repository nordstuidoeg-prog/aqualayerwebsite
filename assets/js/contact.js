/* ============================================================
   AquaLayer™ — contact.js
   No-backend submit (Web3Forms) + WhatsApp fallback + serif success state.
   TODO: replace the Web3Forms access key in /contact/index.html.
   ============================================================ */
(function () {
  'use strict';
  var WA_NUMBER = '201055990055'; // AquaLayer WhatsApp (NAP — confirm)
  var PLACEHOLDER = 'YOUR_WEB3FORMS_ACCESS_KEY';

  function init() {
    var form = document.getElementById('inspection-form');
    if (!form) return;
    var success = document.querySelector('[data-success]');
    var waLink = document.querySelector('[data-wa-fallback]');
    var keyField = form.querySelector('input[name="access_key"]');
    var vessel = form.querySelector('[name="vessel"]');
    var location = form.querySelector('[name="location"]');
    var statusEl = form.querySelector('[data-form-status]');

    function waMessage() {
      var v = vessel && vessel.value ? vessel.value : 'my vessel';
      var l = location && location.value ? location.value : 'the Red Sea';
      return 'Hello AquaLayer — I would like to book an inspection for ' + v + ' at ' + l + '.';
    }
    function syncWA() {
      if (waLink) waLink.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(waMessage());
    }
    [vessel, location].forEach(function (el) { if (el) el.addEventListener('change', syncWA); });
    syncWA();

    function showSuccess() {
      if (success) {
        form.hidden = true;
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // honeypot
      var hp = form.querySelector('input[name="botcheck"]');
      if (hp && hp.checked) return;
      if (statusEl) statusEl.textContent = 'Sending…';

      var key = keyField ? keyField.value.trim() : '';
      // Pre-key fallback: route the lead to WhatsApp so the form is functional before the key is set.
      if (!key || key === PLACEHOLDER) {
        if (statusEl) statusEl.textContent = '';
        window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(waMessage()), '_blank', 'noopener');
        showSuccess();
        return;
      }

      var data = Object.fromEntries(new FormData(form).entries());
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) { showSuccess(); }
          else { if (statusEl) statusEl.textContent = 'Something went wrong — please WhatsApp or email us.'; }
        })
        .catch(function () {
          if (statusEl) statusEl.textContent = 'Network issue — please WhatsApp or email us.';
        });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
