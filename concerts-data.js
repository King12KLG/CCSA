// One concert per city. Edit the dates, ratings, tips and photo names here.
// Dates are written as YYYY-MM-DD. "photo" is the image name without the ending.

function makeTips(venue) {
    return [
        'Book your ride home before the encore. Thousands of people leave at once and surge pricing can double your fare.',
        'Arrive early. Gates open hours before the show and the queues build fast.',
        'Screenshot your ticket and charge your phone fully before you leave.',
        'Check the bag and entry rules for ' + venue + ' before you leave home.',
        'Tell someone at home your plan for getting back safely.'
    ];
}

// Tries .jpg, .png, .jpeg and .webp, then falls back to the given picture
function loadPhoto(img, base, fallback) {
    const endings = ['jpg', 'png', 'jpeg', 'webp'];
    let i = 0;

    img.onerror = () => {
        i++;
        if (i < endings.length) {
            img.src = 'images/' + base + '.' + endings[i];
        } else {
            img.onerror = null;
            img.src = fallback;
        }
    };

    img.src = 'images/' + base + '.' + endings[0];
}

const CONCERTS = {
    jhb: {
        artist: 'Beyoncé',
        date: '2026-11-11',
        venue: 'FNB Stadium',
        venueShort: 'FNB',
        area: 'Nasrec, Johannesburg',
        cityName: 'Johannesburg',
        cityCode: 'JHB',
        coords: [-26.2349, 27.9825],
        photo: 'beyonce',
        rating: '4.9',
        description: 'Beyoncé, born Beyoncé Knowles in 1981 in Houston, is a singer and songwriter who began as lead vocalist of Destiny’s Child. Her 2003 debut album Dangerously in Love launched her career, and she has since become a global pop and R&B icon with multiple Grammys and numerous chart-topping hits.',
        tips: makeTips('FNB Stadium')
    },
    cpt: {
        artist: 'Drake',
        date: '2027-09-01',
        venue: 'DHL Stadium',
        venueShort: 'DHL',
        area: 'Green Point, Cape Town',
        cityName: 'Cape Town',
        cityCode: 'CPT',
        coords: [-33.9033, 18.4112],
        photo: 'drake',
        rating: '5.0',
        description: 'Drake, born Aubrey Graham in 1986 in Toronto, is a rapper, singer and songwriter who first became known as an actor on Degrassi: The Next Generation. His 2009 mixtape So Far Gone and 2010 debut album Thank Me Later launched his music career, and he has since become one of the biggest hip-hop and R&B stars in the world with multiple Grammys and numerous chart-topping hits.',
        tips: makeTips('DHL Stadium')
    },
    dbn: {
        artist: 'Scorpion Kings',
        date: '2026-08-14',
        venue: 'Moses Mabhida Stadium',
        venueShort: 'Moses Mabhida',
        area: 'Stamford Hill, Durban',
        cityName: 'Durban',
        cityCode: 'DBN',
        coords: [-29.8290, 31.0300],
        photo: 'scorpionkings',
        rating: '4.8',
        description: 'Scorpion Kings, formed on 5 July 2019 in South Africa, is an amapiano duo of DJ Maphorisa and Kabza De Small. Their debut album Scorpion Kings launched the duo’s career, and they have since become global icons of South African amapiano with multiple awards and numerous certified chart-topping hits.',
        tips: makeTips('Moses Mabhida Stadium')
    }
};

// Date helpers
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parseConcertDate(str) {
    const parts = str.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

function ordinal(n) {
    if (n % 100 >= 11 && n % 100 <= 13) return n + 'th';
    return n + (['th', 'st', 'nd', 'rd'][n % 10] || 'th');
}

// "Wednesday 1st September 2027"
function concertDateLong(str) {
    const d = parseConcertDate(str);
    return DAYS[d.getDay()] + ' ' + ordinal(d.getDate()) + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}

// "1 Sep 2027"
function concertDateShort(str) {
    const d = parseConcertDate(str);
    return d.getDate() + ' ' + MONTHS[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear();
}

// 'today', 'future' or 'past'
function concertTiming(str) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = parseConcertDate(str) - today;
    return diff === 0 ? 'today' : diff > 0 ? 'future' : 'past';
}