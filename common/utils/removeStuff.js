module.exports = {
  removeComments: removeComments,
  removeLogs: removeLogs
};

function removeComments(userCode) {
  var regex = new RegExp(/(\/\*[^(\*\/)]*\*\/)|\/\/[^\n]*/g);
  return userCode.replace(regex, '');
}

function removeLogs(userJavaScript) {
  return userJavaScript.replace(/(console\.[\w]+\s*\(.*\;)/g, '');
}
