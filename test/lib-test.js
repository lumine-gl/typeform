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

    tf = new Typeform({ concurrency: 4, log: true });
    tf.start(done);

  });

  describe('constructor', function(){

    it('should have pools to work with', function(){

      return tf.should.have.property('_pools');

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

        function(err, canvas, release, u, v){
          if(err) throw err;
          console.log('u:', u, ' v:', v);
          document.body.appendChild(canvas);
          release();
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

        function(err, canvas, release, u, v){
          if(err) throw err;
          console.log('u:', u, ' v:', v);
          document.body.appendChild(canvas);
          release();
          done();
        }

      );

    });

  });

});