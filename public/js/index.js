    var socket = io(); //<!-- initiating a request... >
    
    // ES6 will not work on browsers other than chrome.
    socket.on('connect', function() {
        console.log('Connected to server !!');
        
        socket.emit('createMessage', {
            from: 'User2',
            text: 'Hey, this is message from a user'
        });
    });

    socket.on('disconnect', function() {
    console.log('Disconnected from server !! ');
    })  

    socket.on('newMessage', function(message){
        console.log('newMessage !! ', message);
    });

    /*
    // Test code:
    socket.emit('createEmail', {
            to: 'test2@example.com',
            text: 'Hey, created an email'
        });


    socket.on('newEmail', function(email){
        console.log('New Email !! ', email);
    });

    */