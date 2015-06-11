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

        '<h1>Test pattern</h1>' +
        '<p>If this is in Segoe UI, Helvetica Neue, or Helvetica, and it\'s bluish, and "Test pattern" is heavier than this paragraph, then all is&nbsp;good.</p>',

        {
          width: 240,
          height: 240,
          density: 2
        },

        {
          'h1, p': {
            'fontFamily': '"Segoe UI", "Helvetica Neue", Helvetica, sans-serif',
            'color': '#86ABA5'
          },
          'p': {
            'fontSize': '13px',
            'fontWeight': 200
          },
          'h1': {
            'fontSize': '20px',
            'fontWeight': 600
          }
        },

        function(el){
          document.body.appendChild(el);
        }

      );

    });

  });

});