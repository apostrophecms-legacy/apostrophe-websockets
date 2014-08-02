$.ajax({
    async:false,
    type:'GET',
    url: '/socket.io/socket.io.js',
    data:null,
    dataType:'script',
    error: function(xhr, textStatus, errorThrown) {
      console.error('apostrophe-websockets failed to load socket.io asset.');
    },
    success: function() {
      apos.socket = io.connect(window.location.host);
    }
});