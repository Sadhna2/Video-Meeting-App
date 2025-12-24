import io from 'socket.io-client';
const server_URL= 'http://localhost:5000';
export const socket = io(server_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  transports: ['websocket'],
});


