const params = new URLSearchParams(window.location.search);
const cityKey = CITY_DATA[params.get('city')] ? params.get('city') : 'jhb';
const cat = CATEGORIES[params.get('cat')] ? params.get('cat') : 'food';
const requested = Number(params.get('spot')) || 0;
const index = PLACES[cat][cityKey][requested] ? requested : 0;
const spot = PLACES[cat][cityKey][index];
const key = cat + '-' + cityKey + '-' + index;
const card = document.getElementById('rest-card');

document.getElementById('city-title').textContent = CITY_NAMES[cityKey];
document.getElementById('rest-photo').src = CITY_DATA[cityKey].image;
document.getElementById('rest-blurb').textContent = spot.blurb;
document.getElementById('rate-question').textContent = 'What is your rating of ' + spot.name + '?';

renderCard(card, spot, key);

// Map
const map = L.map('city-map').setView(spot.coords, 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker(spot.coords).addTo(map).bindTooltip(spot.short).openTooltip();

// Star rating, kept in this browser. It also updates the rating in the pink box.
const ratingKey = 'ccsaRating-' + key;
const starsBox = document.getElementById('stars');
let current = Number(localStorage.getItem(ratingKey)) || 0;

function drawStars() {
    starsBox.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('button');
        star.type = 'button';
        star.textContent = '★';
        star.setAttribute('aria-label', i + ' star' + (i > 1 ? 's' : ''));
        if (i <= current) star.classList.add('on');
        star.addEventListener('click', () => {
            current = i;
            localStorage.setItem(ratingKey, i);
            drawStars();
            renderCard(card, spot, key);
        });
        starsBox.appendChild(star);
    }
}

drawStars();

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});