describe('Typeform', function(){

  var tf = new Typeform({

  });

  describe('constructor', function(){

    it('should have a 2d context to work with', function(){

      return tf._ctx.constructor.name.should.equal('CanvasRenderingContext2D');

    });

  });

  describe('render', function(){

    it('should look right', function(){

      tf.render(

        // TODO: do we really need to inline all the styles? The SVG might need to be in the document to receive styles…

        '<h1 style="font-size: 20px;">Hello, world.</h1>' +
        '<p style="font-size: 12px;">Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs.</p>',

        200, 200, 1, function(el){
          document.body.appendChild(el);
        }
      );

    });

  });

});