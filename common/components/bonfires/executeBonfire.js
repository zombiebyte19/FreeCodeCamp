var debug = require('debug')('freecc:executebonfire');
var {
  removeComments,
  addTests,
  testCode
} = require('../../utils');

module.exports = executeBonfire;

function executeBonfire(userCode, tests, cb) {
  var userTests = null;
  var preppedCode;
  var testSalt = Math.random();
  // TODO: move this into componentDidMount
  // ga('send', 'event', 'Bonfire', 'ran-code', bonfireName);
  userCode = removeComments(userCode);
  preppedCode = addTests(userCode, userTests, tests, testSalt);

  debug('sending code to web worker for testing');
  testCode(preppedCode, cb);
}
