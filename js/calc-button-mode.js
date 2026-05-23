/* ============================================
   BUTTON-ONLY CALCULATION MODE
   Load AFTER silver-price.js, BEFORE inline page scripts.
   ============================================ */
(function () {
  'use strict';

  /* ── 1. Hide result elements immediately via CSS so the initial calc() calls
          that run in inline scripts don't flash results to the user ── */
  var _style = document.createElement('style');
  _style.id = '__calc_pending_style';
  _style.textContent =
    '.result-value,#result-best,#result-typical{opacity:0!important;transition:none!important}' +
    '.result-detail,.res-meta,#result-meta,#result-melt-detail,#result-scrap-detail{opacity:0!important}' +
    '.result-display{opacity:0!important}';
  (document.head || document.documentElement).appendChild(_style);

  /* ── 2. Suppress input-event auto-calc; clear results after change events ── */
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
      if (type === 'input') return; /* suppress — typing never auto-calcs */
      if (type === 'change') {
        /* allow side-effects (show/hide fields) but wipe results after */
        var self = this;
        return _orig.call(self, 'change', function (e) {
          listener.call(self, e);
          clearResults();
        }, options);
      }
    }
    return _orig.call(this, type, listener, options);
  };

  /* ── 3. After DOM ready: capture real calc, no-op the global, wire button ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Kill any oninput/onchange set via HTML attributes */
    document.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.oninput = null;
      el.onchange = null;
    });

    /* Capture all calc function names used across the site, then no-op them.
       This stops SilverPrice.onPriceUpdate(()=>calc()) from doing anything
       when a live price update arrives — the arrow function calls window.calc
       which is now a no-op. */
    var CALC_NAMES = ['calc', 'calcAll', 'calcDWT', 'calcTola', 'update'];
    var realFns = {};
    CALC_NAMES.forEach(function (name) {
      if (typeof window[name] === 'function') {
        realFns[name] = window[name];
        window[name] = function () {};
      }
    });

    var realCalc = realFns.calc || realFns.calcAll || realFns.calcDWT || realFns.calcTola || realFns.update || null;

    /* Set placeholder dashes so the layout shows something before first click */
    clearResults();

    /* Wire the Calculate button */
    var btn = document.getElementById('calc-btn');
    if (btn && realCalc) {
      btn.addEventListener('click', function () {
        /* First click: remove the opacity block so results become visible */
        var s = document.getElementById('__calc_pending_style');
        if (s) s.remove();
        try { realCalc(); } catch (e) { /* silent */ }
      });
    }
  });

})();
