const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Handle connection
io.on('connection', (socket) => {
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    console.log('A user connected',
        formattedTime
    );

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('reply', () => { console.log("a reply detected!") });

    // Handle chat message event
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
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
