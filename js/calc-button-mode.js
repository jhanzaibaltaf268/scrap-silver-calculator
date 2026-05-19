/* ============================================
   BUTTON-ONLY CALCULATION MODE
   Load this AFTER silver-price.js, BEFORE inline page scripts.
   Suppresses form element auto-calc events.
   Wires #calc-btn to window.calc or window.calculate.
   ============================================ */
(function () {
  'use strict';

  /* 1. Suppress input/change listeners on form elements */
  var _orig = EventTarget.prototype.addEventListener;
  var SUPPRESS = { input: true, change: true };

  function isFormEl(el) {
    return el && (
      el.tagName === 'INPUT' ||
      el.tagName === 'SELECT' ||
      el.tagName === 'TEXTAREA'
    );
  }

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (SUPPRESS[type] && isFormEl(this)) return; /* drop auto-calc listeners */
    return _orig.call(this, type, listener, options);
  };

  /* 2. Block SilverPrice.onPriceUpdate from registering auto-recalc callbacks.
        This runs synchronously, before inline page scripts call onPriceUpdate. */
  if (typeof SilverPrice !== 'undefined') {
    SilverPrice.onPriceUpdate = function () { /* button-only mode: no auto-recalc */ };
  }

  /* 3. On DOMContentLoaded, wire #calc-btn to window.calc / window.calculate */
  document.addEventListener('DOMContentLoaded', function () {
    var calcFn = window.calc || window.calculate;
    var btn = document.getElementById('calc-btn');
    if (btn && typeof calcFn === 'function') {
      btn.addEventListener('click', function () {
        try { calcFn(); } catch (e) { /* silent */ }
      });
    }
  });

})();
