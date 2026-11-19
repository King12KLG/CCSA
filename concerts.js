const concerts = {
    jhb: [
        { artist: 'Beyoncé', date: '11/11/2026', venue: 'FNB Stadium, JHB' }
    ],
    cpt: [
        { artist: 'Drake', date: '01/09/2027', venue: 'DHL Stadium, CPT' }
    ],
    dbn: [
        { artist: 'Scorpion Kings', date: '08/14/2026', venue: 'Moses Mabhida Stadium, DBN' }
    ]
};

const params = new URLSearchParams(window.location.search);
const cityKey = concerts[params.get('city')] ? params.get('city') : 'jhb';

const list = document.getElementById('concert-list');

concerts[cityKey].forEach(c => {
    const link = document.createElement('a');
    link.href = 'city.html?city=' + cityKey;
    link.className = 'concert-option';
    link.innerHTML = '<strong>' + c.artist + '</strong><span>' + c.date + ' &middot; ' + c.venue + '</span>';
    list.appendChild(link);
});