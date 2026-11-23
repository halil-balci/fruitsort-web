(function () {
  var STORAGE_KEY = "fruitsort_web_lang";

  function detectInitialLang() {
    try {
      var params = new URLSearchParams(window.location.search);
      var queryLang = params.get("lang");
      if (queryLang === "tr" || queryLang === "en") {
        return queryLang;
      }
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "tr" || saved === "en") {
        return saved;
      }
    } catch (e) {}
    var navLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return navLang.indexOf("tr") === 0 ? "tr" : "en";
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    var blocks = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < blocks.length; i++) {
      var el = blocks[i];
      if (el.getAttribute("data-lang") === lang) {
        el.classList.remove("hidden-lang");
      } else {
        el.classList.add("hidden-lang");
      }
    }

    var buttons = document.querySelectorAll("[data-set-lang]");
    for (var j = 0; j < buttons.length; j++) {
      var btn = buttons[j];
      var isMatch = btn.getAttribute("data-set-lang") === lang;
      btn.classList.toggle("active", isMatch);
      btn.setAttribute("aria-pressed", isMatch ? "true" : "false");
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    var initial = detectInitialLang();
    applyLang(initial);

    var buttons = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (ev) {
        var target = ev.currentTarget.getAttribute("data-set-lang");
        if (target === "en" || target === "tr") {
          applyLang(target);
        }
      });
    }
  });
})();
