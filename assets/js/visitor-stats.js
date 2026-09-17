(function () {
  'use strict';

  var config = document.currentScript;
  var host = document.getElementById('visitor-map');
  if (!config || !host) return;

  var status = host.querySelector('.visitor-stats__status');
  status.hidden = false;
  var siteUrl = new URL(config.dataset.siteUrl);

  // Keep localhost and other preview hosts out of the real visitor totals.
  if (window.location.hostname !== siteUrl.hostname) {
    status.textContent = 'Visitor statistics are available on the live website.';
    return;
  }

  var widgetId = config.dataset.widgetId;
  if (!/^[A-Za-z0-9_-]{40,64}$/.test(widgetId)) {
    status.textContent = 'Visitor statistics are not connected yet.';
    return;
  }

  var script = document.createElement('script');
  script.id = 'mapmyvisitors';
  script.async = true;
  script.src = 'https://mapmyvisitors.com/map.js?d=' + encodeURIComponent(widgetId)
    + '&cl=e0e5eb&co=fcfbf9&ct=465261&cmo=c54649&cmn=c54649&w=a&t=tt';

  function showUnavailable() {
    status.textContent = 'Visitor statistics are temporarily unavailable.';
  }

  // Scale the map and its markers together when the viewport becomes narrower.
  // Do not reload the tracking script during resizing, which would add pageviews.
  function fitMap() {
    var map = host.querySelector('.mapmyvisitors-map');
    if (!map) return;
    var originalWidth = parseFloat(map.style.width);
    if (originalWidth > 0) {
      map.style.zoom = Math.min(1, host.clientWidth / originalWidth);
    }
  }

  // The provider loads its data after the script itself has finished loading.
  var observer = new MutationObserver(function () {
    var counter = host.querySelector('.mapmyvisitors-visitors');
    if (counter && /\d/.test(counter.textContent)) {
      status.hidden = true;
      observer.disconnect();
      window.clearTimeout(timeout);
      fitMap();
      if (window.ResizeObserver) {
        new ResizeObserver(fitMap).observe(host);
      } else {
        window.addEventListener('resize', fitMap);
      }
    }
  });
  observer.observe(host, { childList: true, subtree: true, characterData: true });

  var timeout = window.setTimeout(showUnavailable, 20000);
  script.onerror = function () {
    window.clearTimeout(timeout);
    observer.disconnect();
    showUnavailable();
  };
  host.appendChild(script);
})();
