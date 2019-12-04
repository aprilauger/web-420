/*
============================================
; Title:  api-catalog.js
; Author: April Auger
; Date:   25 October 2019
; Description: Hosts HTTP request routes.
;===========================================
*/

/**
 * API Routes
 */
var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');
var checkToken = require('../check-token');

// POST request to register a user
router.post('/auth/register', auth_controller.user_register);

// POST request to login a user
router.post('/auth/login', auth_controller.user_login);

// POST request to logout a user
router.get('/auth/logout', auth_controller.user_logout);

// GET request to verify user token
router.get('/auth/token', checkToken, auth_controller.user_token);

// Make the module available for other modules to require
module.exports = router;