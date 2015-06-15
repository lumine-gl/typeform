(function(){

  var formatHTML = require('./format-html'),
      renderContent = require('./render-content');

  module.exports = function(boxes, density, styles, cb){

    if(this._supportsBlob !== null) {

      var self = this;

      var minX = Infinity,
          maxX = -Infinity,
          minY = Infinity,
          maxY = -Infinity;

      boxes.forEach(function (box, i) {

        minX = Math.min(minX, box.x);
        maxX = Math.max(maxX, box.x + box.w);

        minY = Math.min(minY, box.y);
        maxY = Math.max(maxY, box.y + box.h);

      });

      var d      = density || 1,
          height = (maxY - minY),
          h      = height * d,
          width  = (maxX - minX),
          w      = width * d,
          open   = '<svg width="' + w + 'px" height="' + h + 'px" viewBox="0 0 ' + width + ' ' + height + '" xmlns="http://www.w3.org/2000/svg">';

      var contentsForeign = '';

      boxes.forEach(function (box, i) {

        var foreignOpen    = '<foreignObject x="' + (box.x - minX) + '" y="' + (box.y - minY) + '" width="' + box.w + '" height="' + box.h + '">',
            foreignContent = formatHTML.call(self, box.content, styles);

        contentsForeign += foreignOpen + foreignContent + '</foreignObject>';

      });

      return renderContent.call(this, open + contentsForeign + '</svg>', w, h, cb);

    }else{

      throw new Error( 'Typeform is not ready yet.' );

    }

  }

})();