
let mongoose = 				require('mongoose');

// Create a user schema
let Schema = mongoose.Schema;
let userSchema = new Schema({
	  name : 			      	{ type : String, required : true }, // Name for the app
    emailId :           { type : String, required : true },
    password :          { type : String, required : true },
    role :              { type : String, required : false, default: 'user'},
    phoneNumber:        { type : String, required : true },
    address :           { type : String, required : false},
  	creationDate : 			Date,
    modifiedDate : 			Date

});


// on every save, update the created/modified date
userSchema.pre('save', function(next) {
  // get the current date
  let currentDate = new Date();

  // change the modified field to current date
  this.modifiedDate = currentDate;

  // if createdDate doesn't exist, add to that field
  if (!this.creationDate)
    this.creationDate = currentDate;

  next();
});


// Create a Model
var User = mongoose.model('User', userSchema);


// Make TapEventApp available everywhere in the app
module.exports = User;
