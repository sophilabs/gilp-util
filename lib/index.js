'use strict';
const execSync = require('child_process').execSync;
const yargs = require('yargs');
const util = require('util');
const path = require('path');
const fs = require('fs');

const gilpUtil = {};

gilpUtil.getBaseDirectory = function () {
  return execSync('git rev-parse --show-toplevel').toString().trim();
};

gilpUtil.getGitDirectory = function () {
  return path.join(
    gilpUtil.getBaseDirectory(),
    execSync('git rev-parse --git-dir').toString().trim()
  );
};

gilpUtil.getBranchName = function () {
  return execSync('git symbolic-ref --short HEAD').toString().trim();
};

gilpUtil.getCommitMessage = function () {
  const commitFile = path.join(gilpUtil.getGitDirectory(), 'COMMIT_EDITMSG');
  return fs.readFileSync(commitFile).toString().trim();
};

gilpUtil.getBranch = function () {
  console.warn('gilpUtil.getBranch will be removed in favor of gilpUtil.getBranchName.');
  return gilpUtil.getBranchName();
};

gilpUtil.getArgs = function () {
  return yargs.parse(yargs.argv.gilpArgs || []);
};

gilpUtil.isInMerge = function () {
  const gitDirectory = gilpUtil.getGitDirectory();
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
    const directory = path.join(gilpUtil.getGitDirectory(), 'hooks');
    const content = util.format(template, hook);
    const filepath = path.join(directory, hook);
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
