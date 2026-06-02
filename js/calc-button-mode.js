/* ============================================
   BUTTON-ONLY CALCULATION MODE
   Results are hidden until the user clicks Calculate.
   ============================================ */
(function () {
  'use strict';

  /* ── 1. Hide result elements immediately so auto-calc calls don't flash results ── */
  var _style = document.createElement('style');
  _style.id = '__calc_pending_style';
  _style.textContent =
    '.result-value, #result-value, #rv, .res-val, #total-value, #r-melt { opacity:0!important; transition:none!important }' +
    '.result-detail, .res-det, #rd, #result-detail, .res-meta, #result-meta { opacity:0!important }' +
    '.result-display, .d-res, #swc-results { opacity:0!important }' +
    '#result-best, #result-typical, #rdealer, .res-dealer { opacity:0!important }';
  (document.head || document.documentElement).appendChild(_style);

  /* ── 2. Suppress input/change event auto-calc ── */
  var _origAdd = EventTarget.prototype.addEventListener;

  function isFormEl(el) {
    return el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA');
  }

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (isFormEl(this)) {
      if (type === 'input')  return;          /* suppress — typing never auto-calcs */
      if (type === 'change') return;          /* suppress — changing select never auto-calcs */
    }
    return _origAdd.call(this, type, listener, options);
  };

  /* ── 3. After DOM ready: capture real calc fn, no-op globals, wire button ── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Kill any oninput/onchange set via HTML attributes */
    document.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.oninput  = null;
      el.onchange = null;
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

      /* Fallback: fire input + change events on every form field so any
         locally-scoped listeners still attached will fire */
      var fields = document.querySelectorAll(
        '.calc-widget input, .calc-widget select, ' +
        '.dash input, .dash select, ' +
        'main input[type="number"], main input[type="text"], main select'
      );
      /* Temporarily restore addEventListener so dispatched events work */
      EventTarget.prototype.addEventListener = _origAdd;
      fields.forEach(function (el) {
        el.dispatchEvent(new Event('input',  { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }

    if (btn) {
      _origAdd.call(btn, 'click', runCalc);
    }
  });

})();
