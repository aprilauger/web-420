/*
============================================
; Title:  config.js
; Author: April Auger
; Date:   16 October 2019
; Description: Global hub for application
;			   level configurations.
;===========================================
*/

var config = {};
config.web = {};
config.web.port = process.env.PORT || '3000';

// Public key set to plain text for development mode
config.web.secret = 'topsecret';

// Make the module available for other modules to require
module.exports = config;