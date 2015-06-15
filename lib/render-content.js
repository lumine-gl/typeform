(function(){

  var DOMURL = window.URL || window.webkitURL || window;

  module.exports = function(content, w, h, cb){

    var url;

    // Prepare canvas

    this.el.width  = w;
    this.el.height = h;
    this._ctx.clearRect(0, 0, w, h);

    // Prepare SVG

    if (this._supportsBlob) {
      url = DOMURL.createObjectURL(new Blob([content], {type: 'image/svg+xml;charset=utf-8'}));
    } else {
      url = 'data:image/svg+xml;utf8,' + content;
    }

    // Render

    var load = function () {

      this._ctx.drawImage(this._img, 0, 0);

      if (this._supportsBlob) DOMURL.revokeObjectURL(url);

      this._img.removeEventListener('load', load);

      if (cb instanceof Function) cb.call(this, this.el);

    }.bind(this);

    this._img.addEventListener('load', load);

    this._img.src = url;

    return this;

  }

})();