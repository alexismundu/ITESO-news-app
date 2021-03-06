const { User } = require('./../models');

class UserController {
    findAll(req, res) {
        User.find({}, (err, results) => {
            if (err) {
                console.log('Failed fetching users');
                return;
            };
            res.send(results);
        });
    }

    async addUser(req, res) {
        const { username, email, password} = req.body;
        if (!req.file) { res.end('File not supported'); return; }
        if (!username || !email || !password) { res.end('Some fields are missing'); return; }
        User.insertOne(req.body, (err, result) => {
            if (err && err.code === 11000) {
                res.end('The emil you entered is already registered')
                return;
            }else if(err){
                res.end('Something went wrong :(');
                return;
            };
            res.end('User successfully created! :)');
        })

    }
}


module.exports = new UserController();