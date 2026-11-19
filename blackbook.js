const CAT_LABELS = { food: 'Food', shopping: 'Shopping', concert: 'Concerts' };

function getNotes() {
    try { return JSON.parse(localStorage.getItem('ccsaNotes')) || {}; }
    catch (e) { return {}; }
}

function saveNote(key, text) {
    const notes = getNotes();
    notes[key] = text;
    try { localStorage.setItem('ccsaNotes', JSON.stringify(notes)); }
    catch (e) { /* storage full or blocked, ignore */ }
}

// Spot keys look like "food-jhb-1" (category, city, position in the list)
function findSpot(key) {
    const parts = key.split('-');
    const cat = parts[0], city = parts[1], index = Number(parts[2]);
    const spot = PLACES[cat] && PLACES[cat][city] && PLACES[cat][city][index];
    return spot ? { spot, cat, city, index } : null;
}

function spotLink(city, cat, index) {
    return 'restaurant.html?city=' + city + '&cat=' + cat + '&spot=' + index;
}

// Pins on the map for every open section
const pins = map ? L.layerGroup().addTo(map) : null;

function keysForSection(section) {
    if (section.dataset.city) {
        const city = section.dataset.city;
        const keys = [];
        Object.keys(PLACES).forEach(cat => {
            (PLACES[cat][city] || []).forEach((spot, index) => {
                keys.push(cat + '-' + city + '-' + index);
            });
        });
        return keys;
    }
    return getTop();
}

function updatePins() {
    if (!map) return;

    pins.clearLayers();

    const shown = new Set();
    const coords = [];

    document.querySelectorAll('details.acc[open]').forEach(section => {
        keysForSection(section).forEach(key => {
            if (shown.has(key)) return;

            const found = findSpot(key);
            if (!found) return;

            shown.add(key);
            coords.push(found.spot.coords);

            L.marker(found.spot.coords)
                .bindTooltip(found.spot.short)
                .on('click', () => {
                    window.location.href = spotLink(found.city, found.cat, found.index);
                })
                .addTo(pins);
        });
    });

    if (coords.length) {
        // Extra left padding so pins are not hidden behind the side panel
        map.fitBounds(coords, {
            paddingTopLeft: [300, 50],
            paddingBottomRight: [50, 50],
            maxZoom: 14
        });
    }
}

// Top spots
const topList = document.getElementById('top-spots-list');

function drawTopSpots() {
    topList.innerHTML = '';

    const items = getTop()
        .map(key => ({ key, found: findSpot(key) }))
        .filter(item => item.found);

    if (!items.length) {
        topList.innerHTML = '<li class="state">No top spots yet. Open a spot and tap "Add as top spot".</li>';
        return;
    }

    const notes = getNotes();

    items.forEach(({ key, found }) => {
        const spot = found.spot;
        const li = document.createElement('li');

        const link = document.createElement('a');
        link.className = 'top-name';
        link.href = spotLink(found.city, found.cat, found.index);
        link.textContent = spot.name;

        const where = document.createElement('small');
        where.textContent = CITY_NAMES[found.city] + ' \u00B7 ' + spot.type;

        const area = document.createElement('textarea');
        area.rows = 2;
        area.placeholder = 'Add your note about this spot...';
        area.setAttribute('aria-label', 'My note on ' + spot.name);
        area.value = notes[key] || '';
        area.addEventListener('input', () => saveNote(key, area.value));

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'top-remove';
        remove.textContent = 'Remove';
        remove.addEventListener('click', () => {
            toggleTop(key);
            drawTopSpots();
            updatePins();
        });

        li.appendChild(link);
        li.appendChild(where);
        li.appendChild(area);
        li.appendChild(remove);
        topList.appendChild(li);
    });
}

// City sections (JHB, CPT, DBN): every spot for that city, grouped by category
function drawCitySpots() {
    document.querySelectorAll('details[data-city]').forEach(section => {
        const city = section.dataset.city;
        const box = section.querySelector('.city-spots');
        box.innerHTML = '';

        Object.keys(PLACES).forEach(cat => {
            const spots = PLACES[cat][city] || [];
            if (!spots.length) return;

            const heading = document.createElement('h4');
            heading.textContent = CAT_LABELS[cat] || cat;

            const ul = document.createElement('ul');
            ul.className = 'city-list';

            spots.forEach((spot, index) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = spotLink(city, cat, index);

                const name = document.createElement('span');
                name.textContent = spot.name;

                const type = document.createElement('small');
                type.textContent = spot.type;

                a.appendChild(name);
                a.appendChild(type);
                li.appendChild(a);
                ul.appendChild(li);
            });

            box.appendChild(heading);
            box.appendChild(ul);
        });
    });
}

drawTopSpots();
drawCitySpots();

// Show or hide pins whenever a section is opened or closed
document.querySelectorAll('details.acc').forEach(section => {
    section.addEventListener('toggle', updatePins);
});

// Arriving from the profile page via blackbook.html#top-spots
if (location.hash === '#top-spots') {
    const topSection = document.getElementById('top-spots-section');
    if (topSection) {
        topSection.open = true;
        topSection.scrollIntoView();
    }
}