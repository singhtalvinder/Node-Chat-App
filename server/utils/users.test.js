const expect = require('expect');

const {Users} = require('./users');

describe('Users Class', () =>{

    var users;
    beforeEach(() =>{
        users = new Users();
        users.users = [{
            id: '123',
            name: 'Jill',
            room: 'Coders'
        },
        {
            id: '334',
            name: 'Mary',
            room: 'Bikers'
        },
        {
            id: '181',
            name: 'Abhi',
            room: 'Coders'
        }];

    });

    it('should add a new user', () =>{
        var users = new Users();
        var user = {
            id: 1234,
            name:'user3',
            room:'The Coders'
        };
        
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]); // objects and arrays to be tested with toEqual.
    });

    
    it('Should remove a user', () =>{
        var userId = '123';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);

    });

    it('Should not remove a user', () =>{
        var userId = '23';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();//toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('Should find user', () =>{
        var userId = '123';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('Should not find user', () =>{
        var userId = '87';
        var user = users.getUser(userId);
        expect(user).toBeFalsy();//toNotExist();
    });

    // check users in a room.
    it('Should return names for coders room', () =>{
        var userList = users.getUserList('Coders');

        expect(userList).toEqual(['Jill', 'Abhi']);
    });

    it('Should return names for bikers room', () =>{
        var userList = users.getUserList('Bikers');

        expect(userList).toEqual(['Mary']);
    });

});