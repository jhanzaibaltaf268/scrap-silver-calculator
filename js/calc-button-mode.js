/* ============================================
   AUTO-CALCULATE MODE
   Results show instantly on page load and update on every input change.
   The Calculate button still works as a manual re-trigger.
   ============================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    var btn = document.getElementById('calc-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      /* 1 — Try named global functions first (fastest path) */
      var CALC_NAMES = ['calc', 'calcAll', 'calcDWT', 'calcTola', 'update'];
      for (var i = 0; i < CALC_NAMES.length; i++) {
        if (typeof window[CALC_NAMES[i]] === 'function') {
          try { window[CALC_NAMES[i]](); } catch (e) { /* silent */ }
          return;
        }
      }

      /* 2 — Fallback: fire input + change events on every visible form field.
             This triggers any addEventListener('input', ...) or ('change', ...)
             already attached by the page's own script, regardless of scope. */
      var fields = document.querySelectorAll(
        '.calc-widget input, .calc-widget select, ' +
        '.dash input, .dash select, ' +
        'main input[type="number"], main input[type="text"], main select'
      );
      fields.forEach(function (el) {
        el.dispatchEvent(new Event('input',  { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });

  });

})();
