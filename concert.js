// Which city? From ?city=..., otherwise the last one chosen, otherwise Cape Town
const params = new URLSearchParams(window.location.search);
let cityKey = params.get('city');

if (!CONCERTS[cityKey]) {
    try { cityKey = localStorage.getItem('ccsaCity'); } catch (e) { cityKey = null; }
}
if (!CONCERTS[cityKey]) cityKey = 'cpt';

try { localStorage.setItem('ccsaCity', cityKey); } catch (e) { /* ignore */ }

// Put the city in the address so Share sends the right concert
try { history.replaceState(null, '', '?city=' + cityKey); } catch (e) { /* ignore */ }

const show = CONCERTS[cityKey];

// badge.js reads this to show the right city badge
document.body.dataset.city = cityKey;
document.title = 'CCSA ' + show.artist + ' Concert';

// "Wednesday the 11th of November 2026"
function dateForDescription(str) {
    const d = parseConcertDate(str);
    return DAYS[d.getDay()] + ' the ' + ordinal(d.getDate()) + ' of ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}

// Left panel: always present tense, written for someone going to the show
function describeShow() {
    return 'Tonight on ' + dateForDescription(show.date) + ', ' + show.artist +
        ' is performing at the ' + show.venue + ' in ' + show.cityName + '!!';
}

document.getElementById('concert-text').textContent = describeShow();
document.getElementById('rate-question').textContent =
    'How was your concert experience with ' + show.artist + ' @ ' + show.venueShort + '?';

const exploreLink = document.getElementById('explore-city');
exploreLink.href = 'city.html?city=' + cityKey;
exploreLink.textContent = 'Explore ' + show.cityName;

// Artist photo in the left panel and in the purple card
['concert-photo', 'artist-img'].forEach(id => {
    const img = document.getElementById(id);
    if (!img) return;
    img.alt = show.artist;
    loadPhoto(img, show.photo, 'images/' + cityKey + '.jpg');
});

// Purple box title
document.getElementById('cc-title').textContent =
    'TONIGHT: ' + show.artist.toUpperCase() + ' @ ' + show.venueShort.toUpperCase();

const body = document.getElementById('cc-body');
const tabs = document.querySelectorAll('.cc-tab');

function showTab(name) {
    tabs.forEach(tab => {
        const on = tab.dataset.tab === name;
        tab.classList.toggle('active', on);
        tab.setAttribute('aria-pressed', String(on));
    });

    body.innerHTML = '';

    const heading = document.createElement('strong');

    if (name === 'tips') {
        heading.textContent = 'Concert Tips';
        const ul = document.createElement('ul');
        show.tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            ul.appendChild(li);
        });
        body.append(heading, ul);
    } else if (name === 'artist') {
        heading.textContent = 'Your Artist';
        const p = document.createElement('p');
        p.textContent = show.description;
        body.append(heading, p);
    } else {
        heading.textContent = 'My Concert';
        const p = document.createElement('p');
        p.textContent = concertDateLong(show.date) + ' \u00B7 ' + show.venue + ', ' + show.cityName;
        body.append(heading, p);
    }
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => showTab(tab.dataset.tab));
});

showTab('concert');

// Star rating, kept in this browser. The starting rating counts as 10 earlier
// ratings and the user's own rating is added on top.
const ratingKey = 'ccsaRating-show-' + cityKey;
const starsBox = document.getElementById('stars');
const ratingEl = document.getElementById('cc-rating');
let current = 0;

try { current = Number(localStorage.getItem(ratingKey)) || 0; } catch (e) { current = 0; }

function showRating() {
    const base = Number(show.rating);
    const value = current ? (base * 10 + current) / 11 : base;
    ratingEl.textContent = '\u2605 ' + value.toFixed(1) + '/5';
}

function drawStars() {
    starsBox.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('button');
        star.type = 'button';
        star.textContent = '\u2605';
        star.setAttribute('aria-label', i + ' star' + (i > 1 ? 's' : ''));
        if (i <= current) star.classList.add('on');
        star.addEventListener('click', () => {
            current = i;
            try { localStorage.setItem(ratingKey, i); } catch (e) { /* ignore */ }
            drawStars();
            showRating();
        });
        starsBox.appendChild(star);
    }
}

drawStars();
showRating();

// RATE NOW jumps to the stars in the side panel
document.getElementById('rate-now').addEventListener('click', () => {
    document.getElementById('city-panel').classList.add('open');
    starsBox.scrollIntoView({ block: 'center', behavior: 'smooth' });
    const first = starsBox.querySelector('button');
    if (first) first.focus({ preventScroll: true });
});

// Map: the stadium for the chosen concert
const map = window.L ? L.map('city-map').setView(show.coords, 15) : null;

if (map) {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker(show.coords)
        .addTo(map)
        .bindPopup('<strong>' + show.venue + '</strong><br>' + show.area);
}

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});