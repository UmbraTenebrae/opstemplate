# IT Operations Portal — IIS deployment package

Self-contained landing page (Option C — **Workspace** layout) for the internal
IT Operations Portal. The page is a single offline HTML file: React, Babel,
fonts (IBM Plex Sans / Mono), styles and all components are inlined, so it needs
**no internet access** and **no build step** on the server.

## Contents

| File | Purpose |
|------|---------|
| `index.html` | The portal landing page — fully self-contained (~1.7 MB). |
| `web.config` | IIS settings: default document, MIME types, compression, security headers. |

## Deploy

1. Copy this folder's contents into your IIS site root (e.g. `C:\inetpub\itops`)
   or a virtual directory / application.
2. In **IIS Manager**, point a site or app at that folder. No app pool runtime
   is required — it is served as static content.
3. Browse to the site. `index.html` loads automatically.

No URL Rewrite module is required. HTTPS bindings are recommended but configured
at the site level, not here.

## Features baked in

- **Light / chocolate-dark** theme toggle (top bar); choice persists per browser.
- Colorblind-safe (protanopia-aware) accent + status palette.
- Tool directory: 27 placeholder tools across 6 categories, pinned tools, and
  Grafana metric panels (the chart areas are placeholders that map to real
  Grafana iframe embeds when you wire them up).

## Updating content

The deployed `index.html` is compiled — do not hand-edit it. Edit the source
files in the parent project (`directionC.jsx`, `data.jsx`, `parts.jsx`,
`portal.css`, etc.), re-bundle, and replace `index.html`.

### Wiring real tools & Grafana

- **Tools / categories:** all live in `data.jsx` (`IP_TOOLS`). Swap names,
  descriptions, tags and target URLs there.
- **Grafana:** replace the `MiniArea` placeholder charts in `parts.jsx`
  (`GrafanaPanel` / `GrafanaStat`) with `<iframe>` panel embeds from your
  Grafana instance.
