import io from 'socket.io-client';

let socket;

if (process.env.NODE_ENV === 'development')
	socket = io('http://localhost:8000/');
else socket = io();

socket.on('connect', () => {
	console.log('socket connection made');
});

export default socket;
