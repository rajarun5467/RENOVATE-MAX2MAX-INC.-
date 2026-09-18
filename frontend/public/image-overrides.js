/**
 * Image Overrides Runtime
 * Fetches override map from backend and applies it to the live website
 * by replacing <img> src and CSS background-image URLs via MutationObserver.
 * Loaded as a plain script in index.html (no module/bundler needed).
 */
(function () {
  var API_BASE = (window.__ADM_API__ || 'http://localhost:5000/api').replace(/\/api$/, '');
  var overrides = {};
  var applied = false;

  function resolveUrl(src) {
    if (!src) return src;
    // Check for override by exact path match
    if (overrides[src]) return overrides[src];
    return src;
  }

  function applyToImg(img) {
    var src = img.getAttribute('src') || '';
    var resolved = resolveUrl(src);
    if (resolved !== src) {
      img.setAttribute('src', resolved);
    }
  }

  function applyToBackground(el) {
    var bg = el.style.backgroundImage || '';
    if (!bg || bg === 'none') return;
    var match = bg.match(/url\(['"]?([^'")]+)['"]?\)/);
    if (!match) return;
    var original = match[1];
    var resolved = resolveUrl(original);
    if (resolved !== original) {
      el.style.backgroundImage = bg.replace(original, resolved);
    }
  }

  function applyAll() {
    document.querySelectorAll('img[src]').forEach(applyToImg);
    document.querySelectorAll('[style*="background-image"]').forEach(applyToBackground);
    // Also check elements with background-image set via CSS classes (harder — skip for now)
  }

  function observe() {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.tagName === 'IMG') applyToImg(node);
          else {
            node.querySelectorAll && node.querySelectorAll('img[src]').forEach(applyToImg);
            node.querySelectorAll && node.querySelectorAll('[style*="background-image"]').forEach(applyToBackground);
          }
        });
        if (m.type === 'attributes' && m.attributeName === 'src' && m.target.tagName === 'IMG') {
          applyToImg(m.target);
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
  }

  function init() {
    if (applied) return;
    applied = true;
    applyAll();
    observe();
  }

  // Fetch overrides from backend
  fetch(API_BASE + '/api/content/image-overrides')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.success && data.data) {
        overrides = data.data;
        if (document.body) init();
        else document.addEventListener('DOMContentLoaded', init);
      }
    })
    .catch(function () { /* backend may be down — use original images */ });
})();
