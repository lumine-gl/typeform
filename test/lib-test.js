describe('Typeform', function(){

  var tf = new Typeform({

  });

  describe('constructor', function(){

    it('should have a 2d context to work with', function(){

      return tf._ctx.constructor.name.should.equal('CanvasRenderingContext2D');

    });

  });

});