(function () {
    const panel = document.getElementById('city-panel');
    if (!panel) return;

    document.body.classList.add('has-bar');

    const PROFILE_ICON =
        '<svg viewBox="0 0 48 48" aria-hidden="true">' +
        '<circle cx="24" cy="24" r="24" fill="#e11d1d"/>' +
        '<circle cx="24" cy="19" r="8" fill="#111"/>' +
        '<path d="M8 40c2-9 9-12 16-12s14 3 16 12a24 24 0 0 1-32 0z" fill="#111"/>' +
        '</svg>';

    const HOME_ICON =
        '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z" fill="#9b4dff"/></svg>';

    // Bottom bar: zoom buttons, Home, Profile, Contribute
    if (!document.getElementById('map-bar')) {
        const bar = document.createElement('nav');
        bar.id = 'map-bar';
        bar.innerHTML =
            '<a href="index.html" class="bar-home">' + HOME_ICON + 'Home</a>' +
            '<a href="profile.html" class="bar-profile"><span class="bar-icon">' + PROFILE_ICON + '</span>Profile</a>' +
            '<a href="#" class="bar-contribute">&#9733; Contribute</a>';
        document.body.appendChild(bar);

        // Move the Leaflet zoom buttons into the bar if this page has a map
        if (typeof map !== 'undefined' && map && map.zoomControl) {
            bar.prepend(map.zoomControl.getContainer());
        }
    }

    // Red profile symbol in the top right (not on the profile page itself)
    if (!document.body.classList.contains('is-profile') && !document.getElementById('top-profile')) {
        const top = document.createElement('a');
        top.id = 'top-profile';
        top.href = 'profile.html';
        top.setAttribute('aria-label', 'My profile');
        top.innerHTML = PROFILE_ICON;
        document.body.appendChild(top);
    }

    // City badge that shows or hides the side panel (city.html already has its own)
    if (!document.getElementById('city-badge')) {
        const BADGES = {
            jhb: { short: 'JHB', color: 'goldenrod', image: 'images/jhb.jpg' },
            cpt: { short: 'CPT', color: 'deepskyblue', image: 'images/cpt.jpg' },
            dbn: { short: 'DBN', color: 'limegreen', image: 'images/dbn.jpg' }
        };

        // City comes from <body data-city="..."> or ?city=..., otherwise JHB
        const params = new URLSearchParams(window.location.search);
        const wanted = document.body.dataset.city || params.get('city');
        const b = BADGES[wanted] || BADGES.jhb;

        const btn = document.createElement('button');
        btn.id = 'city-badge';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Show or hide the side panel');
        btn.setAttribute('aria-expanded', String(panel.classList.contains('open')));

        const img = document.createElement('img');
        img.src = b.image;
        img.alt = '';

        const label = document.createElement('span');
        label.id = 'badge-label';
        label.textContent = b.short;
        label.style.color = b.color;

        btn.appendChild(img);
        btn.appendChild(label);

        btn.addEventListener('click', () => {
            const open = panel.classList.toggle('open');
            btn.setAttribute('aria-expanded', String(open));
        });

        document.body.appendChild(btn);
    }
})();