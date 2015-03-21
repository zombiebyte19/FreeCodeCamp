/* global application */
/* eslint-disable no-eval, no-unused-vars, no-undef, block-scoped-var */
// executes the given code and handles the result
function run(code) {
  var err;
  var result = {
    input: code,
    output: null,
    type: null
  };

  try {
    var codeExec = runHidden(code);
    result.type = typeof codeExec;
    result.output = stringify(codeExec);
  } catch(e) {
    err = e.message;
  }

  application.remote.callback(err, result);
}


// protects even the worker scope from being accessed
function runHidden(code) {

  var indexedDB = null;
  var location = null;
  var navigator = null;
  var onerror = null;
  var onmessage = null;
  var performance = null;
  var self = null;
  var webkitIndexedDB = null;
  var postMessage = null;
  var close = null;
  var openDatabase = null;
  var openDatabaseSync = null;
  var webkitRequestFileSystem = null;
  var webkitRequestFileSystemSync = null;
  var webkitResolveLocalFileSystemSyncURL = null;
  var webkitResolveLocalFileSystemURL = null;
  var addEventListener = null;
  var dispatchEvent = null;
  var removeEventListener = null;
  var dump = null;
  var onoffline = null;
  var ononline = null;
  importScript('https://cdn.jsdelivr.net/ramda/0.10.0/ramda.min.js');

  return eval(code);
}

function importScript(url) {
  try {
    importScripts(url);
  } catch (e) {
    console.log('Unable to load ramda!');
  }
}


// converts the output into a string
function stringify(output) {
  var result;

  if (typeof output === 'undefined') {
    result = 'undefined';
  } else if (output === null) {
    result = 'null';
  } else {
    result = JSON.stringify(output) || output.toString();
  }
  return result;
}

application.setInterface({run: run});
