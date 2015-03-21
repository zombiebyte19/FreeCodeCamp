var mockWin = {
  ga: function() { },
  document: function() {}
};

var win = typeof window !== 'undefined' ? window : mockWin;

module.exports = {
  window: win,
  ga: win.ga
};
