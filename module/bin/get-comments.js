#! /usr/bin/env node

const {stdout, stderr, exit, argv} = process;

const omit = require('omit-keys');

const args = require('minimist')(argv.slice(2));
const flags = omit(args, '_');
const files = args._;

// Print help

if (flags.h) stdout.write(require('./help/usage'));

if (flags.help) stdout.write('\n' + [
  require('./help/synopsis'),
  require('./help/options'),
  require('./help/examples'),
].join('\n\n') + '\n');

// Return early

if (flags.h || flags.help) exit(0);

if (
  !files.length ||
  Object.keys(flags).some((flag) => flag !== 'h' && flag !== 'help')
) {
  stderr.write(require('./help/usage'));
  exit(1);
}
