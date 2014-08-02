var _ = require('lodash');

module.exports = websockets;

 function websockets(options, callback) {
  return new websockets.Construct(options, callback);
}

websockets.Construct = function(options, callback) {
  var self = this;

  self._app = options.app;
  self._apos = options.apos;

  // We need to push our asset to the browser so we'll
  // allow an option
  self._adminOnly = options.adminOnly || false;

  options.modules = (options.modules || []).concat([ { dir: __dirname, name: 'websockets' } ]);

  self.apos.mixinModuleAssets(self, 'websockets', __dirname, options);
  self.pushAsset('script', 'loadSockets', { when: self._adminOnly ? 'user' : 'always' });


  self.io = require('socket.io');

  // Bootstrap the express app's `listen` function,
  // wrapping socket.io around it and calling socket's
  // `listen` instead, followed by our init callback.
  self._app.listen = function() {
    var server = require('http').Server(self._app);
    self.io = require('socket.io')(server);
    server.listen.apply(server, arguments);

    self.initializeSockets(self.io);
  };

  // Override this function!
  self.initializeSockets = function(io) {
    io.on('connection', function(socket) {
      socket.emit('hello', { message: 'hi from the server' });
    });
  };

  // Invoke the callback. This must happen on next tick or later!
  if (callback) {
    return process.nextTick(function() {
      return callback(null);
    });
  }
};