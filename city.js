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
        text: `Cape Town, the Mother City, a booming, multicultural harbour metropolis where mountain meets ocean rhythm and every night promises something bolder, cooler, unforgettable. From jazz cellars to rooftop sundowners. Welcome to the city where the mountain meets the music.`,
        coords: [-33.9249, 18.4241]
    },
    dbn: {
        name: 'Durban',
        short: 'DBN',
        color: 'limegreen',
        image: 'images/dbn.jpg',
        text: `Durban, the Golden Mile’s own, a sun-soaked, salt-air metropolis where surf culture meets street flavour and every night promises something spicier, sweatier, unforgettable. From beachfront bars to rooftop parties. Welcome to the city that brings the heat.`,
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

// Live weather from the free Open-Meteo API
const weatherBox = document.getElementById('weather-box');

const WEATHER_WORDS = {
    0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Cloudy',
    45: 'Foggy', 48: 'Foggy',
    51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
    61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
    80: 'Showers', 81: 'Showers', 82: 'Heavy showers',
    95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
};

async function loadWeather() {
    // Loading state
    weatherBox.innerHTML = 'Loading tonight\'s weather...';

    try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + city.coords[0] +
            '&longitude=' + city.coords[1] +
            '&current=temperature_2m,precipitation,weather_code&timezone=auto';

        const res = await fetch(url);
        if (!res.ok) throw new Error('Request failed');

        const data = await res.json();
        const now = data.current;

        // Empty state
        if (!now || now.temperature_2m === undefined) {
            weatherBox.innerHTML = 'No weather information is available for ' + city.name + ' right now.';
            return;
        }

        // Success state
        const words = WEATHER_WORDS[now.weather_code] || 'Mild conditions';
        const tip = now.precipitation > 0 ? 'Rain around, pack a jacket.' : 'Looks dry, enjoy the show!';

        weatherBox.innerHTML =
            '<small>' + city.name + ' right now</small>' +
            '<strong>' + Math.round(now.temperature_2m) + '&deg;C</strong>' +
            words + '. ' + tip;
    } catch (err) {
        // Error state with a retry button
        weatherBox.innerHTML =
            '<span class="weather-error">Weather is unavailable right now. Check your connection and try again.</span>' +
            '<br><button type="button" id="weather-retry">Try again</button>';

        document.getElementById('weather-retry').addEventListener('click', loadWeather);
    }
}

loadWeather();

// GSAP timeline: the city page builds itself in sequence once the book has opened
gsap.timeline({ delay: 1.2, defaults: { ease: 'power3.out' } })
    .from('#city-title', { y: -20, opacity: 0, duration: 0.5 })
    .from('#panel-text', { x: -30, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('#panel-image', { scale: 0.9, opacity: 0, duration: 0.6 }, '-=0.2')
    .from('.category-list button', { x: -30, opacity: 0, stagger: 0.12, duration: 0.4 }, '-=0.2')
    .from('.blackbook-link', { y: 20, opacity: 0, duration: 0.4 }, '-=0.1')
    .from('#city-badge', { scale: 0, duration: 0.5, ease: 'back.out(1.7)' });