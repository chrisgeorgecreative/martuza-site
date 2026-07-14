/*
  Build step: takes the split source (HTML + css/ + js/ + partials/) and
  produces an optimised, deploy-ready copy in docs/.

  For each page it inlines the shared partials, then the CSS and JS, minifies
  everything, and writes a single self-contained HTML file — one request,
  fastest cold load. Source stays split for editing; docs/ is what GitHub
  Pages serves.
*/
const fs = require("fs");
const path = require("path");
const CleanCSS = require("clean-css");
const { minify: minifyJS } = require("terser");
const { minify: minifyHTML } = require("html-minifier-terser");

const ROOT = __dirname;
const OUT = path.join(ROOT, "docs");
const PAGES = ["index.html", "about.html", "contact.html"];
const PARTIALS = ["header"];

function read(p) {
  return fs.readFileSync(path.join(ROOT, p), "utf8");
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function inlinePartials(html) {
  for (const name of PARTIALS) {
    const markup = read(path.join("partials", name + ".html")).trim();
    const slot = new RegExp(
      '<div data-include="' + name + '"></div>'
    );
    html = html.replace(
      slot,
      '<div data-include="' + name + '" data-loaded="1">' + markup + "</div>"
    );
  }
  return html;
}

async function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const cssMin = new CleanCSS({ level: 2 }).minify(read("css/styles.css")).styles;
  const jsResult = await minifyJS(read("js/main.js"));
  const jsMin = jsResult.code;

  for (const page of PAGES) {
    let html = read(page);

    html = inlinePartials(html);
    html = html.replace(
      /<link rel="stylesheet" href="css\/styles\.css">/,
      `<style>${cssMin}</style>`
    );
    html = html.replace(
      /<script src="js\/main\.js"><\/script>/,
      `<script>${jsMin}</script>`
    );

    const out = await minifyHTML(html, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: false,
      minifyJS: false,
      removeRedundantAttributes: true,
      removeAttributeQuotes: false,
      keepClosingSlash: true,
    });

    fs.writeFileSync(path.join(OUT, page), out, "utf8");
    console.log("  built", page, `(${(out.length / 1024).toFixed(1)} kB)`);
  }

  copyDir(path.join(ROOT, "assets"), path.join(OUT, "assets"));
  copyDir(path.join(ROOT, "partials"), path.join(OUT, "partials"));
  fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

  console.log("Build complete -> docs/");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
