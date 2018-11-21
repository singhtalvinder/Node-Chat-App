// Users class to store all the chat users.
class Users {
    constructor() {
        this.users = []; // array of users.
    }

    // Add users.
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
    }

    removeUser(id) {
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id);

        }
        return user;

    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }

    //List of users in a chat room.
    getUserList(room) {
        // ES6
        var users = this.users.filter((user)=>user.room === room)
        var namesArray = users.map((user)=>user.name)

        /* old way
        var users = this.users.filter((user)=>{
            return user.room === room;
        });

        var namesArray = users.map((user)=>{
            return user.name;
        });
        */
      
        return namesArray;
    }
}

// Export the class.
module.exports = {Users};