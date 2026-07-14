// Three-state theme toggle: system → light → dark.
(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme-toggle");
  var order = ["system", "light", "dark"];
  var backgrounds = { light: "#fbfbf9", dark: "#15181b" };

  function current() {
    return root.dataset.theme || "system";
  }

  function apply(theme) {
    if (theme === "system") {
      delete root.dataset.theme;
      localStorage.removeItem("theme");
    } else {
      root.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    }
    var label = "Theme: " + theme;
    button.setAttribute("aria-label", label);
    button.title = label;
    syncThemeColor(theme);
  }

  // Keep the browser-chrome color in step with a manual override.
  function syncThemeColor(theme) {
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach(function (meta) {
        if (theme === "system") {
          meta.content =
            meta.media.indexOf("dark") !== -1
              ? backgrounds.dark
              : backgrounds.light;
        } else {
          meta.content = backgrounds[theme];
        }
      });
  }

  button.addEventListener("click", function () {
    apply(order[(order.indexOf(current()) + 1) % order.length]);
  });

  apply(current());
})();
