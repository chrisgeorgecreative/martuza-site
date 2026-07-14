/*
  main.js — runs on every page.

  1. Intro fade-in (session-scoped). Loaded in <head> before <body> paints so
     the initial hidden state is set before render: no flash. It runs once per
     browsing session, staying quiet as the visitor moves between pages.

  2. Shared includes. Any <div data-include="NAME"></div> is filled from
     partials/NAME.html. In local dev the partial is fetched at load; in the
     production build it is inlined ahead of time (data-loaded="1"), so this
     just skips the fetch. Edit partials/header.html once and it changes
     everywhere.
*/
(function () {
  var KEY = "cm_intro_seen";
  try {
    if (!sessionStorage.getItem(KEY)) {
      document.documentElement.classList.add("intro");
      sessionStorage.setItem(KEY, "1");
    }
  } catch (e) {
    /* storage blocked -> no intro, content stays visible */
  }
})();

function cmMarkActiveNav(scope) {
  var page = location.pathname.split("/").pop() || "index.html";
  var links = (scope || document).querySelectorAll(".nav-links a");
  Array.prototype.forEach.call(links, function (a) {
    if (a.getAttribute("href") === page) {
      a.setAttribute("aria-current", "page");
    }
  });
}

function cmLoadIncludes() {
  var slots = document.querySelectorAll("[data-include]");
  Array.prototype.forEach.call(slots, function (slot) {
    if (slot.getAttribute("data-loaded") === "1" || slot.children.length > 0) {
      cmMarkActiveNav(slot);
      return;
    }
    var name = slot.getAttribute("data-include");
    fetch("partials/" + name + ".html")
      .then(function (r) { return r.text(); })
      .then(function (html) {
        slot.innerHTML = html;
        slot.setAttribute("data-loaded", "1");
        cmMarkActiveNav(slot);
      })
      .catch(function () {
        /* partial missing -> leave slot empty, page still works */
      });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", cmLoadIncludes);
} else {
  cmLoadIncludes();
}
