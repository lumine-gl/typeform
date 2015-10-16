(function(){

  var formatHTML = require('./format-html'),
      renderContent = require('./render-content'),
      findBoxes = require('./find-boxes');

  var CLOSE = '</foreignObject></svg>';

  var render = function(content, dim, CSS, cb, boxes){

    var w = dim.width * (dim.density || 1),
        h = dim.height * (dim.density || 1),
        c = null;

    var open = '<svg width="' + w + 'px" height="' + h + 'px" viewBox="0 0 ' + dim.width + ' ' + dim.height + '" xmlns="http://www.w3.org/2000/svg">' +
      '<foreignObject width="' + dim.width + '" height="' + dim.height + '">';

    // Convert content to string

    if(typeof content === 'string'){

      c = formatHTML.call(this, content, CSS);

    }else{

      console.warn('Not implemented:', 'Something other than a string was passed as content to `render`. At this time, other types are not supported.');

    }

    return renderContent.call(this, open + c + CLOSE, w, h, cb, boxes);

  };

  module.exports = function(content, dimensions, CSS, cb){

    if(this._supportsBlob !== null) {

      // Set up data

      var dim = dimensions || {
          width: 200,
          height: 200,
          density: 1
        };

      if(this._boxes){

        findBoxes.call(this, this._boxes, content, dim, CSS, function(boxes){

          render.call(this, content, dim, CSS, cb, boxes);

        }.bind(this));

      }else{

        render.call(this, content, dim, CSS, cb);

      }

    }else{

      throw new Error( 'Typeform is not ready yet.' );

    }

  };

})();