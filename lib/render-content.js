(function(){

  var async = require('async');

  var DOMURL = window.URL || window.webkitURL || window;

  module.exports = function(content, w, h, cb){

    var url;

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

      var load = function () {

        ctx.drawImage(image, 0, 0);

        if (this._supportsBlob) DOMURL.revokeObjectURL(url);

        image.removeEventListener('load', load);

        this._pools.image.release(image);

        var release = function(){
          this._pools.canvas.release(canvas);
        }.bind(this);

        if (cb instanceof Function) cb.call(this, null, canvas, release);
        this.emit('render', canvas, release);

      }.bind(this);

      image.addEventListener('load', load);

      image.src = url;

    }.bind(this));

    return this;

  }

})();