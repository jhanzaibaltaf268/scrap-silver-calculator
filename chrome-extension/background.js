'use strict';
/* Minimal service worker — keeps the extension alive */
chrome.runtime.onInstalled.addListener(() => {
  console.log('Scrap Silver Calculator extension installed.');
});
