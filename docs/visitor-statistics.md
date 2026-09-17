# Visitor statistics

The integration uses MapMyVisitors for a shared total pageview counter
and world map with red visitor markers on Home, Pubs, and Awards.

## Configuration

The owner supplied this site's widget code on September 17, 2026. The public
widget identifier is configured in `_config.yml` → `visitor_stats.widget_id`.
All pages must share this identifier; never substitute a demo identifier or
another site's statistics. `started_on` records when counting was enabled here.

Set `enabled: false` to remove the map and stop loading the tracking widget.
The optional `stats_url` adds a separate details link when configured. Account
access and provider settings remain with the website owner at
https://mapmyvisitors.com/b/login.

## Behavior

- The same widget identifier is used once on each page, accumulating a site-wide total.
- The loader checks the browser hostname against `site.url` before making any
  tracking requests, excluding localhost and preview hosts from real counts.
- Map locations are approximate IP-derived locations, not GPS positions.
- Missing or blocked external data is shown as unavailable, never as a fabricated zero.
- JavaScript-disabled browsers receive explanatory text rather than a loading indicator.
- An empty Google Analytics ID no longer loads an unconfigured Google tracker.

## Provider parameters verified on 2026-09-17

The public official example at https://mapmyvisitors.com/ uses `map.js` with
script element ID `mapmyvisitors`. Its script supports `w=a` for container width,
`co` for background, `cl` for land, and `ct` for counter text.

The provider's own demo response confirmed:

- `t=tt` renders **Total Pageviews**.
- `cmo=c54649` and `cmn=c54649` set old, recent, and initial marker colors to red.
- The counter text is rendered in `.mapmyvisitors-visitors` after an asynchronous
  data request; loading completion is observed rather than inferred from script load.

Colors match the current site: warm white `fcfbf9`, pale blue-gray `e0e5eb`, text
`465261`, and red markers `c54649`.
