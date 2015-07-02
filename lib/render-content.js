(function(){

  var DOMURL = window.URL || window.webkitURL || window,
      nearestPowerOfTwo = function( aSize ){ return Math.pow( 2, Math.ceil( Math.log( aSize ) / Math.log( 2 ) ) ); };

  module.exports = function(content, width, height, cb){

    var url,
        w = nearestPowerOfTwo(width),
        h = nearestPowerOfTwo(height);

    // Prepare canvas

    var canvas = document.createElement('canvas'),
        image = document.createElement('img'),
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

      if (cb instanceof Function) cb.call(this, null, canvas, width / w, height / h);

    }.bind(this);

    image.addEventListener('load', load);

    image.src = url;

    return this;

  }

})();