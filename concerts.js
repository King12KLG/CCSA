const params = new URLSearchParams(window.location.search);
const cityKey = CONCERTS[params.get('city')] ? params.get('city') : 'jhb';
const c = CONCERTS[cityKey];

const list = document.getElementById('concert-list');

const link = document.createElement('a');
link.href = 'concert.html?city=' + cityKey;
link.className = 'concert-option';

const artist = document.createElement('strong');
artist.textContent = c.artist;

const details = document.createElement('span');
details.textContent = concertDateShort(c.date) + ' \u00B7 ' + c.venue + ', ' + c.cityCode;

link.appendChild(artist);
link.appendChild(details);
list.appendChild(link);