(function(){

  var applyStyles = require('./apply-styles');

  var DOMURL = window.URL || window.webkitURL || window;

  module.exports = function(content, dimensions, styles, cb){

    if(this._supportsBlob !== null) {

      // Set up data

      var dim = dimensions || {
          width: 200,
          height: 200,
          density: 1
        };

      var w = dim.width * (dim.density || 1),
          h = dim.height * (dim.density || 1),
          open = '<svg width="' + w + 'px" height="' + h + 'px" viewBox="0 0 ' + dim.width + ' ' + dim.height + '" xmlns="http://www.w3.org/2000/svg">' +
            '<foreignObject width="' + dim.width + '" height="' + dim.height + '">',
          close = '</foreignObject></svg>',
          c = null,
          doc, url;

      // Convert content to string

      if(typeof content === 'string'){

        doc = document.implementation.createHTMLDocument("");
        doc.write(content);

        doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI);

        doc.body.style.margin = 0;

        if(styles) applyStyles(doc.body, styles);

        c = this._serializer.serializeToString(doc.body);

      }else{

        console.warn('Not implemented:', 'Something other than a string was passed as content to `render`. At this time, other types are not supported.');

      }

      // Prepare canvas

      this.el.width  = w;
      this.el.height = h;
      this._ctx.clearRect(0, 0, w, h);

      // Prepare SVG

      var data = open + c + close;

      if (this._supportsBlob) {
        url = DOMURL.createObjectURL(new Blob([data], {type: 'image/svg+xml;charset=utf-8'}));
      } else {
        url = 'data:image/svg+xml;utf8,' + data;
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

    }else{

      throw new Error( 'Typeform is not ready yet.' );

    }

  };

})();