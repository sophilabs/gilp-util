var execSync = require('child_process').execSync;
var yargs = require('yargs');


var utils = {};

utils.getBaseDirectory = function () {
  return execSync('git rev-parse --show-toplevel').toString().trim();
};

utils.getBranch = function () {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
};

utils.getArgs = function () {
  return yargs.parse(yargs.argv.gilpArgs || []);
};


module.exports = utils;
