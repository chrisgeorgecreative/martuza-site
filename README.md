# Chris Martuza (Stuzie) — personal site

Editorial navy portfolio. Source is kept split (HTML + `css/` + `js/` +
`partials/`) for easy editing; a build step inlines and minifies everything
into `docs/` for the fastest possible page load on GitHub Pages.

## Structure

```
martuza-site/
├── index.html          # home — hero + selected work
├── about.html          # about — bio, photo, and contact CTA (#contact anchor)
├── contact.html        # redirect stub → about.html#contact (kept so old links work)
├── partials/
│   ├── header.html     # shared header — edit once, changes everywhere
│   └── footer.html     # shared footer — same deal
├── css/styles.css      # all styles (design tokens at the top)
├── js/main.js          # intro fade-in + shared-include loader
├── assets/images/      # case-study visuals go here
├── build.js            # inlines partials + css + js, minifies into docs/
├── package.json
└── docs/               # GENERATED — what GitHub Pages serves (do not edit by hand)
```

## Shared partials (header, footer)

The header and footer each live in one place — `partials/header.html` and
`partials/footer.html`. Each page just has a mount point:

```html
<div data-include="header"></div>
...
<div data-include="footer"></div>
```

- **Local dev:** `js/main.js` fetches the partial and drops it in on page load.
- **Production build:** `build.js` inlines the partial straight into each page,
  so the live site never makes an extra request.

Either way, editing `partials/header.html` updates the header on every page.
The active nav link (`aria-current="page"`) is set automatically based on the
current URL, so you don't hand-mark it per page. To add another shared block,
create `partials/NAME.html`, drop a `<div data-include="NAME"></div>` where you
want it, and add `"NAME"` to the `PARTIALS` list in `build.js`.

## Local development (with live reload)

```
npm install      # first time only
npm run dev
```

Serves the split source and reloads the browser when you save any `.html`,
`.css`, or `.js`. Edit the source files — never `docs/`.

## Build for deploy

```
npm run build
```

Regenerates `docs/` with partials, CSS, and JS inlined and minified into each
page.

## Deploy (GitHub Pages)

1. `npm run build`
2. Commit and push (including the `docs/` folder).
3. Repo **Settings → Pages → Source: Deploy from a branch**, branch `main`,
   folder **`/docs`**.

Serving from `/docs` keeps `index.html` where Pages expects it and avoids the
nested-folder 404 issue.

## Notes

- **Intro fade:** plays once per browsing session. To make it once-ever, swap
  `sessionStorage` for `localStorage` in `js/main.js`. Respects
  `prefers-reduced-motion`.
- **Fonts:** Space Grotesk (headings), DM Sans (body), Cormorant Garamond
  (serif accent) — from Google Fonts.
- **No hamburger:** the two nav links stay visible inline at every width.
- **Case study pages:** each selected work has its own page built from a shared
  template — see `customer-journey-index.html`. To add another: copy that file,
  rename it (e.g. `meter-to-cash-service-blueprint.html`), edit the content,
  point the matching `article.case` "See more" link in `index.html` at it, set
  its "Next case study" link, and add the filename to the `PAGES` list in
  `build.js`. Case-study images go in `assets/images/`; the `.cs-hero` /
  `.cs-figure` placeholders take an `<img>` the same way the About photo does.
