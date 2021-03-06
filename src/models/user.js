const Database = require('./database');

class User extends Database{
    constructor() {
        super();
        this.useCollection('users');
        console.log('User model...');
    }
}

module.exports = new User();