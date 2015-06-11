(function(){

  module.exports = function(content, width, height, density, cb){

    // Set up data

    var d = density || 1,
        w = width * d,
        h = height * d,
        open = '<svg width="' + w + 'px" height="' + h + 'px" viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' +
          '<foreignObject width="' + w + '" height="' + h + '">',
        close = '</foreignObject></svg>',
        c = null,
        doc, ci;

    // Convert content to string

    if(typeof content === 'string'){

      doc = document.implementation.createHTMLDocument("");
      doc.write(content);

      doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI);

      doc.body.style.margin = 0;

      // Get well-formed markup
      c = (new XMLSerializer).serializeToString(doc.body);

    }else

    if(content.toString() === '[object HTMLDivElement]'){

      content.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
      c = content.outerHTML;

    }else

    if(content.toString() === '[object NodeList]' || content.toString() === '[object HTMLCollection]'){

      for(ci = 0; ci < content.length; ++ci){

        content[ci].setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        c += content[ci].outerHTML;

      }
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