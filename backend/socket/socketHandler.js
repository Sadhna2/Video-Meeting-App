const { Server } = require('socket.io');

const initializesocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    const message = {};

    io.on('connection', (socket) => {
        console.log('New user connected:', socket.id);

        socket.on('join-call', (roomid) => {
            socket.join(roomid);
            socket.roomid = roomid;

            const clients = Array.from(io.sockets.adapter.rooms.get(roomid) || []);
            console.log(`Room ${roomid} members:`, clients);

            // Tell this user who else is there
            socket.emit('all-users', clients.filter(id => id !== socket.id));

            // Tell others this user joined (including the updated client list)
            io.to(roomid).emit('user-joined', socket.id, clients);

            // Send stored messages
            if (message[roomid]) {
                message[roomid].forEach(msg => {
                    socket.emit('chat-message', msg.text, msg.sender);
                });
            }
        });

        socket.on('chat-message', (msgtext, sender) => {
            const roomid = socket.roomid;
            if (!roomid) return;

            if (!message[roomid]) message[roomid] = [];
            message[roomid].push({ text: msgtext, sender });

            io.to(roomid).emit('chat-message', msgtext, sender);
        });

        socket.on('signal', (toId, data) => {
            io.to(toId).emit('signal', socket.id, data);
        });

        socket.on('disconnect', () => {
            if (socket.roomid) {
                const room = io.sockets.adapter.rooms.get(socket.roomid);
                const clientsArray = room ? Array.from(room) : [];

                console.log(`User left: ${socket.id}, room: ${socket.roomid}`);

                // Notify others
                socket.to(socket.roomid).emit('user-left', socket.id, clientsArray);
            }
        });
    });
};

module.exports = initializesocket;
