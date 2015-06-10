(function(){

  function Typeform(options){

    var opts = options || {};

    this.el = document.createElement('canvas');
    this._ctx = this.el.getContext('2d');

  }

  module.exports = window.Typeform = Typeform;

})();