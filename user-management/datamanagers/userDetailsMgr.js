let userModel    = require("./../models/userModel")
let userDetailsMgr = require('../datamanagers/userDetailsMgr')
let mongoose = require('mongoose')
let md5     = require('md5');

//function to create a user object
module.exports.addUserDetails = (user) => {
    return new Promise((resolve,reject) => {
        let userData = new userModel()

        if(user.name != undefined)
        userData.name = user.name
    
        if(user.emailId != undefined)
        userData.emailId = user.emailId
    
        if(user.phoneNumber != undefined)
        userData.phoneNumber = user.phoneNumber
        
        if(user.password != undefined)
        userData.password = md5(user.password)

        if(user.address != undefined)
        userData.address = user.address

        if(user.role != undefined)
        userData.role = user.role
    
        userData.save((err) => {
            if(err)
            reject(err)
            else
            resolve(userData)
        })
    })
}

/*----------------------------------------------------------------------*/

//function to get the users list
module.exports.fetchUsers = () => {
    return new Promise((resolve,reject) => {
        userModel.find().exec((err,userData) => {
            if(err) {
                reject(err)
            } else {
                resolve(userData)
            }
        })
    })
}

/*----------------------------------------------------------------------*/

//function to remove user 
module.exports.removeUser = (uId) => {
    console.log(uId)
    return new Promise((resolve,reject) => {
        userModel.findByIdAndDelete(uId).exec((err,result) => {
            console.log(result)
            if(err) {
                reject(err) 
            } else {
                resolve(result)
            }
        })
    })
}

/*----------------------------------------------------------------------*/

//fuction to check isadmin or not
module.exports.isAdmin = (userId) => {
    return new Promise((resolve,reject) => {
        userModel.findById(mongoose.Types.ObjectId(userId)).exec((err,result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

/*----------------------------------------------------------------------*/

module.exports.updateUserDetails = (modifyUserDetails,userId) => {

    return new Promise((resolve, reject) => {
        userModel.findById(modifyUserDetails._id).exec((err, existingUser) => {
            if (err) {
                reject(err)
            } else if (existingUser != null) {
                if(existingUser._id == userId) {

                    console.log(userId)
                    if (modifyUserDetails.name)
                        existingUser.name = modifyUserDetails.name
                    if (modifyUserDetails.emailId)
                        existingUser.emailId = modifyUserDetails.emailId
                    if (modifyUserDetails.address)
                        existingUser.address = modifyUserDetails.address
                    if (modifyUserDetails.phoneNumber)
                        existingUser.phoneNumber = modifyUserDetails.phoneNumber
                    if (modifyUserDetails.password)
                        existingUser.password = md5(modifyUserDetails.password)
                    
                        existingUser.save((err, modifiedUser) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(modifiedUser)
                        }
                    })
                } else {
                    userDetailsMgr.isAdmin(userId).then((res) => {
                        console.log(JSON.stringify(res))
                        if(res.role === 'Admin') {
                            if (modifyUserDetails.name)
                                existingUser.name = modifyUserDetails.name
                            if (modifyUserDetails.emailId)
                                existingUser.emailId = modifyUserDetails.emailId
                            if (modifyUserDetails.address)
                                existingUser.address = modifyUserDetails.address
                            if (modifyUserDetails.phoneNumber)
                                existingUser.phoneNumber = modifyUserDetails.phoneNumber
                            if (modifyUserDetails.password)
                                existingUser.password = md5(modifyUserDetails.password)
                            
                                existingUser.save((err, modifiedUser) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(modifiedUser)
                                }
                            })
                        }
                    })
                }
            } else {
                reject(new Error('you are trying to update other user info.'))
            }
        })
    })
}

/*----------------------------------------------------------------------*/

//fuction to get perticular user details
module.exports.fetchUserById = (userId) => {
    return new Promise((resolve, reject) => {
        userModel.findById(userId).exec((err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}