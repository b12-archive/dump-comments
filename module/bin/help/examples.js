const {bold, yellow} = require('chalk');

module.exports =
`  ${bold('EXAMPLES')}

    ${yellow('# A lightweight alternative to <http://npm.im/polydox>:')}
    $ get-comments *.js > doxie --render --inject into Readme.md
`;
