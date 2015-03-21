var globular = require('./globular'),
    removeStuff = require('./removeStuff'),
    testCode = require('./testCode');

module.exports = {
  addTests: addTests,
  globular: globular,
  removeComments: removeStuff.removeComments,
  removeLogs: removeStuff.removeLogs,
  testCode: testCode
};

function addTests(userCode, userTests, tests, testSalt) {
  if (!userTests) {
    userTests = [];
  }
  // append code tests to user code
  for (var i = 0; i < tests.length; i++) {
    userCode += '\n' + tests[i];
  }

  var counter = 0;
  var regValue = [
    '(expect(\\s+)?\\(.*\\;)|',
    '(assert(\\s+)?\\(.*\\;)|',
    '(assert\\.\\w.*\\;)|',
    '(.*\\.should\\..*\\;)'
  ].join('');
  var regex = new RegExp(regValue);
  var match = regex.exec(userCode);

  while (match !== null) {
    var replacement = '//' + counter + testSalt;
    userCode =
      userCode.substring(0, match.index) +
      replacement +
      userCode.substring(match.index + match[0].length);

    userTests.push({
      'text': match[0],
      'line': counter,
      'err': null
    });

    counter++;
    match = regex.exec(userCode);
  }

  return userCode;
}
