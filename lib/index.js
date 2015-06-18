(function(){

  var supportsBlob = require('./supports-blob');

  function Typeform(options){

    this._serializer = new XMLSerializer();

    this._supportsBlob = null;

  }

  Typeform.prototype.start = function(ready){
    supportsBlob.call(this, ready);
  };

  Typeform.prototype.render = require('./render');
  Typeform.prototype.renderBoxes = require('./render-boxes');

  module.exports = window.Typeform = Typeform;

})();