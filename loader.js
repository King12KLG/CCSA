(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let leaving = false;

    function buildLoader(text) {
        const el = document.createElement('div');
        el.id = 'book-loader';
        el.setAttribute('aria-hidden', 'true');
        el.innerHTML =
            '<div class="book">' +
                '<div class="book-pages"><span></span><span></span><span></span><span></span></div>' +
                '<div class="book-cover">' +
                    '<div class="cover-front"><strong>CCSA</strong><small>Concerts Company<br>South Africa</small></div>' +
                    '<div class="cover-inside"></div>' +
                '</div>' +
            '</div>' +
            '<p class="book-text">' + text + '</p>';
        return el;
    }

    // Opening: the book starts closed, opens, then fades away
    if (!reduce) {
        const loader = buildLoader('Opening your night...');
        document.body.prepend(loader);

        setTimeout(() => loader.classList.add('open'), 250);
        setTimeout(() => loader.classList.add('hide'), 1250);
        setTimeout(() => loader.remove(), 1800);
    }

    // Closing: when a link to another page is tapped, the book closes first
    document.addEventListener('click', (e) => {
        if (reduce || leaving || e.defaultPrevented) return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const link = e.target.closest('a[href]');
        if (!link) return;
        if (link.target === '_blank' || link.hasAttribute('download')) return;

        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) return;
        if (link.origin !== window.location.origin) return;
        if (link.pathname === window.location.pathname && link.search === window.location.search) return;

        e.preventDefault();
        leaving = true;

        const loader = buildLoader('See you at the show...');
        loader.classList.add('open', 'hide');
        document.body.prepend(loader);

        // Fade in with the book open, then close it
        void loader.offsetWidth;
        loader.classList.remove('hide');
        setTimeout(() => loader.classList.remove('open'), 250);
        setTimeout(() => { window.location.href = link.href; }, 1100);
    });

    // Coming back with the browser's Back button
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            leaving = false;
            const old = document.getElementById('book-loader');
            if (old) old.remove();
        }
    });
})();