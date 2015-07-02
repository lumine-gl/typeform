(function(){

  module.exports = function(bodyElement, CSS){

    var styleEl = bodyElement.ownerDocument.createElement('style');

    styleEl.innerText = CSS;

    bodyElement.insertBefore(styleEl, bodyElement.children[0]);

  };

})();