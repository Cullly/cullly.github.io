window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
    alert('Hi');
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
        }/*,
        {
            name: 'Giant',
            location: {
                lat: 40.134540,
                lng: -75.532028,
            },
            index: 1
        },*/
    ];
}

var models = [
    {
        scale: '0.5 0.5 0.5',
        info: 'Library',
        material: 'color: yellow'
    },
    {
        info: 'Giant',
        material: 'color: green'
    }
];

var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }
    
    if (model.material) {
        entity.setAttribute('material', model.material);
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
