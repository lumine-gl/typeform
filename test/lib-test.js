var CONTENT = '<h1>Test pattern</h1>' +
      '<p>If this is in Segoe UI, Helvetica Neue, or Helvetica, and it\'s bluish, and "Test pattern" is heavier than this paragraph, then all is&nbsp;good.</p>',
    STYLE = {
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
    };

describe('Typeform', function(){

  var tf;

  before( function(done){

    tf = new Typeform({}, function(){
      return done();
    });

  });

  describe('constructor', function(){

    it('should have a 2d context to work with', function(){

      return tf._ctx.constructor.name.should.equal('CanvasRenderingContext2D');

    });

  });

  describe('render', function(){

    it('should look right', function(done){

      tf.render(

        CONTENT,

        {
          width: 240,
          height: 240,
          density: 2
        },

        STYLE,

        function(el){
          document.body.appendChild(el);
          done();
        }

      );

    });

  });

  describe('renderBoxes', function(){

    it('should look right', function(done){

      tf.renderBoxes(
        [
          {
            x: 20, y: 20, w: 200, h: 200,
            content: CONTENT
          },
          {
            x: 240, y: 20, w: 200, h: 200,
            content: CONTENT
          }
        ],

        2,

        STYLE,

        function(el){
          done();
        }

      );

    });

  });

});