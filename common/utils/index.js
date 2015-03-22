var chai = require('chai'),
    globular = require('./globular'),
    removeStuff = require('./removeStuff'),
    testCode = require('./testCode');

module.exports = {
  addTests: addTests,
  globular: globular,
  removeComments: removeStuff.removeComments,
  removeLogs: removeStuff.removeLogs,
  runTests: runTests,
  testCode: testCode
};

function addTests(userCode, tests, testSalt) {
  userCode = removeStuff.removeComments(userCode);
  var userTests = [];
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

  return {
    preppedCode: userCode,
    userTests
  };
}

// TODO: move testing into web worker
function runTests(tests, data, testSalt) {
  tests.forEach(function(test) {
    try {
      if (test) {
        let assert = chai.assert;
        let expect = chai.expect;
        chai.should();
        var assemledTests = reassembleTest(test, data, testSalt);
        eval(assemledTests);

      }
    } catch(e) {
      test.err = e.name + ':' + e.message;
    }
    Object.prototype.should = null;
    delete Object.prototype.should;
  });

  return tests;
}

function reassembleTest(test, data, testSalt) {
  var lineNum = test.line;
  var regexp = new RegExp('\/\/' + lineNum + testSalt);
  return data.input.replace(regexp, test.text);
}
