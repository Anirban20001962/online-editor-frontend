import io from 'socket.io-client';

const socket = io();

socket.on('connect', () => {
    console.log('socket connection made');
});

export default socket;
