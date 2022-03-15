AFRAME.registerComponent('artstop', {
    schema: {
      name: {type: 'string'}
    },
    init: function() {
        console.log('Initializing: ' + this.data.name);
        console.log(this.el)
        console.log(this.data.distanceMsg);
        console.log(this.el.getAttribute('distanceMsg'));
    }
});
