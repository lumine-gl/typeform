(function(){

  var getTotalOffset = function(el, stop){

    var cur = el,
        offset = {
          top: 0,
          left: 0
        };

    while(cur !== stop) {
      offset.top += cur.offsetTop;
      offset.left += cur.offsetLeft;
      cur = cur.offsetParent;
    }

    return offset;

  };

  module.exports = function(boxesSelector, content, dim, CSS, cb){
    var self = this;

    var hiddenNode = document.createElement('div');
    hiddenNode.style.position = 'fixed';
    hiddenNode.style.left = '110%';
    hiddenNode.style.top = '110%';
    hiddenNode.style.width = dim.width + 'px';
    hiddenNode.style.height = dim.height + 'px';

    document.body.appendChild(hiddenNode);

    setTimeout(function(){

      var root = hiddenNode.createShadowRoot();
      root.innerHTML = '<style>' + CSS + '</style>' + content;

      setTimeout(function(){

        var boxEls = root.querySelectorAll(boxesSelector),
            boxes = [];

        for(var i = 0; i < boxEls.length; i += 1){

          boxes[i] = getTotalOffset(boxEls[i], hiddenNode);

          var bBox = boxEls[i].getBoundingClientRect();

          boxes[i].width = bBox.width;
          boxes[i].height = bBox.height;

        }

        cb.call(self, boxes);

      }, 0);

    }, 0);

  };

})();