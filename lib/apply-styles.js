(function(){

  // TODO: this doesn't apply styles in cascade priority order
  // TODO: what do units like 'rem' mean when there's no root element?
  // TODO: can we make this less complex? It looks like O=n^3 right now.


  module.exports = function(node, styles){

    var selector, rules, selected, i, cssprop;

    for(selector in styles){ if(styles.hasOwnProperty(selector)){

      selected = node.querySelectorAll(selector);

      if(selected.length > 0){

        rules = styles[selector];

        for(i = 0; i < selected.length; ++i){

          for(cssprop in rules){ if(rules.hasOwnProperty(cssprop)){

            selected[i].style[cssprop] = rules[cssprop];

          }}

        }

      }

    }}

  };

})();