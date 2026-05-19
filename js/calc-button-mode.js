/* ============================================
   BUTTON-ONLY CALCULATION MODE
   Load AFTER silver-price.js, BEFORE inline page scripts.
   ============================================ */
(function () {
  'use strict';

  var _orig = EventTarget.prototype.addEventListener;

  function isFormEl(el) {
    return el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA');
  }

  function clearResults() {
    document.querySelectorAll('.result-value, #result-best, #result-typical').forEach(function (el) {
      el.textContent = '—'; /* em dash */
    });
    document.querySelectorAll('.result-detail, .res-meta, #result-meta, #result-melt-detail, #result-scrap-detail').forEach(function (el) {
      el.textContent = '';
    });
  }

  /* ── Override addEventListener ── */
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (isFormEl(this)) {
      if (type === 'input') return; /* fully suppress — typing never auto-calcs */

      if (type === 'change') {
        /* Wrap change: allow side-effects (show/hide custom purity, value sync)
           but immediately wipe result display so calc result isn't shown */
        var self = this;
        return _orig.call(self, 'change', function (e) {
          listener.call(self, e);
          clearResults();
        }, options);
      }
    }
    return _orig.call(this, type, listener, options);
  };

  /* ── After DOM ready: inline scripts have already executed ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Clear oninput/onchange HTML attribute handlers (bypass addEventListener) */
    document.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.oninput = null;
      el.onchange = null;
    });

    /* All calc function names used across the site */
    var CALC_NAMES = ['calc', 'calcAll', 'calcDWT', 'calcTola', 'update'];
    var realFns = {};
    CALC_NAMES.forEach(function (name) {
      if (typeof window[name] === 'function') {
        realFns[name] = window[name];
        window[name] = function () {}; /* no-op — blocks onPriceUpdate auto-recalc */
      }
    });

    /* Pick the real calc fn for this page (first match wins) */
    var realCalc = realFns.calc || realFns.calcAll || realFns.calcDWT || realFns.calcTola || realFns.update || null;

    /* Clear pre-populated results (default form values caused initial calc() to show results) */
    clearResults();

    /* Wire #calc-btn */
    var btn = document.getElementById('calc-btn');
    if (btn && realCalc) {
      btn.addEventListener('click', function () {
        try { realCalc(); } catch (e) { /* silent */ }
      });
    }
  });

})();
