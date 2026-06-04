/* ============================================
   BUTTON-ONLY CALCULATION MODE
   Results are hidden until the user clicks Calculate.
   Fixed: removed EventTarget monkey-patch that caused Page Unresponsive errors.
   ============================================ */
(function () {
  'use strict';

  /* ── 1. Hide result elements immediately ── */
  var _style = document.createElement('style');
  _style.id = '__calc_pending_style';
  _style.textContent =
    '.result-value, #result-value, #rv, .res-val, #total-value, #r-melt { opacity:0!important; transition:none!important }' +
    '.result-detail, .res-det, #rd, #result-detail, .res-meta, #result-meta { opacity:0!important }' +
    '.result-display, .d-res, #swc-results { opacity:0!important }' +
    '#result-best, #result-typical, #rdealer, .res-dealer { opacity:0!important }';
  (document.head || document.documentElement).appendChild(_style);

  /* ── 2. After DOM ready: capture calc fn, no-op globals, wire button ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Kill any oninput/onchange set via HTML attributes on form fields */
    document.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.oninput  = null;
      el.onchange = null;
    });

    /* Remove input/change listeners added inline via addEventListener
       by replacing each form element with a shallow clone */
    document.querySelectorAll(
      '.calc-widget input, .calc-widget select, ' +
      'main input[type="number"], main input[type="text"], main select'
    ).forEach(function (el) {
      var clone = el.cloneNode(true);
      if (el.parentNode) el.parentNode.replaceChild(clone, el);
    });

    /* Capture all calc-like globals then no-op them so price-update callbacks
       (SilverPrice.onPriceUpdate(() => calc())) don't silently recalculate */
    var CALC_NAMES = ['calc', 'calcAll', 'calcDWT', 'calcTola', 'update'];
    var realCalc = null;
    CALC_NAMES.forEach(function (name) {
      if (typeof window[name] === 'function') {
        if (!realCalc) realCalc = window[name];
        window[name] = function () {};
      }
    });

    /* Wire the Calculate button */
    var btn = document.getElementById('calc-btn');

    function runCalc() {
      /* Remove the opacity block so results become visible */
      var s = document.getElementById('__calc_pending_style');
      if (s) s.remove();

      if (realCalc) {
        try { realCalc(); } catch (e) { /* silent */ }
        return;
      }

      /* Fallback: dispatch events on current form fields */
      document.querySelectorAll(
        '.calc-widget input, .calc-widget select, ' +
        '.dash input, .dash select, ' +
        'main input[type="number"], main input[type="text"], main select'
      ).forEach(function (el) {
        el.dispatchEvent(new Event('input',  { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }

    if (btn) {
      btn.addEventListener('click', runCalc);
    }
  });

})();
