
/*
============================================
; Title:  user.js
; Author: April Auger
; Date:   25 October 2019
; Description: The user schema and model.
;===========================================
*/

// Required modules
var mongoose = require('mongoose');

// Define a schema
var Schema = mongoose.Schema;

// Create the user schema
var UserSchema = new Schema({
	username: {type: String, require: true},
	password: {type: String, required: true},
	email: {type: String, required: true}
}, {
	collection: "users"
});

// Attach the UserSchema to a User Model
var User = mongoose.model('User', UserSchema);

// Make the model available for other modules to require
module.exports = User;