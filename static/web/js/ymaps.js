let mapContents = [
    {
        title: 'РњРѕСЃРєРІР°',

        text: 'СѓР». РЁРѕСЃСЃРµР№РЅР°СЏ, Рґ. 90, СЃС‚СЂ. 57, РёРЅРґРµРєСЃ вЂ‹109383 (СЃРєР»Р°Рґ В«РђС‚РµРєВ»)',

        places: [
            {
                placeTitle: 'РЎРєР»Р°Рґ',
                placePhones: '8 (999) 965-13-49'
            },

            {
                placeTitle: 'РћС‚РґРµР» РїСЂРѕРґР°Р¶',
                placePhones: '8 (495) 909-92-72'
            }
        ],

        time: 'РїРЅ вЂ” С‡С‚: СЃ 8:30 РґРѕ 16:30, РїС‚: СЃ 8.30 РґРѕ 16.00',

        lat: '55.809634',
        lng: '37.591935',
    },

    {
        title: 'РќРѕРІРѕСЃРёР±РёСЂСЃРє',

        text: 'СѓР». 2 РЎС‚Р°РЅС†РёРѕРЅРЅР°СЏ, 42, СЃРєР»Р°Рґ в„– 7 (СЃРєР»Р°Рґ В«РђС‚РµРєВ»)',

        places: [
            {
                placeTitle: 'РЎРєР»Р°Рґ',
                placePhones: '8 (383) 233-78-47,233-32-89'
            }
        ],

        time: 'РїРЅ вЂ” РїС‚: СЃ 9:00 РґРѕ 17:30',

        lat: '55.012419',
        lng: '82.809802',
    }
];

let mapBalloons = mapContents.map(function(obj) {
    let stringHtml = '<div class="mapBalloon">'+
                        '<div class="mapBalloon__head">'+
                            '<div class="mapBalloon__head_title">'+obj.title+'</div>'+
                        '</div>'+

                        '<div class="mapBalloon__body">'+
                            '<div class="mapBalloon__body_text">'+obj.text+'</div>';

    obj.places.forEach(function(item) {
        let phones = item.placePhones.split(',');

        let itemsString = '<div class="mapBalloon__item">'+
                                '<div class="mapBalloon__item_title">'+item.placeTitle+'</div>'+
                                    '<div class="mapBalloon__item_phone">';
        
        let phoneStringArr = [];

        phones.forEach(function(phone) {
            let number = phone;
            let clearNumber = '';

            clearNumber = number.replace(/[^0-9+]/g, '');


            let phoneString = '<a href="tel:'+clearNumber+'">'+number+'</a>';

            phoneStringArr.push(phoneString);
        })

        let pnonesString = phoneStringArr.join(', ');

        itemsString = itemsString + pnonesString + '</div>' + '</div>';

        stringHtml = stringHtml + itemsString;
                                
    })

                        
    let footerString = '<div class="mapBalloon__time">'+
                            '<div class="mapBalloon__time_title">Р’СЂРµРјСЏ СЂР°Р±РѕС‚С‹</div>'+

                            '<div class="mapBalloon__time_text">'+obj.time+'</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';

    stringHtml = stringHtml + footerString;

    return stringHtml;
});

if ($('#mapContact').length) {
    ymaps.ready(init);
}

function init(){
    document.map = new ymaps.Map("mapContact", {
        center: [60.048101, 62.046706],
        zoom: 4,
        controls: [],
    });

    // myPlacemark1 = new ymaps.Placemark([55.809634, 37.591935], {
    //     hintContent: 'РЎРєР»Р°Рґ РІ РњРѕСЃРєРІРµ',
    //     balloonContent: 'СѓР». РЁРѕСЃСЃРµР№РЅР°СЏ, Рґ. 90, СЃС‚СЂ. 57'
    // }),

    // myPlacemark2 = new ymaps.Placemark([55.012419, 82.809802], {
    //     hintContent: 'РЎРєР»Р°Рґ РІ РќРѕРІРѕСЃРёР±РёСЂСЃРєРµ',
    //     balloonContent: 'СѓР». 2 РЎС‚Р°РЅС†РёРѕРЅРЅР°СЏ, 42, СЃРєР»Р°Рґ в„– 7'
    // });

    myCollection = new ymaps.GeoObjectCollection();

    mapContents.forEach(function(item, index) {

        myPlacemark = new ymaps.Placemark([item.lat, item.lng], {
            balloonContent: mapBalloons[index],
        });

        myCollection.add(myPlacemark);
    })


    document.map.geoObjects.add(myCollection);

    document.map.setBounds(myCollection.getBounds());

    document.map.setZoom(4);

    document.map.setCenter([60.048101, 62.046706]);

    document.map.behaviors.disable('scrollZoom');

    //РћС‚РєР»СЋС‡РёС‚СЊ РґСЂР°Рі РЅР° РјРѕР±РёР»СЊРЅРёРєР°С…
    /*if (!$('.notTouch').length) {
        document.map.behaviors.disable('drag');
    }*/
}