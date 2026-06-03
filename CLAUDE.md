# CLAUDE.md — COSMO Rise Theme

## Project overview

Shopify theme export for **cosmo-jp.lecien.com** (COSMO by Lecien — Japanese embroidery brand, founded 1933 in Kyoto).
Theme: **Rise v15.4.0** by Shopify (Dawn-derived architecture).
Exported: 2026-05-27.

## Directory structure

```
assets/        CSS, JS, SVG — component-*.css for scoped styles, section-*.css for section styles
config/        settings_schema.json (theme settings definitions)
               settings_data.json  (live customised values — edit this for store content)
layout/        theme.liquid (root layout), password.liquid
locales/       i18n strings — en.default.json is source of truth; ja.json for Japanese
sections/      Page sections (.liquid files + header-group.json / footer-group.json)
snippets/      Reusable Liquid partials
templates/     JSON templates (Dawn-style — sections are wired up in JSON)
```

## Key files

| File | Purpose |
|---|---|
| `config/settings_data.json` | Live store settings: brand text, colors, fonts, social links |
| `sections/footer-group.json` | Footer section config: nav heading, newsletter heading |
| `templates/index.json` | Homepage sections: slideshow, multicolumn grids, collection list, FAQ |
| `templates/product.json` | Default product template |
| `templates/product.-2.json` | Alternate product template |
| `layout/theme.liquid` | Root HTML wrapper, loads all CSS/JS |
| `assets/global.js` | Core custom elements and JS utilities |
| `assets/base.css` | Global base styles |
| `locales/en.default.json` | English UI strings (used by `t:` translation keys in Liquid) |

## Architecture notes

- **No build pipeline.** All assets are plain CSS and vanilla JS — edit directly, deploy by uploading to Shopify.
- **JSON templates.** Templates in `templates/` are JSON files referencing sections by type. Section content (headings, text, images) lives in these JSON files, not in Liquid.
- **Translation keys.** Many section settings use `t:sections.foo.name` keys resolved via `locales/`. Hardcoded display text (store-specific copy) lives in `config/settings_data.json` and the template JSON files.
- **Shopify handles in links.** URL paths like `/pages/刺しゅう糸` and collection handles in JSON templates are live Shopify resource identifiers — do not rename them; they point to objects on the store.
- **Color schemes.** Five named schemes (`scheme-1` through `scheme-5`) defined in `settings_data.json`. Sections reference them by name.

## Store content locations

To change visible store text, edit these files:

- **Brand headline / description** → `config/settings_data.json` keys `brand_headline`, `brand_description`
- **Footer nav heading / newsletter text** → `sections/footer-group.json`
- **Homepage section titles, column labels, FAQ** → `templates/index.json`
- **"Recommended" heading on product pages** → `templates/product.json`, `product.-2.json`, `product..json`
- **UI strings** (buttons, labels, errors) → `locales/en.default.json`

## Deployment

Upload changed files via Shopify CLI or the Shopify admin theme editor file upload. There is no CI pipeline.

```bash
# With Shopify CLI (if configured):
shopify theme push --only config/settings_data.json
```
