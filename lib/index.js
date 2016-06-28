'use strict';
var execSync = require('child_process').execSync;
var yargs = require('yargs');
var util = require('util');
var path = require('path');
var fs = require('fs');

var gilpUtil = {};

gilpUtil.getBaseDirectory = function () {
  return execSync('git rev-parse --show-toplevel').toString().trim();
};

gilpUtil.getGitDirectory = function () {
  return path.join(
    gilpUtil.getBaseDirectory(),
    execSync('git rev-parse --git-dir').toString().trim()
  );
};

gilpUtil.getBranch = function () {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
};

gilpUtil.getArgs = function () {
  return yargs.parse(yargs.argv.gilpArgs || []);
};

gilpUtil.isInMerge = function () {
  var gitDirectory = gilpUtil.getGitDirectory();
  try {
    fs.accessSync(path.join(gitDirectory, 'MERGE_MSG'), fs.F_OK);
    fs.accessSync(path.join(gitDirectory, 'MERGE_HEAD'), fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

gilpUtil.installHook = function (hook, callback) {
  fs.readFile(path.join(__dirname, '../templates/hook.js'), 'utf8', function (err, template) {
    if (err) {
      return callback(err);
    }
    var directory = path.join(gilpUtil.getGitDirectory(), 'hooks');
    var content = util.format(template, hook);
    var filepath = path.join(directory, hook);
    fs.writeFile(filepath, content, function (err) {
      if (err) {
          return callback(err);
        }
        fs.chmodSync(filepath, '700');
        callback();
    });
  });
};

module.exports = gilpUtil;
