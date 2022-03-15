AFRAME.registerComponent('artstop', {
    schema: {
      name: {type: 'string'}
    },
    init: function() {
        console.log('Initializing: ' + this.data.name);
        this.el.addEventListener('click', function(ev, target) {
            const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
            if (aEntity && intersectedElement === aEntity) {
                console.log('Clicked: ' + this.data.name);
            }
        });
    }
});
