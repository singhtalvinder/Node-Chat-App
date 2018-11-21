    var socket = io(); //<!-- initiating a request... >
    
// fn to control the scrolling in the chat window.
function scrollToBottom() {
    // selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    
    // height.
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    
    // get second last message.
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

    // ES6 will not work on browsers other than chrome.
    socket.on('connect', function() {
        console.log('Connected to server !!');
        var params = jQuery.deparam(window.location.search);
        
        socket.emit('join', params, function(err) {
            if(err) {
                alert(err);
                window.location.href ='/'; // go back to root page.
            } else {
                console.log('No erro , will connet to corrct rooom');

            }
        });
    });

    socket.on('disconnect', function() {
    console.log('Disconnected from server !! ');
    });

    socket.on('updateUserList', function(users) {
        // get the users array and update the display accordingly.
        console.log('User list :', users);
        var ol = jQuery('<ol> </ol>');
        users.forEach(function(user) {
            ol.append(jQuery('<li> </li>').text(user));
        });

        // render it, replace with a new one everytime.
        jQuery('#users').html(ol);

    });

    socket.on('newMessage', function(message){
        var formattedTime = moment(message.createdAt).format('h:mm:ss a');
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
    });

    socket.on('newLocationMessage', function(message) {
        // Show formatted time for the messages
        var formattedTime = moment(message.createdAt).format('h:mm:ss a');
        console.log('newLocationMessage----- ', message);
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            from: message.from,
            url: message.url,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
    });

    // using jQuery to avoid the page refresh and 
    // not to send the form data as appended content to the url.
    jQuery('#message-form').on('submit', function(e) {
        e.preventDefault();
        var messageTextbox = jQuery('[name=message');

        socket.emit('createMessage', {
            from: 'User',
            text: messageTextbox.val()
        }, function() {
            // acknowledgement func.
            jQuery(messageTextbox).val(''); // clear the content there.
        });
    });

    var locationButton = jQuery('#send-location');
    locationButton.on('click', function() {
        // check if user has access to geolocation api.
        if(!navigator.geolocation) {
            return alert('Your browser doesnot support Geolocation!!');
        }

        // disable the send location btn till it is processing.
        locationButton.attr('disabled', 'disabled').text('Sending location...'); 

        navigator.geolocation.getCurrentPosition(function (position) {
            // success case.
            // remove disabled attribute.
            locationButton.removeAttr('disabled').text('Send location');
            console.log(position);
            // process location latitude and longitude.
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function() {
            // error case 
            // remove disabled attribute.
            locationButton.removeAttr('disabled').text('Send location');;
            alert('Unable to fetch location !! ');
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