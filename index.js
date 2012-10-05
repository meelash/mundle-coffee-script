coffee = require('coffee-script');

module.exports = {
  extensions : ['coffee'],
  compiler : function(preCompile) {
    return coffee.compile(preCompile);
  }
};