'use strict'

let socket = (client) =>{
	console.log('conectado')
	client.on('connection',() => {
		setTimeout(function() { client.emit('event') },2000)
	});

	client.on('new post',(data) => {
		console.log(data)
		client.emit('new post',data)

	});

	client.on('update post',(data) => {
		client.emit('update post',data);
	});

	client.on('delete post',(data) => {
		client.emit('delete post',data)
	});


}

module.exports = socket;