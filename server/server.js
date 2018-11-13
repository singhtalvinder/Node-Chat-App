const express = require('express');
const http = require('http'); // No need to install it as its a built-in module.
const path = require('path'); // No need to install it as its a built-in module.
const socketIO = require('socket.io');

// path helps in handling directories in a very effecient manner.
const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// setup public middleware folder.
app.use(express.static(publicPath));

// register for events.
// Listen for individual connection on a socket.
io.on('connection', (socket) => {
    console.log('New user connected !! ');

    socket.on('disconnect', () => {
        console.log('Client disconnected from server !! ');
    });
});


server.listen(port, () =>
{
    console.log(`Server started at port ${port} `);
});

