(function(){

  var async = require('async');

  var DOMURL = window.URL || window.webkitURL || window,
      nearestPowerOfTwo = function( aSize ){ return Math.pow( 2, Math.ceil( Math.log( aSize ) / Math.log( 2 ) ) ); };

  module.exports = function(content, width, height, cb){

    var url,
        w = nearestPowerOfTwo(width),
        h = nearestPowerOfTwo(height);

    // Prepare canvas

    async.parallel([
      this._pools.canvas.acquire,
      this._pools.image.acquire
    ], function(err, results){

      var canvas = results[0],
          image = results[1],
          ctx = canvas.getContext('2d');

      canvas.width  = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      // Prepare SVG

      if (this._supportsBlob) {
        url = DOMURL.createObjectURL(new Blob([content], {type: 'image/svg+xml;charset=utf-8'}));
      } else {
        url = 'data:image/svg+xml;utf8,' + content;
      }

      // Render

      image.removeAttribute('src');

      var load = function () {

        ctx.drawImage(image, 0, 0);

        if (this._supportsBlob) DOMURL.revokeObjectURL(url);

        image.removeEventListener('load', load);

        this._pools.image.release(image);

        var release = function(){
          this._pools.canvas.release(canvas);
        }.bind(this);

        if (cb instanceof Function) cb.call(this, null, canvas, release, width / w, height / h);
        this.emit('render', canvas, release, w - width, h - height);

      }.bind(this);

      image.addEventListener('load', load);

      image.src = url;

    }.bind(this));

    return this;

  }

})();