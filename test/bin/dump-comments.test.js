const {resolve} = require('path');
const {execFile} = require('child_process');
const {isArray} = Array;

const tape = require('tape-catch');
const test = require('1-liners/test');
const plus = require('1-liners/plus');
const curry = require('1-liners/curry');

const title = curry(plus)('The CLI program:  ');
const dumpComments = resolve(__dirname, '../../module/bin/dump-comments.js');
const $dumpComments = curry(execFile)(dumpComments);
const cwd = resolve(__dirname, '../mock-cwd');

tape(title('Prints usage'), (is) => {
  is.plan(8);

  $dumpComments([], (error, _, stderr) => {
    is.equal(error && error.code, 1,
      '`dump-comments` fails…'
    );

    is.ok(
      test(stderr, /^usage:/i),
      '…and prints usage to stderr'
    );
  });

  $dumpComments(['--invalid', '--options', 'one.js'], {cwd},
    (error, _, stderr) => {
      is.equal(error && error.code, 1,
        '`dump-comments --invalid --options one.js` fails…'
      );

      is.ok(
        test(stderr, /^usage:/i),
        '…and prints usage to stderr'
      );
    }
  );

  $dumpComments(['-h'], (error, stdout) => {
    is.equal(error, null,
      '`dump-comments -h` succeeds…'
    );

    is.ok(
      test(stdout, /^usage:/i),
      '…and prints usage'
    );
  });

  $dumpComments(['--help'], (error, stdout) => {
    is.equal(error, null,
      '`dump-comments --help` succeeds…'
    );

    is.ok(
      test(stdout, /SYNOPSIS/),
      '…and prints manpage-like help'
    );
  });
});

tape(title('Works for a single file'), (is) => {
  $dumpComments(['one.js'], {cwd}, (error, output) => {
    is.equal(error, null,
      '`dump-comments <single file>` succeeds'
    );

    let outputData;
    is.doesNotThrow(
      () => outputData = JSON.parse(output),
      'returns a valid JSON…'
    );

    is.ok(
      isArray(outputData),
      '…array…'
    );

    is.equal(outputData.length,
      2,
      '…with one item per comment'
    );

    is.end();
  });
});
