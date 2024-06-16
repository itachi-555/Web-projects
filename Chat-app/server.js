const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

let users = {};

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('setUsername', (username) => {
        users[socket.id] = username;
        io.emit('userList', users);
    });

    socket.on('privateMessage', (data) => {
        const { receiverId, message } = data;
        io.to(receiverId).emit('privateMessage', {
            message,
            from: users[socket.id]
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        delete users[socket.id];
        io.emit('userList', users);
    });
});

app.use(express.static('public'));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
