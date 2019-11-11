
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
    username: String,
    password: String,
    email: String
});

// Attach the UserSchema to a User Model
const User = mongoose.model('User', UserSchema);

// Make the model available for other modules to require
module.exports = User;

/**
 Database queries
 */
// Adds a new user to the database
module.exports.add = (user, callback) => {
    user.save(callback);
};

// Find a user in the database by their id
module.exports.getById = (id, callback) => {
    var query = {_id: id};
    User.findById(query, callback);
};