/*
  Intro fade-in — runs once per browsing session.
  Loaded in <head> (before <body> paints) so the initial hidden state is set
  before render: no flash, no flicker. On repeat pages within the same session
  the class is never added, so content appears instantly with no animation.
*/
(function () {
  var KEY = "cm_intro_seen";
  try {
    if (!sessionStorage.getItem(KEY)) {
      document.documentElement.classList.add("intro");
      sessionStorage.setItem(KEY, "1");
    }
  } catch (e) {
    /* Storage unavailable (private mode / blocked): skip the animation so
       content is always visible. Nothing else to do. */
  }
})();
