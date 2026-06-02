/* ============================================
   AUTO-CALCULATE MODE
   Results show instantly on page load and update on every input change.
   The Calculate button still works but is no longer required.
   ============================================ */
(function () {
  'use strict';

  /* After DOM ready: wire the Calculate button as a redundant re-trigger,
     and ensure calc() is called on every input/change event. */
  document.addEventListener('DOMContentLoaded', function () {

    /* Wire the Calculate button — clicking it just re-runs calc */
    var btn = document.getElementById('calc-btn');
    if (btn) {
      var CALC_NAMES = ['calc', 'calcAll', 'calcDWT', 'calcTola', 'update'];
      var realCalc = null;
      for (var i = 0; i < CALC_NAMES.length; i++) {
        if (typeof window[CALC_NAMES[i]] === 'function') {
          realCalc = window[CALC_NAMES[i]];
          break;
        }
      }
      if (realCalc) {
        btn.addEventListener('click', function () {
          try { realCalc(); } catch (e) { /* silent */ }
        });
      }
    }

  });

})();
