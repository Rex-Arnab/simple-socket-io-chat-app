const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);


// Handle connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Handle chat message event
    socket.on('message', (msg) => {
        if (msg === 'hi') {
            io.emit('message', 'Hello!');
        } else if (msg === 'bye') {
            io.emit('message', 'Goodbye bhai!');
        }
    });

    // make echo event
    socket.on('echo', (data) => {
        console.log('Data received:', data);
        // Emit data back to the client
        io.emit('echo', data);

    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
