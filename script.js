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
            scale: '0.5 0.5 0.5',
            info: 'Library',
            material: 'color: yellow'
        },
        {
            name: 'Giant',
            location: {
                lat: 40.134540,
                lng: -75.532028,
            },
            scale: '0.4 0.4 0.4',
            info: 'Giant',
            material: 'color: green'
        }
    ];
}

var setModel = function (place, entity) {
    if (place.scale) {
        entity.setAttribute('scale', place.scale);
    }
    
    if (place.material) {
        entity.setAttribute('material', place.material);
    }

    if (place.position) {
        entity.setAttribute('position', place.position);
    }
  
    const div = document.querySelector('.instructions');
    div.innerText = place.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-box');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(place, model);

        scene.appendChild(model);
    });
}
