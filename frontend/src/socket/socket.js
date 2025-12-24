import io from 'socket.io-client';
const server_URL= process.env.REACT_APP_BACKEND_URL;
export const socket = io(server_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  transports: ['websocket'],
});


