/*
============================================
; Title:  authController.js
; Author: April Auger
; Date:   25 October 2019
; Description: Orchestrates messages between
;              service calls and Mongo database.
;===========================================
*/

// Required modules
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// Request to register a user
exports.user_register = function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    });

	// Add a user to the database
    User.add(newUser, (err, user) => {
        if (err)
            return res.status(500).send('There was a problem registering the user.');

        var token = jwt.sign({ id: user._id}, config.web.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });
};

// Request to Login user
exports.user_login = function(req, res) {
	User.getOne(req.body.email, function(err, user) {
		if (err) return res.status(500).send('Error on server.');
		if (!user) return res.status(404).send('No user found.');

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

		if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

		var token = jwt.sign({id: user._id}, config.web.secret, {
			expiresIn: 86400 // Expires in 24 hours
		});

		res.status(200).send({auth:true, token: token});
	});
};

// Request to Logout users
exports.user_logout = function(req, res) {
	res.status(200).send({ auth:false, token: null });
};

// Verify token on GET
exports.user_token = function(req, res) {
    User.getById(req.userId, function(err, user) {
		// Handle error
		if (err) return res.status(500).send('There was a problem finding the user.');

		// Handle user not found
		if (!user) return res.status(404).send('No user found.');

		res.status(200).send(user);
	});
};