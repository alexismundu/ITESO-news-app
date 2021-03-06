const { User } = require('./../models');

class UserController {
    findAll(req, res){
        User.find({}, (err, results) => {
            if (err) { 
                console.log('Failed fetching users'); 
                return; 
            };
            res.send(results);
        });
    }
}

module.exports = new UserController();