/* ============================================
   BUTTON-ONLY CALCULATION MODE
   Load AFTER silver-price.js, BEFORE inline page scripts.

   Strategy:
   1. Suppress input/change listeners on form elements (no keystroke auto-calc)
   2. After DOM ready: save real calc fn, replace window.calc with no-op
      so onPriceUpdate callbacks (already registered) call nothing
   3. Clear pre-populated result displays
   4. Wire #calc-btn to the real calc fn
   ============================================ */
(function () {
  'use strict';

  /* ── 1. Suppress form element input/change auto-calc listeners ── */
  var _orig = EventTarget.prototype.addEventListener;
  var SUPPRESS = { input: true, change: true };

  function isFormEl(el) {
    return el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA');
  }

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (SUPPRESS[type] && isFormEl(this)) return;
    return _orig.call(this, type, listener, options);
  };

  /* ── 2–4. After DOM ready (inline scripts have already run) ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Save real calc function before replacing with no-op.
       function declarations become window properties in non-module scripts. */
    var realCalc = window.calc || window.calculate || window.update;

    /* Replace global so any onPriceUpdate callbacks like ()=>calc() become no-ops */
    if (typeof window.calc === 'function')      window.calc      = function () {};
    if (typeof window.calculate === 'function') window.calculate = function () {};
    if (typeof window.update === 'function')    window.update    = function () {};

    /* Clear result displays that were pre-populated by the initial calc() call */
    document.querySelectorAll('.result-value, #result-best, #result-typical').forEach(function (el) {
      el.textContent = '—';
    });
    document.querySelectorAll('.result-detail, .res-meta, #result-meta, #result-melt-detail, #result-scrap-detail').forEach(function (el) {
      el.textContent = '';
    });

    /* Wire #calc-btn to the real function */
    if (typeof realCalc === 'function') {
      var btn = document.getElementById('calc-btn');
      if (btn) {
        btn.addEventListener('click', function () {
          try { realCalc(); } catch (e) { /* silent */ }
        });
      }
    }
  });

})();
