(function () {
    const panel = document.getElementById('city-panel');
    if (!panel) return;

    document.body.classList.add('has-bar');

    // The signed-up user's photo (saved on the welcome page)
    let photo = '';
    try {
        const user = JSON.parse(localStorage.getItem('ccsaUser'));
        if (user && user.photo) photo = user.photo;
    } catch (e) { /* no saved user yet */ }

    const PROFILE_SVG =
        '<svg viewBox="0 0 48 48" aria-hidden="true">' +
        '<circle cx="24" cy="24" r="24" fill="#e11d1d"/>' +
        '<circle cx="24" cy="19" r="8" fill="#111"/>' +
        '<path d="M8 40c2-9 9-12 16-12s14 3 16 12a24 24 0 0 1-32 0z" fill="#111"/>' +
        '</svg>';

    const HOME_ICON =
        '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3z" fill="#9b4dff"/></svg>';

    // The red circle: the user's photo inside a red ring, or the red silhouette if there is no photo yet
    function profileIcon() {
        if (photo) {
            const ring = document.createElement('span');
            ring.className = 'avatar-ring';
            const img = document.createElement('img');
            img.src = photo;
            img.alt = '';
            ring.appendChild(img);
            return ring;
        }
        const holder = document.createElement('span');
        holder.innerHTML = PROFILE_SVG;
        return holder.firstChild;
    }

    // Which city is this page about?
    const CITY_KEYS = ['jhb', 'cpt', 'dbn'];
    const params = new URLSearchParams(window.location.search);
    const wanted = document.body.dataset.city || params.get('city');
    const cityKey = CITY_KEYS.includes(wanted) ? wanted : null;

    // "My Concert" links on city pages open that city's concert
    if (cityKey) {
        document.querySelectorAll('[data-concert-link], .nav-yellow').forEach(a => {
            a.href = 'concert.html?city=' + cityKey;
        });
    }

    // Photo in the profile page's red circle
    if (photo) {
        document.querySelectorAll('.profile-icon').forEach(old => {
            const fresh = profileIcon();
            fresh.classList.add('profile-icon');
            old.replaceWith(fresh);
        });
    }

    // Bottom bar: zoom buttons, Cities, Profile, Contribute
    if (!document.getElementById('map-bar')) {
        const bar = document.createElement('nav');
        bar.id = 'map-bar';

        const cities = document.createElement('a');
        cities.href = 'index.html';
        cities.className = 'bar-home';
        cities.innerHTML = HOME_ICON + 'Cities';

        const profile = document.createElement('a');
        profile.href = 'profile.html';
        profile.className = 'bar-profile';
        const iconBox = document.createElement('span');
        iconBox.className = 'bar-icon';
        iconBox.appendChild(profileIcon());
        profile.appendChild(iconBox);
        profile.appendChild(document.createTextNode('Profile'));

        const contribute = document.createElement('a');
        contribute.href = 'contribute.html';
        contribute.className = 'bar-contribute';
        contribute.innerHTML = '&#9733; Contribute';

        bar.append(cities, profile, contribute);
        document.body.appendChild(bar);

        // Move the Leaflet zoom buttons into the bar if this page has a map
        if (typeof map !== 'undefined' && map && map.zoomControl) {
            bar.prepend(map.zoomControl.getContainer());
        }
    }

    // Red profile circle in the top right (not on the profile page itself)
    if (!document.body.classList.contains('is-profile') && !document.getElementById('top-profile')) {
        const top = document.createElement('a');
        top.id = 'top-profile';
        top.href = 'profile.html';
        top.setAttribute('aria-label', 'My profile');
        top.appendChild(profileIcon());
        document.body.appendChild(top);
    }

    // City badge that shows or hides the side panel (city.html already has its own)
    if (!document.getElementById('city-badge')) {
        const BADGES = {
            jhb: { short: 'JHB', color: 'goldenrod', image: 'images/jhb.jpg' },
            cpt: { short: 'CPT', color: 'deepskyblue', image: 'images/cpt.jpg' },
            dbn: { short: 'DBN', color: 'limegreen', image: 'images/dbn.jpg' }
        };

        const b = BADGES[cityKey] || BADGES.jhb;

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

    // Small hint next to the badge. It fades after 10 seconds, or as soon as the badge is tapped.
    const badge = document.getElementById('city-badge');
    if (badge && window.ccsaNote) {
        window.ccsaNote('Tap to make the map bigger!', 10, badge);
        badge.addEventListener('click', () => {
            if (window.ccsaHideNote) window.ccsaHideNote();
        });
    }
})();