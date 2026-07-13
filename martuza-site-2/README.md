# Chris Martuza (Stuzie) — personal site

Editorial navy portfolio. Source is kept split (HTML + `css/` + `js/`) for easy
editing; a build step inlines and minifies everything into `docs/` for the
fastest possible page load on GitHub Pages.

## Structure

```
martuza-site/
├── index.html        # home — hero + selected work
├── about.html
├── contact.html
├── css/styles.css    # all styles (design tokens at the top)
├── js/main.js        # intro fade-in (session-scoped)
├── assets/images/    # case-study visuals go here
├── build.js          # inlines + minifies source into docs/
├── package.json
└── docs/             # GENERATED — what GitHub Pages serves (do not edit by hand)
```

## Local development (with live reload)

```
npm install      # first time only
npm run dev
```

This serves the split source files and reloads the browser automatically when
you save any `.html`, `.css`, or `.js`. Edit the files in the root / `css/` /
`js/` — never `docs/`.

## Build for deploy

```
npm run build
```

Regenerates `docs/` with CSS and JS inlined and minified into each page.

## Deploy (GitHub Pages)

1. `npm run build`
2. Commit and push (including the `docs/` folder).
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from
   a branch**, then set the branch to `main` and the folder to **`/docs`**.

Serving from `/docs` keeps `index.html` where Pages expects it and avoids the
nested-folder 404 issue.

## Notes

- **Intro fade:** plays once per browsing session. It runs when someone first
  lands, then stays quiet as they move between pages; it plays again on a fresh
  visit. To make it once-ever instead, swap `sessionStorage` for `localStorage`
  in `js/main.js`. Respects `prefers-reduced-motion`.
- **Fonts:** Space Grotesk (headings), DM Sans (body), Cormorant Garamond
  (serif accent) — loaded from Google Fonts.
- **No hamburger:** the two nav links stay visible inline at every width.
- **Adding a case study:** copy an `article.case` block in `index.html` and
  drop its image into `assets/images/`.
```
