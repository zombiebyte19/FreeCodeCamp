module.exports = {
  removeComments: removeComments,
  removeLogs: removeLogs
};

function removeComments(code) {
  var regex = new RegExp(/(\/\*[^(\*\/)]*\*\/)|\/\/[^\n]*/g);
  return code.replace(regex, '');
}

function removeLogs(code) {
  return code.replace(/(console\.[\w]+\s*\(.*\;)/g, '');
}
