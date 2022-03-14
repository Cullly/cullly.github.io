window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Library',
            location: {
                lat: 40.129829,
                lng: -75.514650,
            },
            index: 0
        },
    ];
}

var models = [
    {
        scale: '0.5 0.5 0.5',
        info: 'Library',
        rotation: '0 180 0',
    }
];

var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }
  
    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-box');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[place.index], model);
        const distanceMsg = model.getAttribute('distanceMsg');
        console.log(place.name + " is " + distanceMsg + " away");

        scene.appendChild(model);
    });
}
