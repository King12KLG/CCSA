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
            cpt: 'The mother city has all the spots you need for a perfect post concert cravings!!!',
            dbn: 'South Africa’s Playground has all the spots you need for a perfect post concert cravings!!!'
        }
    },
    shopping: {
        headline: 'Shop the night away with these top 3 recommended shopping spots!!!',
        texts: {
            jhb: 'The city of gold has all the spots you need for the perfect concert day shopping!!!',
            cpt: 'The mother city has all the spots you need for the perfect concert day shopping!!!',
            dbn: 'South Africa’s Playground has all the spots you need for the perfect concert day shopping!!!'
        }
    },
    concert: {
        headline: 'Dance the night away at these top 3 recommended concert venues!!!',
        texts: {
            jhb: 'The city of gold has all the stages you need for an unforgettable night!!!',
            cpt: 'The mother city has all the stages you need for an unforgettable night!!!',
            dbn: 'South Africa’s Playground has all the stages you need for an unforgettable night!!!'
        }
    }
};

// Photo file names (without the ending) for each place
const PHOTOS = {
    'Hudsons The Burger Joint, Parkhurst': 'hudsons',
    'Ocaso Rosebank': 'ocaso',
    'Bembom Linden': 'bembom',
    'Mama Africa Restaurant & Bar': 'mama-africa',
    'The Pot Luck Club': 'pot-luck-club',
    'Truth Coffee Roasting': 'truth-coffee',
    'Joe Cools': 'joe-cools',
    'Moyo uShaka Pier': 'moyo-ushaka',
    'Victoria Street Market': 'victoria-street-market',
    'Sandton City': 'sandton-city',
    'Rosebank Mall': 'rosebank-mall',
    'Mall of Africa': 'mall-of-africa',
    'V&A Waterfront': 'va-waterfront',
    'Canal Walk': 'canal-walk',
    'Cavendish Square': 'cavendish',
    'Gateway Theatre of Shopping': 'gateway',
    'Musgrave Centre': 'musgrave',
    'uShaka Marine World': 'ushaka',
    'FNB Stadium': 'fnb',
    'Ellis Park Stadium': 'ellis-park',
    'Orlando Stadium': 'orlando',
    'DHL Stadium': 'dhl',
    'Grand Arena, GrandWest': 'grand-arena',
    'Cape Town International Convention Centre': 'cticc',
    'Moses Mabhida Stadium': 'moses-mabhida',
    'Durban ICC': 'durban-icc',
    'Durban Playhouse': 'durban-playhouse'
};

// Tries .jpg, .png, .jpeg and .webp, then falls back to the city sketch
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

// name, short name, type, rating, description, city, [lat, lng], instagram link, phone number
const place = (name, short, type, rating, blurb, city, coords, instagram = '', phone = '') => ({
    name, short, type, rating, blurb, image: 'images/' + city + '.jpg', photo: PHOTOS[name] || city, coords, instagram, phone
});

const PLACES = {
    food: {
        jhb: [
            place('Hudsons The Burger Joint, Parkhurst', 'Hudsons', 'Restaurant', '4.7', 'An American-inspired burger joint with over-the-top milkshakes, craft beer and a lively pavement setting, great for casual dinners, groups and after-work drinks.', 'jhb', [-26.1417, 28.0156]),
            place('Ocaso Rosebank', 'Ocaso', 'Restaurant', '4.5', 'A Mexican-inspired cocktail and dining spot in Oxford Parks, built for golden-hour sunsets and sultry nights—ideal for group dinners, bar-side drinks or a sunset date night.', 'jhb', [-26.1443, 28.0402]),
            place('Bembom Linden', 'Bembom', 'Restaurant', '4.4', 'A much-loved Portuguese café serving crafted coffees, freshly baked pastries and authentic meals from breakfast to lunch—cosy, casual and perfect for a relaxed catch-up.', 'jhb', [-26.1306, 27.9899])
        ],
        cpt: [
            place('Mama Africa Restaurant & Bar', 'Mama Africa', 'Restaurant', '4.5', 'A Long Street favourite serving African-inspired dishes in a colourful, lively setting with live music, perfect for a big group dinner or a late night out in the city centre.', 'cpt', [-33.9262, 18.4152]),
            place('The Pot Luck Club', 'Pot Luck Club', 'Restaurant', '4.6', 'A creative small-plates restaurant at the Old Biscuit Mill in Woodstock, known for sharing-style dishes and city views. Great for a stylish dinner before or after the show.', 'cpt', [-33.9275, 18.4576]),
            place('Truth Coffee Roasting', 'Truth Coffee', 'Café', '4.5', 'A steampunk-style coffee roastery in the city centre, serving expertly crafted coffee, cakes and light meals. A great pit stop before a long concert day.', 'cpt', [-33.9294, 18.4285])
        ],
        dbn: [
            place('Joe Cools', 'Joe Cools', 'Restaurant and bar', '4.4', 'A laid-back beachfront favourite on Durban’s Marine Parade, with a casual menu, cold drinks and an easygoing vibe that suits groups and relaxed post concert catch-ups.', 'dbn', [-29.8532, 31.0470]),
            place('Moyo uShaka Pier', 'Moyo uShaka', 'Restaurant', '4.5', 'A pier-side restaurant with African-inspired food and ocean views on the Golden Mile, ideal for a sunset dinner before heading to the stadium.', 'dbn', [-29.8689, 31.0477]),
            place('Victoria Street Market', 'Victoria Market', 'Market', '4.3', 'A busy central Durban market where spice stalls and street food showcase the city’s Indian-influenced flavours. A must for curry and bunny chow lovers.', 'dbn', [-29.8566, 31.0245])
        ]
    },
    shopping: {
        jhb: [
            place('Sandton City', 'Sandton City', 'Shopping centre', '4.5', 'Africa’s most iconic shopping centre, home to 370+ luxury and international brands in the heart of Sandton, Africa’s richest square mile. Glamorous retail therapy with world-class dining under one roof.', 'jhb', [-26.1076, 28.0567]),
            place('Rosebank Mall', 'Rosebank Mall', 'Shopping centre', '4.5', 'A multi-level Rosebank favourite mixing high-street fashion, art-house cinema and smart coffee bars—plus a legendary rooftop Sunday market for local crafts and food.', 'jhb', [-26.1458, 28.0436]),
            place('Mall of Africa', 'Mall of Africa', 'Shopping centre', '4.5', 'Africa’s largest single-phase mall, with 300+ stores spanning international luxury, local designers and flagship fashion, a visually striking retail destination in Midrand.', 'jhb', [-25.9975, 28.1074])
        ],
        cpt: [
            place('V&A Waterfront', 'V&A Waterfront', 'Shopping centre', '4.5', 'Africa’s most visited destination, where a working harbour meets Table Mountain views, 500+ shops, museums and waterfront restaurants, a full-day Cape Town essential.', 'cpt', [-33.9036, 18.4207]),
            place('Canal Walk', 'Canal Walk', 'Shopping centre', '4.5', 'Cape Town’s biggest mall, with 400+ stores, a Nu Metro cinema and Cape Venetian architecture in Century City. One-stop shopping, dining and entertainment.', 'cpt', [-33.8934, 18.5100]),
            place('Cavendish Square', 'Cavendish Square', 'Shopping centre', '4.5', 'A Claremont institution with 190+ stores, elite boutiques and a Nu Metro cinema—polished Southern Suburbs shopping with a strong food and fashion mix.', 'cpt', [-33.9795, 18.4686])
        ],
        dbn: [
            place('Gateway Theatre of Shopping', 'Gateway', 'Shopping centre', '4.5', 'Durban’s entertainment mega-mall in Umhlanga, with 400+ stores, 70 eateries, cinemas and activities—a one-stop shop for fashion, food and family fun.', 'dbn', [-29.7266, 31.0658]),
            place('Musgrave Centre', 'Musgrave', 'Shopping centre', '4.5', 'Durban’s original suburban mall, now a compact Berea favourite with 120+ upmarket stores covering fashion, groceries, homeware and everyday essentials.', 'dbn', [-29.8423, 31.0000]),
            place('uShaka Marine World', 'uShaka', 'Shopping and leisure', '4.5', 'Durban’s Golden Mile marine theme park, where a world-class aquarium, water slides and dolphin shows sit inside a striking shipwreck design. It’s big fun for all ages.', 'dbn', [-29.8683, 31.0453])
        ]
    },
    concert: {
        jhb: [
            place('FNB Stadium', 'FNB Stadium', 'Stadium', '4.8', 'Soccer City itself: a World Cup icon built for the 2010 opening and final, now a bucket-list stage for stadium tours, major concerts and epic football nights.', 'jhb', [-26.2349, 27.9825]),
            place('Ellis Park Stadium', 'Ellis Park', 'Stadium', '4.5', 'A historic rugby fortress with serious concert credentials, home of the 1995 World Cup final and a regular stage for massive live music and sporting spectacles.', 'jhb', [-26.1975, 28.0608]),
            place('Orlando Stadium', 'Orlando Stadium', 'Stadium', '4.5', 'Soweto’s modern soccer marvel, rebuilt for 2010 and famous for the FIFA World Cup Kick-Off Concert. Home to Orlando Pirates and a cauldron of local football energy.', 'jhb', [-26.2433, 27.9928])
        ],
        cpt: [
            place('DHL Stadium', 'DHL Stadium', 'Stadium', '4.8', 'Cape Town’s premier multi-purpose stadium, hosting Stormers rugby, international concerts and expos for up to 58,000, truly a world-class events bowl with mountain views.', 'cpt', [-33.9033, 18.4112]),
            place('Grand Arena, GrandWest', 'Grand Arena', 'Arena', '4.5', 'Cape Town’s top indoor arena, seating up to 7,000 for big-name local and international acts, comedy, conferences and banquet-style events.', 'cpt', [-33.9078, 18.5547]),
            place('Cape Town International Convention Centre', 'CTICC', 'Venue', '4.5', 'Africa’s leading convention centre, with flexible venues, Table Mountain views and capacity for intimate banquets to 2,000-guest galas, making it Cape Town’s business-events powerhouse.', 'cpt', [-33.9163, 18.4291])
        ],
        dbn: [
            place('Moses Mabhida Stadium', 'Moses Mabhida', 'Stadium', '4.8', 'Durban’s architectural icon from the 2010 World Cup, famous for its 106m arch, sky car, adventure walk and bungee swing—plus big matches and concerts.', 'dbn', [-29.8290, 31.0300]),
            place('Durban ICC', 'Durban ICC', 'Venue', '4.5', 'Africa’s leading convention centre, with 112,000m² of flexible space, a column-free exhibition hall and a proven track record for world-class conferences and events.', 'dbn', [-29.8554, 31.0278]),
            place('Durban Playhouse', 'Playhouse', 'Theatre', '4.5', 'Durban’s beloved performing-arts complex, with three theatres staging opera, ballet, drama and live music inside a striking mock-Tudor and 1930s glamour setting.', 'dbn', [-29.8580, 31.0230])
        ]
    }
};