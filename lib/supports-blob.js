(function(){

  var blankSVG = open = '<svg width="1px" height="1px" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">' +
    '<foreignObject width="1" height="1"></foreignObject></svg>';

  var async = require('async');

  module.exports = function(ready){

    var DOMURL = window.URL || window.webkitURL || window,
        svg = new Blob([blankSVG], {type: 'image/svg+xml;charset=utf-8'}),
        url = DOMURL.createObjectURL(svg);

    var canvas = document.createElement('canvas'),
        image = document.createElement('img'),
        ctx = canvas.getContext('2d');

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

      ready.call(this, null, this._supportsBlob);

    }.bind(this);

    image.addEventListener('load', load);

    image.src = url;

  }

})();