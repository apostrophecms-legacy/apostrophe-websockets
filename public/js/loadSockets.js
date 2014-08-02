$.getScript('/socket.io/socket.io.js', function() {
  apos.socket = io.connect(window.location.host);
  apos.emit('socketReady');
});