var debug = require('debug')('freecc:testCode'),
    jailed = require('jailed'),
    { removeLogs, removeComments } = require('./removeStuff'),
    win = require('./globular').window;

module.exports = testCode;

// test campers code
function testCode(code, cb) {
  var disconnectTimeout = null;
  var api = {
    callback: function(err, data) {
      endLoading(disconnectTimeout);
      debug('web worker completed');
      if (err) { return cb(err); }

      data.input = removeLogs(data.input);
      cb(null, data);
    }
  };
  debug('initiating web worker');
  var plugin = initWebWorker(api);

  plugin.whenConnected(function() {
    debug('web worler initiated');
    disconnectTimeout = startLoading(plugin);
    plugin.remote.run(code);
  });

  // called when plugin does not respond before timeout ends
  // and is forcibly disconnected
  plugin.whenDisconnected(function() {
    debug('web worker forcibly disconnected');
    // give some time to handle the last response
    setTimeout(function() {
      console.log('resetting on fatal plugin error');
    }, 10);
  });
}

function initWebWorker(api) {
  var path = getPathToPlugin();
  var plugin = new jailed.Plugin(path, api);
  return plugin;
}

// Gives web worker time to respond.
// if timeout ends before web worker respondes
// Web Worker is forced to close
function startLoading(plugin) {
  return setTimeout(function() {
    plugin.disconnect();
  }, 30000);
}

// clears loading timeout
function endLoading(disconnectTimeout) {
  clearTimeout(disconnectTimeout);
}

// get path to plugin script
function getPathToPlugin() {
  // obtaining absolute path of this script
  var origin = win.location ?
    win.location.origin :
    '';
  return origin + '/js/bonfires/plugin.js';
}
