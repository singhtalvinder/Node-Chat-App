const express = require('express');
const http = require('http'); // No need to install it as its a built-in module.
const path = require('path'); // No need to install it as its a built-in module.
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const {isRealString} = require('./utils/validation');

const {Users} = require('./utils/users');

// path helps in handling directories in a very effecient manner.
const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

// setup public middleware folder.
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected !! ');

    // Join a chat room.
    socket.on('join', (params, callback) =>{
        // If invalid data return.
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required to join!!');
        }

        // Let user join a room and remove it from the other rooms(if any).
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);        

        // Welcome message for the chat. for joining user.
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', 
            generateMessage('Admin', 'welcome to the chat app !!'));
    
        // Chat update message.Broadcast to everyone connected to the
        // socket server, except current user.
        socket.broadcast.to(params.room).emit('newMessage',
            generateMessage('Admin',`${params.name} joined`));

        callback();
    })

    // Disconnect.
    socket.on('disconnect', () => {
        console.log('Client disconnected from server !! ');
        //store the removed user.
        var user =users.removeUser(socket.id);
        if(user) {
             // update user list
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            
            // update the leaving message.
            io.to(user.room).emit('newMessage', 
                generateMessage('Admin',`${user.name} has left the room.`)); 
        }
    });

    // chat messages.
    socket.on('createMessage', (message, callback) => {
        console.log('Created Message:', message);
       
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            // Emit message to every connected user.
            // but not to itself.
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback();//This is from the server');

    });

    // Pass location info back and forth between users.
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit('newLocationMessage', 
                generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
});

server.listen(port, () =>
{
    console.log(`Server started at port ${port} `);
});
