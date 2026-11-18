const map = L.map('city-map').setView([-33.9033, 18.4112], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([-33.9033, 18.4112])
    .addTo(map)
    .bindPopup('<strong>DHL Stadium</strong><br>Green Point, Cape Town');

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});