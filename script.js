if (!localStorage.getItem('ccsaUser')) {
    window.location.href = 'welcome.html';
}

const map = L.map('map').setView([-26.2041, 28.0473], 11);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        gsap.from('#sidebar a', {
            x: -40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.15
        });
    }
});

gsap.from('.card', {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    delay: 1.2
});