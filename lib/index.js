var execSync = require('child_process').execSync;
var yargs = require('yargs');
var util = require('util');
var path = require('path');
var fs = require('fs');

module.exports = {
  getBaseDirectory: function () {
    return execSync('git rev-parse --show-toplevel').toString().trim();
  },

  getBranch: function () {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  },

  getArgs: function () {
    return yargs.parse(yargs.argv.gilpArgs || []);
  },

  installHook: function (hook, callback) {
    fs.readFile(path.join(__dirname, '../templates/hook.js'), 'utf8', function (err, template) {
      if (err) {
        return callback(err);
      }
      var directory = path.join(utils.getBaseDirectory(), '.git/hooks');
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
  }
}
