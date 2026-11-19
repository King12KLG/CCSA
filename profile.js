const map = L.map('city-map').setView([-26.2041, 28.0473], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Fill in the signed-in user's details
const saved = localStorage.getItem('ccsaUser');

if (saved) {
    const user = JSON.parse(saved);

    const nameEl = document.getElementById('profile-name');
    if (nameEl) {
        nameEl.textContent = user.firstName + ' ' + user.lastName + "'s Profile";
    }

    const photoEl = document.getElementById('profile-photo');
    if (photoEl) {
        photoEl.src = user.photo;
    }

    const bookPhoto = document.getElementById('blackbook-photo');
    if (bookPhoto) {
        bookPhoto.src = user.photo;
    }
}