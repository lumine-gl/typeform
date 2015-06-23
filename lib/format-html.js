(function(){

  var applyCSS = require('./apply-css');

  var doc;

  module.exports = function(content, CSS){

    doc = document.implementation.createHTMLDocument("");
    doc.write(content);

    doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI);

    if(CSS) applyCSS(doc.body, CSS);

    return this._serializer.serializeToString(doc.body);

  };

})();