#!/usr/bin/env node
const execSync = require('child_process').execSync;
const spawn = require('child_process').spawn;
const util = require('util');
const env = process.env;

env.PATH = execSync('npm bin').toString().trim() + ':' + env.PATH;

const gulp = spawn(
  /^win/.test(process.platform) ? 'gulp.cmd' : 'gulp',
  ['gilp-%s'].concat(process.argv.slice(2).map(function (arg) { return util.format('--gilp-args=%%s', arg); })),
  {
    stdio: 'inherit',
    cwd: execSync('git rev-parse --show-toplevel').toString().trim(),
    env: env
  }
);

gulp.on('close', function (code) {
  process.exit(code);
});

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  gulp.kill('SIGHUP');
});
