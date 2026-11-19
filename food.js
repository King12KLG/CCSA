const params = new URLSearchParams(window.location.search);
const cityKey = CITY_DATA[params.get('city')] ? params.get('city') : 'jhb';
const cat = CATEGORIES[params.get('cat')] ? params.get('cat') : 'food';
const city = CITY_DATA[cityKey];

const SPOT_LABELS = { food: 'Food spots', shopping: 'Shopping spots', concert: 'Concert spots' };

document.getElementById('city-title').textContent = CITY_NAMES[cityKey];
document.getElementById('cat-headline').textContent = CATEGORIES[cat].headline;
document.getElementById('food-text').textContent = CATEGORIES[cat].texts[cityKey];
document.getElementById('panel-image').src = city.image;
document.getElementById('spots-label').textContent = SPOT_LABELS[cat];

const map = L.map('city-map').setView(city.coords, 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// All the pins live in one group so they can be shown or hidden together
const pins = L.layerGroup().addTo(map);

PLACES[cat][cityKey].forEach((spot, index) => {
    L.marker(spot.coords)
        .bindTooltip(spot.short)
        .on('click', () => {
            window.location.href = 'restaurant.html?city=' + cityKey + '&cat=' + cat + '&spot=' + index;
        })
        .addTo(pins);
});

const toggle = document.getElementById('spots-toggle');

toggle.addEventListener('click', () => {
    const showing = map.hasLayer(pins);

    if (showing) {
        map.removeLayer(pins);
    } else {
        map.addLayer(pins);
    }

    toggle.setAttribute('aria-pressed', String(!showing));
});

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});