const {bold, dim} = require('chalk');

module.exports =
`  ${bold('EXAMPLES')}

    ${dim('# A lightweight alternative to <http://npm.im/polydox>:')}
    $ get-comments *.js > doxie --render --inject into Readme.md
`;
