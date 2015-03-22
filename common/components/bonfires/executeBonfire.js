var debug = require('debug')('freecc:executebonfire');
var {
  addTests,
  runTests,
  testCode
} = require('../../utils');

module.exports = executeBonfire;

function executeBonfire(userCode, tests, cb) {

  // TODO: move this into componentDidMount
  // ga('send', 'event', 'Bonfire', 'ran-code', bonfireName);
  var testSalt = Math.random();
  var { preppedCode, userTests } = addTests(userCode, tests, testSalt);

  debug('sending code to web worker for testing');
  testCode(preppedCode, function(err, data) {
    if (err) { return cb(err); }
    var _tests = runTests(userTests, data, testSalt);
    debug('testing complete', _tests);
    cb(null, _tests);
  });
}
