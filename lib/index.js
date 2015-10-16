(function(){

  var supportsBlob = require('./supports-blob');

  function Typeform(options){

    this._serializer = new XMLSerializer();

    this._supportsBlob = null;

    this._boxes = options.boxes;

  }

  Typeform.prototype.start = function(ready){
    supportsBlob.call(this, ready);
  };

  Typeform.prototype.render = require('./render');

  module.exports = window.Typeform = Typeform;

})();