const map = L.map('city-map').setView([-28.5, 25], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const pins = L.layerGroup().addTo(map);
const list = document.getElementById('saved-list');
const card = document.getElementById('rest-card');

function findSpot(key) {
    const parts = key.split('-');
    const cat = parts[0], city = parts[1], index = Number(parts[2]);
    const spot = PLACES[cat] && PLACES[cat][city] && PLACES[cat][city][index];
    return spot ? { spot, city } : null;
}

function showCard(spot, key) {
    map.flyTo(spot.coords, 15);
    renderCard(card, spot, key, draw);
}

function draw() {
    list.innerHTML = '';
    pins.clearLayers();

    const items = getSaved()
        .map(key => ({ key, found: findSpot(key) }))
        .filter(item => item.found);

    // Empty state
    if (!items.length) {
        list.innerHTML = '<li class="state">No saved spots yet. Tap the heart on a spot to save it.</li>';
        return;
    }

    items.forEach(({ key, found }) => {
        const spot = found.spot;

        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.innerHTML = '<strong>' + spot.name + '</strong><small>' + CITY_NAMES[found.city] + ' &middot; ' + spot.type + '</small>';
        btn.addEventListener('click', () => showCard(spot, key));
        li.appendChild(btn);
        list.appendChild(li);

        L.marker(spot.coords)
            .bindTooltip(spot.short)
            .on('click', () => showCard(spot, key))
            .addTo(pins);
    });
}

draw();

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});