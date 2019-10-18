/*
============================================
; Title:  index.js
; Author: April Auger
; Date:   16 October 2019
; Description: The application routes.
;===========================================
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
