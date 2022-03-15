AFRAME.registerComponent('artstop', {
    schema: {
      name: {type: 'string'}
    },
    init: function() {
        alert('Initializing Art Stop: ' + this.data.name);
    }
});
