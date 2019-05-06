let express           = require('express')
let router            = express.Router()
let userDetailsMgr    = require('../datamanagers/userDetailsMgr')
let msg               = require('../helpers/messages')
let emailValidation = require('../datamanagers/userMgr')

//API to add the user details by Admin
router.post('/userDetails', (req, res) => {
    let userId = req.headers['userid']
    let user = req.body
    try {
        emailValidation.isEmailExist(user.emailId).then((response) => {
                if (response != null && response.emailId === user.emailId) {
                    res.status('500').send(msg.messages.error.emailExists)
                } else {
                    //only admin can create user
                    userDetailsMgr.isAdmin(userId).then((isAdmin) => {
                        if (isAdmin != null && isAdmin.role === 'Admin') {
                            userDetailsMgr.addUserDetails(user)
                                .then((userData) => {
                                    res.status('200').send(userData)
                                })
                        } else {
                            res.status('500').send(msg.messages.error.notAdmin)
                        }
                    })
                }
            })

            .catch((err) => {
                console.log('errors ' + err);
                res.send(err)
            })
    } finally {
        console.log('.............');
    }
})

/*----------------------------------------------------------------------*/

//get list of users
router.get('/userDetails', (req, res) => {
    let headers = req.headers
    let adminId = headers['adminid']
    try {
        userDetailsMgr.isAdmin(adminId).then((isAdmin) => {
            console.log(JSON.stringify(isAdmin))
                if (isAdmin != null && isAdmin.role === 'Admin') {
                    userDetailsMgr.fetchUsers().then((userDetails) => {
                        if (userDetails != null) {
                            res.status('200').send(userDetails)
                        } else {
                            res.status('201').send(msg.messages.error.userNotFound)
                        }
                    })
                } else {
                    res.status('500').send(msg.messages.error.notAdmin)
                }
            })
            .catch((err) => {
                console.log(err)
                res.status('500').send(err)
            })
    } finally {
        console.log('----')
    }
})

/*----------------------------------------------------------------------*/

//API to delete the pericular user by admin
router.delete('/userDetails', (req, res) => {
    let headers = req.headers
    let objectId = headers['objectid']
    let userId = headers['userid']
    try {
        userDetailsMgr.isAdmin(userId).then((isAdmin) => {
                if (isAdmin != null && isAdmin.role === 'Admin') {
                    userDetailsMgr.removeUser(objectId).then((userDetails) => {
                        if (userDetails) {
                            res.status('200').send(msg.messages.success.deleteSuccess)
                        } else {
                            res.status('201').send(msg.messages.error.userNotFound)
                        }
                    })
                } else {
                    res.status('400').send(msg.messages.error.notAdmin)
                }
            })
            .catch((err) => {
                console.log(err)
                res.status('500').send(err)
            })
    } finally {
        console.log('----')
    }
})

/*----------------------------------------------------------------------*/

//API to get user by id
router.get('/user/details', (req, res) => {
    let headers = req.headers
    let userId = headers['userid']
    try {
        userDetailsMgr.fetchUserById(userId).then((userDetails) => {
                if (userDetails != null) {
                    res.status('200').send(userDetails)
                } else {
                    res.status('400').send(msg.messages.error.userNotFound)
                }
            })
            .catch((err) => {
                console.log(err)
                res.status('500').send(err)
            })
    } finally {
        console.log('----')
    }
})

/*----------------------------------------------------------------------*/

//API to update perticular user by admin
router.put('/modifyUserDetails', (req, res) => {
    let userId = req.headers['userid']
    let userData = req.body
    try {

        userDetailsMgr.updateUserDetails(userData,userId).then((userDetails) => {
                console.log(JSON.stringify(userDetails))
                if (userDetails != null) {
                    res.status('200').send(msg.messages.success.updateSuccess)
                } else {
                    res.status('400').send(msg.messages.error.userNotFound)
                }
            })

            .catch((err) => {
                console.log(err)
                res.status('500').send(err)
            })
    } finally {
        console.log('----')
    }
})

/*-----------------------------------------------------------------------------*/

module.exports = router