# Codex brief — Manipur terminal preview only

## Scope
Repository: `Praddyspinoza/THE-MANIPUR`
Trial URL: `https://praddyspinoza.github.io/THE-MANIPUR/preview/`
**Never edit the root `index.html` or alter the existing production appearance without explicit user approval.** The main terminal's content, officials, evidence sources, routes, and interaction model must remain intact. Work only in preview-specific assets unless a preview dependency strictly requires a change.

## Approved design and functionality
1. **Real subdistrict drilldown:** clicking a district allows access to a second-level interactive subdistrict polygon map, with selectable names, zoom, evidence links, and an official administrative roster. Use legitimate published geographic geometry; *never draw fabricated boundaries or assign invented point locations, risk forecasts, casualties, or violence counts to subdivisions*. Treat district-level records and subdistrict-level geocodes separately. The current preview implementation loads polygons on demand from [Esri India IAB2024 Subdistrict Boundary service](https://livingatlas.esri.in/server/rest/services/IAB2024/IAB_Subdistrict_2024/MapServer/0). If the service cannot be reached, retain the factual roster and show a clear fallback. Compare the GIS subdistrict nomenclature with government **administrative subdivisions**, which may not be perfectly equivalent.
2. **Dark, restrained emerald map:** richer green-black base, defined borders and restrained highlights, avoiding bright game-like neon. Original terminal's other sections retain their styling.
3. **Contextual control rail:** beside the map, place active district, year, layers, subdivision map, timeline controls, ranking, and source/method information. Preserve navigability at mobile widths.
4. **Prominent visible pie chart:** a full labeled, selectable district-share pie ABOVE the map. Synchronize it with active filters and timeline. The chart currently counts *violence-coded, source-indexed district associations*, not total historical violence. A multi-district record can contribute to two district associations; never label it as a comprehensive count of attacks or deaths.
5. **Vaporwave and liquid-chrome treatments:** subtle atmospheric undertone and a few metallic/iridescent effects on small active controls only. Never apply to evidence prose, reports, source references, or entire page backgrounds.
6. **Preserve existing district dossiers:** authorities, MLA/MP names, attributable statements and sources remain accessible; do not replace or dilute existing information.

## Assets included
- `preview/index.html` — standalone preview shell, linked to the enhancements.
- `preview-map.js`, `preview-map.css` — previous animated Manipur district map and officials panels.
- `preview-intelligence.js`, `preview-intelligence.css` — existing research analytics/dossier and official subdivision-name list.
- `preview-upgrade.js`, `preview-upgrade.css` — new enhanced pie, sidebar, darker theme, and dynamic geographic drilldown.
- `index.html` at repository root is intentionally **out of scope**.

## Verification and follow-up
- Verify full JS syntax, all requests, mobile/tablet breakpoints, maps, chart visibility, year slider, pause/play, source links, event cards, official statement panels, and keyboard use.
- Check network/browser CORS behavior for Esri India REST `f=geojson`; if blocked, obtain approved licensable geometry via a static checked-in GeoJSON dataset or an alternative permitted provider. Do not claim a real subdistrict boundary map is functioning until it is verified in browser.
- Compare all **16 district** labels with the source GIS features; handle district renames and aliases without silently misassigning polygons.
- Avoid false heat maps: only explicit, sourced subdistrict records may receive record-count styling. Lack of a match must never be represented as proof of safety.
- Check repeated route navigation and map rerender for duplicate event handlers, MutationObserver loops, flicker, and performance on iPad Safari.
- Keep the evidence-index interpretation of charts prominent. Safeguard source attributions.
- When the preview is verified and accepted, request user approval **before** integrating into production.

## Quick smoke checks for Codex
```sh
node --check preview-map.js
node --check preview-intelligence.js
node --check preview-upgrade.js
git diff --check
```

Note: `node --check` alone does not verify the GIS network service, successful live rendering, or geometry correctness.
