const CITY_NAMES = { jhb: 'Johannesburg', cpt: 'Cape Town', dbn: 'Durban' };

const CITY_DATA = {
    jhb: { image: 'images/jhb.jpg', coords: [-26.2041, 28.0473] },
    cpt: { image: 'images/cpt.jpg', coords: [-33.9249, 18.4241] },
    dbn: { image: 'images/dbn.jpg', coords: [-29.8587, 31.0218] }
};

const CATEGORIES = {
    food: {
        headline: 'Eat the night away with these top 3 recommended food spots!!!',
        texts: {
            jhb: 'The city of gold has all the spots you need for a perfect post concert cravings!!!',
            cpt: 'A short description of Cape Town food goes here.',
            dbn: 'A short description of Durban food goes here.'
        }
    },
    shopping: {
        headline: 'Shop the night away with these top 3 recommended shopping spots!!!',
        texts: {
            jhb: 'The city of gold has all the spots you need for the perfect concert day shopping!!!',
            cpt: 'A short description of Cape Town shopping goes here.',
            dbn: 'A short description of Durban shopping goes here.'
        }
    },
    concert: {
        headline: 'Dance the night away at these top 3 recommended concert venues!!!',
        texts: {
            jhb: 'The city of gold has all the stages you need for an unforgettable night!!!',
            cpt: 'A short description of Cape Town concert venues goes here.',
            dbn: 'A short description of Durban concert venues goes here.'
        }
    }
};

// name, short name, type, rating, description, city, [lat, lng], instagram link, phone number
const place = (name, short, type, rating, blurb, city, coords, instagram = '', phone = '') => ({
    name, short, type, rating, blurb, image: 'images/' + city + '.jpg', coords, instagram, phone
});

const PLACES = {
    food: {
        jhb: [
            place('Hudsons The Burger Joint, Parkhurst', 'Hudsons', 'Restaurant', '4.7', '500+ users rate this as the best burger spot in JOBURG!', 'jhb', [-26.1930, 28.0600]),
            place('Ocaso Rosebank', 'Ocaso', 'Restaurant', '4.5', 'A Rosebank favourite for a post concert bite.', 'jhb', [-26.2100, 28.0350]),
            place('Bembom Linden', 'Bembom', 'Restaurant', '4.4', 'Leading Portuguese restaurant in Linden.', 'jhb', [-26.2150, 28.0650])
        ],
        cpt: [
            place('Cape Town food spot one', 'Spot one', 'Restaurant', '4.5', 'Add your description here.', 'cpt', [-33.9150, 18.4350]),
            place('Cape Town food spot two', 'Spot two', 'Restaurant', '4.5', 'Add your description here.', 'cpt', [-33.9300, 18.4150]),
            place('Cape Town food spot three', 'Spot three', 'Restaurant', '4.5', 'Add your description here.', 'cpt', [-33.9350, 18.4400])
        ],
        dbn: [
            place('Durban food spot one', 'Spot one', 'Restaurant', '4.5', 'Add your description here.', 'dbn', [-29.8450, 31.0300]),
            place('Durban food spot two', 'Spot two', 'Restaurant', '4.5', 'Add your description here.', 'dbn', [-29.8700, 31.0100]),
            place('Durban food spot three', 'Spot three', 'Restaurant', '4.5', 'Add your description here.', 'dbn', [-29.8650, 31.0400])
        ]
    },
    shopping: {
        jhb: [
            place('Sandton City', 'Sandton City', 'Shopping centre', '4.5', 'Add your description here.', 'jhb', [-26.1076, 28.0567]),
            place('Rosebank Mall', 'Rosebank Mall', 'Shopping centre', '4.5', 'Add your description here.', 'jhb', [-26.1458, 28.0436]),
            place('Mall of Africa', 'Mall of Africa', 'Shopping centre', '4.5', 'Add your description here.', 'jhb', [-25.9975, 28.1074])
        ],
        cpt: [
            place('V&A Waterfront', 'V&A Waterfront', 'Shopping centre', '4.5', 'Add your description here.', 'cpt', [-33.9036, 18.4207]),
            place('Canal Walk', 'Canal Walk', 'Shopping centre', '4.5', 'Add your description here.', 'cpt', [-33.8934, 18.5100]),
            place('Cavendish Square', 'Cavendish Square', 'Shopping centre', '4.5', 'Add your description here.', 'cpt', [-33.9795, 18.4686])
        ],
        dbn: [
            place('Gateway Theatre of Shopping', 'Gateway', 'Shopping centre', '4.5', 'Add your description here.', 'dbn', [-29.7266, 31.0658]),
            place('Musgrave Centre', 'Musgrave', 'Shopping centre', '4.5', 'Add your description here.', 'dbn', [-29.8423, 31.0000]),
            place('uShaka Marine World', 'uShaka', 'Shopping and leisure', '4.5', 'Add your description here.', 'dbn', [-29.8683, 31.0453])
        ]
    },
    concert: {
        jhb: [
            place('FNB Stadium', 'FNB Stadium', 'Stadium', '4.8', 'Add your description here.', 'jhb', [-26.2349, 27.9825]),
            place('Ellis Park Stadium', 'Ellis Park', 'Stadium', '4.5', 'Add your description here.', 'jhb', [-26.1975, 28.0608]),
            place('Orlando Stadium', 'Orlando Stadium', 'Stadium', '4.5', 'Add your description here.', 'jhb', [-26.2433, 27.9928])
        ],
        cpt: [
            place('DHL Stadium', 'DHL Stadium', 'Stadium', '4.8', 'Add your description here.', 'cpt', [-33.9033, 18.4112]),
            place('Grand Arena, GrandWest', 'Grand Arena', 'Arena', '4.5', 'Add your description here.', 'cpt', [-33.9078, 18.5547]),
            place('Cape Town International Convention Centre', 'CTICC', 'Venue', '4.5', 'Add your description here.', 'cpt', [-33.9163, 18.4291])
        ],
        dbn: [
            place('Moses Mabhida Stadium', 'Moses Mabhida', 'Stadium', '4.8', 'Add your description here.', 'dbn', [-29.8290, 31.0300]),
            place('Durban ICC', 'Durban ICC', 'Venue', '4.5', 'Add your description here.', 'dbn', [-29.8554, 31.0278]),
            place('Durban Playhouse', 'Playhouse', 'Theatre', '4.5', 'Add your description here.', 'dbn', [-29.8580, 31.0230])
        ]
    }
};