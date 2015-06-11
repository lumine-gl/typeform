(function(){

  var applyStyles = require('./apply-styles');

  module.exports = function(content, dimensions, styles, cb){

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
        doc, ci;

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

    this.el.width = w;
    this.el.height = h;
    this._ctx.clearRect(0, 0, w, h);

    // Prepare SVG

    var DOMURL = window.URL || window.webkitURL || window;

    var data = open + c + close,
        img = new Image(),
        svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'}),
        url = DOMURL.createObjectURL(svg);

    // Render

    img.onload = function () {

      this._ctx.drawImage(img, 0, 0);

      DOMURL.revokeObjectURL(url);

      if(cb instanceof Function) cb.call(this, this.el, svg, img, data);

    }.bind(this);

    img.src = url;

  };

})();