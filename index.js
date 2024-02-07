const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());

const messages = []

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

    socket.on('reply', () => {
        console.log("a reply detected!")
        socket.emit("message", messages)
    });

    // Handle chat message event
    socket.on('message', (msg) => {
        console.log('Message received:', msg);

        messages.push(msg)

        if (data === 'hi') {
            io.emit('message', 'Hello!');
        } else if (data === 'bye') {
            io.emit('message', 'Goodbye bhai!');
        } else {
            io.emit('message', msg)
        }

    });


});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
