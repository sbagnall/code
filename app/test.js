var a = require('./test1.js');
console.log(require.main);

var b = require.main.require('./test1.js');
a.do();
b.do();
