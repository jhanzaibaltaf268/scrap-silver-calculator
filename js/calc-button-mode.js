/* ============================================
   BUTTON-ONLY CALCULATION MODE
   Load AFTER silver-price.js, BEFORE inline page scripts.
   ============================================ */
(function () {
  'use strict';

  /* ── Block flag: prevents SilverPrice callbacks from auto-running calc ── */
  window.__calcBlocked = true;

  /* ── Patch SilverPrice.onPriceUpdate NOW (before page scripts register callbacks)
        so every registered callback is wrapped with the block guard.
        UI-only callbacks (ticker) still get their one-time immediate call so
        they can display the initial price. ── */
  if (window.SilverPrice && typeof SilverPrice.onPriceUpdate === 'function') {
    var _origOnPU = SilverPrice.onPriceUpdate.bind(SilverPrice);
    SilverPrice.onPriceUpdate = function (cb) {
      /* Call once immediately so UI components (ticker etc.) initialise */
      try { cb(SilverPrice.getPrice()); } catch (_) {}
      /* Register a guarded version — only fires when user has clicked Calculate */
      _origOnPU(function (price) {
        if (!window.__calcBlocked) cb(price);
      });
    };
  }

  /* ── Override addEventListener to suppress input-triggered auto-calcs ── */
  var _orig = EventTarget.prototype.addEventListener;

  function isFormEl(el) {
    return el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA');
  }

  function clearResults() {
    document.querySelectorAll('.result-value, #result-best, #result-typical').forEach(function (el) {
      el.textContent = '—';
    });
    document.querySelectorAll('.result-detail, .res-meta, #result-meta, #result-melt-detail, #result-scrap-detail').forEach(function (el) {
      el.textContent = '';
    });
  }

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (isFormEl(this)) {
      if (type === 'input') return; /* fully suppress — typing never auto-calcs */

      if (type === 'change') {
        /* Wrap change: allow side-effects (show/hide fields, value sync)
           but immediately wipe results so calc result isn't shown */
        var self = this;
        return _orig.call(self, 'change', function (e) {
          listener.call(self, e);
          clearResults();
        }, options);
      }
    }
    return _orig.call(this, type, listener, options);
  };

  /* ── After DOM ready ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Clear oninput/onchange HTML attribute handlers */
    document.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.oninput = null;
      el.onchange = null;
    });

    /* Capture all calc function names used across the site */
    var CALC_NAMES = ['calc', 'calcAll', 'calcDWT', 'calcTola', 'update'];
    var realFns = {};
    CALC_NAMES.forEach(function (name) {
      if (typeof window[name] === 'function') {
        realFns[name] = window[name];
        window[name] = function () {}; /* no-op — stops any remaining window.calc() calls */
      }
    });

    var realCalc = realFns.calc || realFns.calcAll || realFns.calcDWT || realFns.calcTola || realFns.update || null;

    /* Clear any results that were pre-populated from default form values */
    clearResults();

    /* Wire #calc-btn */
    var btn = document.getElementById('calc-btn');
    if (btn && realCalc) {
      btn.addEventListener('click', function () {
        window.__calcBlocked = false;
        try { realCalc(); } catch (e) { /* silent */ }
        window.__calcBlocked = true;
      });
    }
  });

})();
