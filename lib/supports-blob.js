(function(){

  var blankSVG = open = '<svg width="1px" height="1px" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">' +
        '<foreignObject width="1" height="1"></foreignObject></svg>';

  var async = require('async');

  module.exports = function(ready){

    var DOMURL = window.URL || window.webkitURL || window,
        svg = new Blob([blankSVG], {type: 'image/svg+xml;charset=utf-8'}),
        url = DOMURL.createObjectURL(svg);

    async.parallel([
      this._pools.canvas.acquire,
      this._pools.image.acquire
    ], function(err, results){

      var canvas = results[0],
          image = results[1],
          ctx = results[0].getContext('2d');

      var load = function () {

        DOMURL.revokeObjectURL(url);
        ctx.drawImage(image, 0, 0);

        try{
          ctx.getImageData(0, 0, 1, 1);
          this._supportsBlob = true;
        }catch(err){
          this._supportsBlob = false;
        }

        image.removeEventListener('load', load);
        this._pools.canvas.release(canvas);
        this._pools.image.release(image);

        ready.call(this, null, this._supportsBlob);
        this.emit('ready', this._supportsBlob);

      }.bind(this);

      image.addEventListener('load', load);

      image.src = url;

    }.bind(this));

  }

})();