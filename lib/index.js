(function(){

  var Pool = require('generic-pool'),
      EE = require('events').EventEmitter,
      inherits = require('util').inherits;

  var supportsBlob = require('./supports-blob');

  function Typeform(options){

    var opts = options || {};

    this._pools = {
      canvas: Pool.Pool({
        name: 'Canvases',
        create: function(cb){
          console.log('Canvas created.');
          cb(null, document.createElement('canvas'));
        },
        destroy: function(el){
          console.log('Canvas destroyed.');
          el = null; // hopefully this removes the last reference
          return null;
        },
        refreshIdle: false,
        log: opts.log || false,
        min: opts.resources || 1,
        max: opts.resources || 1
      }),
      image: Pool.Pool({
        name: 'Images',
        create: function(cb){
          console.log('Image created.');
          cb(null, new Image());
        },
        destroy: function(img){
          console.log('Image destroyed.');
          img = null; // hopefully this removes the last reference
          return null;
        },
        refreshIdle: false,
        log: opts.log || false,
        min: opts.resources || 1,
        max: opts.resources || 1
      })
    };

    this._serializer = new XMLSerializer();

    this._supportsBlob = null;

    EE.call(this);

  }

  inherits(Typeform, EE);

  Typeform.prototype.start = function(ready){
    supportsBlob.call(this, ready);
  };

  Typeform.prototype.render = require('./render');
  Typeform.prototype.renderBoxes = require('./render-boxes');

  module.exports = window.Typeform = Typeform;

})();