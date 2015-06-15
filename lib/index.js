(function(){

  var supportsBlob = require('./supports-blob');

  function Typeform(options, ready){

    var opts = options || {};

    this.el = document.createElement('canvas');
    this._ctx = this.el.getContext('2d');

    this._img = new Image();
    this._serializer = new XMLSerializer();

    this._supportsBlob = null;
    supportsBlob.call(this, ready);

  }

  Typeform.prototype.render = require('./render');
  Typeform.prototype.renderBoxes = require('./render-boxes');

  module.exports = window.Typeform = Typeform;

})();