//Creating Service for Socket and Returning it
app.factory('sockets',function(socketFactory){
  var myIoSocket = io.connect('localhost:8082');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return{
    getSocket: function(){
      return mySocket;
    }
  }

});
