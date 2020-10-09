if (!canUseWebP()) {
    document.documentElement.className += " no-webp"
}

// detect webp - https://stackoverflow.com/a/27232658/1366033
function canUseWebP() {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }

    // very old browser like IE 8, canvas not supported
    return false;
}




// Fout with Class - https://www.zachleat.com/web/comprehensive-webfonts/#fout-class
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