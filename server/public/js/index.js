var socket = io('http://localhost:3000');
  socket.on('connect', function(){
  	console.log('connect')
  	socket.emit('event')
  });
  socket.on('event', function(data){
  	console.log('Mensaje recibido')

  });
  socket.on('disconnect', function(){});