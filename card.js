function getSaved() {
    try { return JSON.parse(localStorage.getItem('ccsaSaved')) || []; }
    catch (e) { return []; }
}

function toggleSaved(key) {
    let list = getSaved();
    if (list.includes(key)) {
        list = list.filter(k => k !== key);
    } else {
        list.push(key);
    }
    localStorage.setItem('ccsaSaved', JSON.stringify(list));
    return list.includes(key);
}

function getTop() {
    try { return JSON.parse(localStorage.getItem('ccsaTop')) || []; }
    catch (e) { return []; }
}

function toggleTop(key) {
    let list = getTop();
    if (list.includes(key)) {
        list = list.filter(k => k !== key);
    } else {
        list.push(key);
    }
    localStorage.setItem('ccsaTop', JSON.stringify(list));
    return list.includes(key);
}

function topLabel(isTop) {
    return isTop ? '&#9733; Top spot (tap to remove)' : '+ Add as top spot';
}

// The starting rating counts as 10 earlier ratings, and the user's own rating is added on top
function displayRating(spot, key) {
    const mine = Number(localStorage.getItem('ccsaRating-' + key)) || 0;
    const base = Number(spot.rating);

    if (!mine) return base.toFixed(1);

    return ((base * 10 + mine) / 11).toFixed(1);
}

function renderCard(box, spot, key, onChange) {
    const saved = getSaved().includes(key);
    const isTop = getTop().includes(key);
    const directions = 'https://www.google.com/maps/dir/?api=1&destination=' + spot.coords.join(',');

    const insta = spot.instagram
        ? '<a href="' + spot.instagram + '" target="_blank" rel="noopener">Instagram</a>'
        : '<span class="muted">Instagram soon</span>';

    const phone = spot.phone
        ? '<a href="tel:' + spot.phone.replace(/\s/g, '') + '">' + spot.phone + '</a>'
        : '<span class="muted">Phone soon</span>';

    box.hidden = false;
    box.innerHTML =
        '<button type="button" class="save-btn" aria-label="Save spot" aria-pressed="' + saved + '">' + (saved ? '&#9829;' : '&#9825;') + '</button>' +
        '<img class="spot-photo" alt="">' +
        '<div class="rest-card-info"><a href="blackbook.html" class="b-badge small">B</a><p>' + spot.blurb + '</p></div>' +
        '<h2>' + spot.name + '</h2>' +
        '<div class="rest-card-meta"><span>' + spot.type + '</span></div>' +
        '<div class="rest-card-reviews"><span>User reviews</span><span>&#9733; ' + displayRating(spot, key) + '/5 &middot; <button type="button" class="rate-now">RATE NOW</button></span></div>' +
        '<div class="rest-card-links"><a href="' + directions + '" target="_blank" rel="noopener">Directions</a>' + insta + phone + '</div>' +
        '<button type="button" class="top-btn" aria-pressed="' + isTop + '">' + topLabel(isTop) + '</button>';

    loadPhoto(box.querySelector('.spot-photo'), spot.photo, spot.image);

    // RATE NOW jumps to the stars, or opens the spot page if there are no stars on this page
    box.querySelector('.rate-now').addEventListener('click', () => {
        const stars = document.getElementById('stars');

        if (stars) {
            const panel = document.getElementById('city-panel');
            if (panel) panel.classList.add('open');
            stars.scrollIntoView({ block: 'center', behavior: 'smooth' });
            const first = stars.querySelector('button');
            if (first) first.focus({ preventScroll: true });
        } else {
            const p = key.split('-');
            window.location.href = 'restaurant.html?city=' + p[1] + '&cat=' + p[0] + '&spot=' + p[2];
        }
    });

    box.querySelector('.save-btn').addEventListener('click', () => {
        const now = toggleSaved(key);
        const btn = box.querySelector('.save-btn');
        btn.innerHTML = now ? '&#9829;' : '&#9825;';
        btn.setAttribute('aria-pressed', String(now));
        if (onChange) onChange(now);
    });

    box.querySelector('.top-btn').addEventListener('click', () => {
        const now = toggleTop(key);
        const btn = box.querySelector('.top-btn');
        btn.innerHTML = topLabel(now);
        btn.setAttribute('aria-pressed', String(now));
    });
}