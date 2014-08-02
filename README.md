Apostrophe Websockets
=====================

`apostrophe-websockets` adds `socket.io` to your [Apostrophe](https://github.com/punkave/apostrophe) project. To use it, add it to your `package.json` file and then add the following to your Apostrophe `app.js` module configuration:

```javascript
  ...
  modules: {
    'apostrophe-websockets': { }
  }
  ...
```

This will establish add socket.io to your server and load `socket.io.js` on the frontend. To take advantage of socket connections you'll need to subclass the websockets module on the server.

Subclassing on the Server
===

Create a `lib/modules/apostrophe-websockets` folder and add an `index.js` file. Here's the code to get started:

```javascript
// /lib/modules/apostrophe-websockets/index.js
module.exports = websockets;

function websockets(options, callback) {
  return new websockets.Construct(options, callback);
}

websockets.Construct = function(options, callback) {
  var self = this;

  module.exports.Super.call(this, options, null);

  self.initializeSockets = function(io) {
    io.on('connection', function(socket) {
      // your socket code here
    });
  };

  // Must wait at least until next tick to invoke callback!
  if (callback) {
    process.nextTick(function() { return callback(null); });
  }

};
```

If you plan to subclass the websockets module more than once, use the `superFunction` pattern to add more code to the existing initializeSockets function:

```javascript
var superInitializeSockets = self.initializeSockets;
self.initializeSockets = function(io) {
  superInitializeSockets(io);
  // your socket code here
}
```

Sockets in the Browser
===

Once the `apostrophe-sockets` module is added to your project you will have `apos.socket` available on the frontend, which is your socket client. Use this as you would use the `socket` property normally.

```javascript
// site.js

apos.socket.emit('hey', { message: 'I have websockets now.' });

apos.socket.on('hello', function(data) {
  console.log(data);
});
```