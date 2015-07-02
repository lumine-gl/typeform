var CONTENT =

      '<h1>Test pattern</h1>' +
      '<p>If this is in Segoe UI, Helvetica Neue, or Helvetica, and it\'s bluish, and "Test pattern" is heavier than this paragraph, then all is&nbsp;good.</p>',

    STYLE =

      "h1, p {" +
      "  font-family: \"Segoe UI\", \"Helvetica Neue\", Helvetica, sans-serif;" +
      "  color: #86ABA5;" +
      "}" +
      "p {" +
      "  font-size: 13px;" +
      "  font-weight: 200;" +
      "}" +
      "h1 {" +
      "  font-size: 20px;" +
      "  font-weight: 600;" +
      "}";

describe('Typeform', function(){

  var tf;

  before( function(done){

    tf = new Typeform({ concurrency: 4, log: true });
    tf.start(done);

  });

  describe('constructor', function(){

    it('should have a serializer', function(){

      return tf.should.have.property('_serializer');

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

        function(err, canvas, u, v){
          if(err) throw err;
          console.log('u:', u, ' v:', v);
          document.body.appendChild(canvas);
          done();
        }

      );

    });

  });

});