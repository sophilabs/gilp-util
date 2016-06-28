var execSync = require('child_process').execSync;
var yargs = require('yargs');
var util = require('util');

var gilpUtil = {};

gilpUtil.getBaseDirectory = function () {
  return execSync('git rev-parse --show-toplevel').toString().trim();
};

gilpUtil.getBranch = function () {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
};

gilpUtil.getArgs = function () {
  return yargs.parse(yargs.argv.gilpArgs || []);
};

gilpUtil.installHook = function (hook, callback) {
  fs.readFile(path.join(__dirname, '../templates/hook.js'), 'utf8', function (err, template) {
    if (err) {
      return callback(err);
    }
    var directory = path.join(gilpUtil.getBaseDirectory(), '.git/hooks');
    var content = util.format(template, hook);
    var filepath = path.join(directory, hook);
    fs.writeFile(filepath, content, function (err) {
      if (err) {
          return callback(err);
        }
        fs.chmodSync(filepath, '700');
        saveNext();
    });
  });
};

module.exports = gilpUtil;
