(function(){

  var applyStyles = require('./apply-styles');

  var doc;

  module.exports = function(content, styles){

    doc = document.implementation.createHTMLDocument("");
    doc.write(content);

    doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI);

    doc.body.style.margin = 0;

    if(styles) applyStyles(doc.body, styles);

    return this._serializer.serializeToString(doc.body);

  };

})();