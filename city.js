const cities = {
    jhb: {
        name: 'Johannesburg',
        short: 'JHB',
        color: 'goldenrod',
        image: 'images/jhb.jpg',
        text: `Johannesburg the City of Gold, a booming, multicultural metropolis where skyline meets street rhythm and every night promises something louder, warmer, unforgettable. From jazz basements to rooftop parties, Jozi doesn’t just host the show it is the show. Welcome to the city that never sits still.`,
        coords: [-26.2041, 28.0473]
    },
    cpt: {
        name: 'Cape Town',
        short: 'CPT',
        color: 'deepskyblue',
        image: 'images/cpt.jpg',
        text: 'A short description of Cape Town goes here.',
        coords: [-33.9249, 18.4241]
    },
    dbn: {
        name: 'Durban',
        short: 'DBN',
        color: 'limegreen',
        image: 'images/dbn.jpg',
        text: 'A short description of Durban goes here.',
        coords: [-29.8587, 31.0218]
    }
};

const params = new URLSearchParams(window.location.search);
const cityKey = cities[params.get('city')] ? params.get('city') : 'jhb';
const city = cities[cityKey];

document.getElementById('city-title').textContent = city.name;
document.getElementById('panel-text').textContent = city.text;
document.getElementById('panel-image').src = city.image;
document.getElementById('badge-image').src = city.image;
document.getElementById('badge-label').textContent = city.short;
document.getElementById('badge-label').style.color = city.color;

const map = L.map('city-map').setView(city.coords, 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const spots = [
    { name: 'Spot one', note: 'Add your note here.', coords: [city.coords[0] + 0.01, city.coords[1] + 0.01] },
    { name: 'Spot two', note: 'Add your note here.', coords: [city.coords[0] - 0.01, city.coords[1] - 0.01] }
];

spots.forEach(spot => {
    L.marker(spot.coords)
        .addTo(map)
        .bindPopup(`<strong>${spot.name}</strong><br>${spot.note}`);
});

const badge = document.getElementById('city-badge');
const panel = document.getElementById('city-panel');

badge.addEventListener('click', () => {
    panel.classList.toggle('open');
});

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

['food', 'shopping', 'concert'].forEach(cat => {
    document.getElementById(cat + '-btn').addEventListener('click', () => {
        window.location.href = 'food.html?city=' + cityKey + '&cat=' + cat;
    });
});