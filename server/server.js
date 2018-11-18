const express = require('express');
const http = require('http'); // No need to install it as its a built-in module.
const path = require('path'); // No need to install it as its a built-in module.
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

// path helps in handling directories in a very effecient manner.
const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// setup public middleware folder.
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected !! ');

    // Welcome message for the chat .
    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app !!'));
    

    // Chat update message.
    socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));

    socket.on('disconnect', () => {
        console.log('Client disconnected from server !! ');
    });

    socket.on('createMessage', (message, callback) => {
        console.log('Created Message:', message);
       
        // Emit message to every connected user.
        // but not to itself.
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');

    });

    // Pass location info back and forth between users.
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', 
        generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    /*socket.on('disconnect', () => {
        console.log('Client disconnected from server !! ');
    });*/
});

server.listen(port, () =>
{
    console.log(`Server started at port ${port} `);
});

/*
// TEST code
// register for events.
// Listen for individual connection on a socket.
io.on('connection', (socket) => {
    console.log('New user connected !! ');
    socket.emit('newEmail',{
        from: 'abc@example.com',
        text: ' Hey, my first email.',
        createdAt: 234
    });

    socket.on('createEmail', (newEmail) =>{
        console.log('Created Email', newEmail);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected from server !! ');
    });
});


*/