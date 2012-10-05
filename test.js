path = require('path');
fs = require('fs');
plugin = require('./index.js');
mundle = require('mundle');
mundle.use(plugin);
mundle.setBasePath(__dirname);

createTestFile = function(filePath, text) {
  var makePath;
  makePath = function(dirPath) {
    var parent;
    if (!fs.existsSync((parent = path.dirname(dirPath)))) {
      makePath(parent);
    }
    if (!fs.existsSync(dirPath)) {
      return fs.mkdirSync(dirPath);
    }
  };
  makePath(path.dirname(filePath));
  return fs.writeFileSync(filePath, text);
};

exports.testPlugin = function(test) {
  test.expect(2);

  createTestFile("" + __dirname + "/testPlugin.coffee", "(test)->testFunction");

  mundle('/testPlugin.coffee', {}, function(errors, modules) {
    test.ifError(errors, 'No errors should be returned');
    test.deepEqual(modules, {
      '/testPlugin.coffee': "(function() {\n\n  (function(test) {\n    return testFunction;\n  });\n\n}).call(this);\n"
    }, 'Compiler should have returned compiled code from the plugin');
    fs.unlinkSync("" + __dirname + "/testPlugin.coffee");
    return test.done();
  });
}