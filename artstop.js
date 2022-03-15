AFRAME.registerComponent('artstop', {
    schema: {
      name: {type: 'string'}
    },
    init: function() {
        console.log('Initializing: ' + this.data.name);
    }
});
