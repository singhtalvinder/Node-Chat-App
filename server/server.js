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

io.on('connection', (socket) => {
    console.log('New user connected !! ');

    // Welcome message for the chat .
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'welcome to the chat app !!'
    });

    // Chat update message.
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'new user joined',
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected from server !! ');
    });

    socket.on('createMessage', (message) => {
        console.log('Created Message:', message);
                
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // Emit message to every connected user.
        // but not to itself. 
        /*
        socket.broadcast.emit('newMessage',  {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        */
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