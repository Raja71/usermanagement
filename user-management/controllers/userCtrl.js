let express         = require('express')
let router          = express.Router()
let userMgr         = require('../datamanagers/userMgr')
let msg             = require('../helpers/messages')

/*-----------------------------------------------------------------------------------------------------------*/
//API to signup as new user
router.post('/signUp', (req, res) => {
    let userData = req.body
    try {
        //check if email already registred
        userMgr.isEmailExist(userData.emailId).then((result) => {
                if (result != null && result.emailId === userData.emailId) {
                    res.status('500').send(msg.messages.error.emailExists)
                } else {
                    //if email not registred user can able to register
                    userMgr.addUser(userData)
                        .then((userData) => {
                            res.status('200').send(userData)
                            res.send(msg.messages.success.userCreationSucc)
                        }
                    )
                }
            })
            .catch((err) => {
                console.log('errors ' + err);
                res.send(err)
            })
    } finally {
        console.log('.................................................................');
    }
})

//------------------------------------------------------------------------------------
//API to login
router.post('/signIn', (req, res) => {
    let userData = req.body
    console.log("userData", userData)
    try {
        userMgr.signin(userData)
            .then((userData) => {
                res.status('200').send(userData)
            })
            .catch((err) => {
                console.log('errors ' + err);
                res.status("400").send(err)
            })
    } finally {
        console.log('.................................................................');
    }
})

module.exports = router;

