    var socket = io(); //<!-- initiating a request... >
    
    // ES6 will not work on browsers other than chrome.
    socket.on('connect', function() {
        console.log('Connected to server !!');
    });

    socket.on('disconnect', function() {
    console.log('Disconnected from server !! ');
    });

    socket.on('newMessage', function(message){
        console.log('newMessage !! ', message);
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);
        jQuery('#messages').append(li);
    });

    /*
     //Not needed
     socket.emit('createMessage', {
        from: 'Mark',
        text: 'Hello there!!'
    }, function(data){ // data is what is returned from the callback of the 
        //socket.on('createMessage',  method in the server.
        console.log('Got the message', data);
    });
    */

    // using jQuery to avoid the page refresh and 
    // not to send the form data as appended content to the url.
    jQuery('#message-form').on('submit', function(e) {
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: jQuery('[name=message]').val()
        }, function() {
            // acknowledgement func.
        });
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