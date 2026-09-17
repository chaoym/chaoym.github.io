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

  function prepareMapViewer() {
    var widget = host.querySelector('#mapmyvisitors-widget');
    var dialog = document.getElementById('visitor-map-dialog');
    var expand = document.querySelector('.visitor-stats__expand');
    var viewport = dialog.querySelector('.visitor-map-dialog__viewport');
    var zoomOut = dialog.querySelector('[data-map-zoom="out"]');
    var zoomIn = dialog.querySelector('[data-map-zoom="in"]');
    var zoomLabel = dialog.querySelector('.visitor-map-dialog__zoom');
    var close = dialog.querySelector('.visitor-map-dialog__close');
    var zoom = 1;
    var snapshot;
    var sourceWidth;
    var returnFocus;

    // The provider wraps its map in an external link. Make it a local control.
    widget.removeAttribute('href');
    widget.removeAttribute('target');
    widget.setAttribute('role', 'button');
    widget.setAttribute('tabindex', '0');
    widget.setAttribute('aria-label', 'Enlarge visitor map');
    widget.setAttribute('aria-haspopup', 'dialog');
    widget.setAttribute('aria-controls', dialog.id);
    expand.hidden = false;

    function resizeSnapshot() {
      if (!dialog.open || !snapshot) return;
      snapshot.style.zoom = viewport.clientWidth / sourceWidth * zoom;
      zoomLabel.textContent = Math.round(zoom * 100) + '%';
      zoomOut.disabled = zoom <= 1;
      zoomIn.disabled = zoom >= 3;
    }

    function openMap(trigger) {
      if (dialog.open) return;
      var map = host.querySelector('.mapmyvisitors-map');
      sourceWidth = parseFloat(map.style.width);
      if (!(sourceWidth > 0)) return;
      // Copy only the already-rendered map, never the script or tracking widget.
      snapshot = map.cloneNode(true);
      snapshot.querySelectorAll('.jvectormap-zoomin, .jvectormap-zoomout, .jvectormap-tip').forEach(function (control) {
        control.remove();
      });
      snapshot.setAttribute('aria-hidden', 'true');
      viewport.replaceChildren(snapshot);
      dialog.querySelector('.visitor-map-dialog__count').textContent = host.querySelector('.mapmyvisitors-visitors').textContent;
      returnFocus = trigger;
      zoom = 1;
      document.body.classList.add('visitor-map-open');
      dialog.showModal();
      resizeSnapshot();
      viewport.scrollTo(0, 0);
    }

    host.addEventListener('click', function (event) {
      if (!widget.contains(event.target)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openMap(widget);
    }, true);
    widget.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openMap(widget);
      }
    });
    expand.addEventListener('click', function () { openMap(expand); });
    close.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) {
      var bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
        dialog.close();
      }
    });
    dialog.addEventListener('close', function () {
      document.body.classList.remove('visitor-map-open');
      viewport.replaceChildren();
      snapshot = null;
      if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
    });
    zoomOut.addEventListener('click', function () {
      zoom = Math.max(1, zoom - 0.5);
      resizeSnapshot();
    });
    zoomIn.addEventListener('click', function () {
      zoom = Math.min(3, zoom + 0.5);
      resizeSnapshot();
    });
    window.addEventListener('resize', resizeSnapshot);
  }

  // The provider loads its data after the script itself has finished loading.
  var observer = new MutationObserver(function () {
    var widget = host.querySelector('#mapmyvisitors-widget');
    if (widget) {
      widget.removeAttribute('href');
      widget.removeAttribute('target');
    }
    var counter = host.querySelector('.mapmyvisitors-visitors');
    if (counter && /\d/.test(counter.textContent) && host.querySelector('.mapmyvisitors-map svg')) {
      status.hidden = true;
      observer.disconnect();
      window.clearTimeout(timeout);
      fitMap();
      prepareMapViewer();
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
