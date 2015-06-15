(function(){

  var blankSVG = open = '<svg width="1px" height="1px" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">' +
        '<foreignObject width="1" height="1"></foreignObject></svg>';

  module.exports = function(ready){

    var DOMURL = window.URL || window.webkitURL || window,
        svg = new Blob([blankSVG], {type: 'image/svg+xml;charset=utf-8'}),
        url = DOMURL.createObjectURL(svg);

    var load = function () {

      DOMURL.revokeObjectURL(url);
      this._ctx.drawImage(this._img, 0, 0);

      try{
        this._ctx.getImageData(0, 0, 1, 1);
        this._supportsBlob = true;
      }catch(err){
        this._supportsBlob = false;
      }

      this._img.removeEventListener('load', load);

      ready.call(this, this._supportsBlob);

    }.bind(this);

    this._img.addEventListener('load', load);

    this._img.src = url;
  }

})();