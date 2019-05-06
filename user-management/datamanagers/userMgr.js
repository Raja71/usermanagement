
let User    = require("./../models/userModel")
let md5     = require('md5');
let msg     = require('../helpers/messages')

//to create new user object
module.exports.addUser = (userData) => {
    return new Promise((resolve, reject) => {

        let user = new User();

        if (userData.name != undefined)
            user.name = userData.name;
        if (userData.emailId != undefined)
            user.emailId = userData.emailId;

            //md5 is used to encrypt the password
        if (userData.password != undefined)
            user.password = md5(userData.password);

        // call save method to save user object to the database
        user.save(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    })
};


///------------------------------------------------------------------------------------

//signIn
module.exports.signin = (userData) => {
    return new Promise((resolve, reject) => {
        //find the user object and match the email and password
        User.findOne({'emailId': userData.emailId}).exec((err, user) => {
                if (err) {
                    reject(err)
                } else if (user) {
                    if (user.emailId === userData.emailId && user.password === md5(userData.password)) {
                        resolve(msg.messages.success.login)
                    } else {
                        reject(new Error(msg.messages.error.invalidData))
                    }
                } else {
                    reject(new Error(msg.messages.error.notRegistred))
                }
            }
        )
    })
};

//fuction to check if the email already registred or not
module.exports.isEmailExist = (email) => {
    return new Promise((resolve,reject) => {
        User.findOne({'emailId': email}).exec((err,result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}