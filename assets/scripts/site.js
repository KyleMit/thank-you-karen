// Fout with Class per https://www.zachleat.com/web/comprehensive-webfonts/#fout-class
(function() {

    // Optimization for Repeat Views
    if (sessionStorage.fontsLoadedFoutWithClass) {
        document.documentElement.className += " fonts-loaded";
        return;
    }

    if ("fonts" in document) {
        Promise.all([
            document.fonts.load("1em Noto Sans"),
            document.fonts.load("700 1em Noto Sans"),
            document.fonts.load("italic 1em Noto Sans"),
        ]).then(function() {
            document.documentElement.className += " fonts-loaded";

            // Optimization for Repeat Views
            sessionStorage.fontsLoadedFoutWithClass = true;
        });
    }
})();