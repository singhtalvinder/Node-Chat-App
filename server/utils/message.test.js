const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () =>{
    it('should generate correct message object', () =>{
        var from = 'jim';
        var text = 'some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        
        expect(message).toMatchObject({
            from: 'jim',
            text: 'some message'
            });
    });

});

describe('generateLocationMessage', () =>{
    it('should generate correct Location object', () =>{
        var from = 'user-10';
        var latitude = 43;
        var longitude = -79;
        var url = 'https://www.google.com/maps?q=43,-79';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        
        expect(message).toMatchObject({
            from: 'user-10',
            url: url
            });
    });
});