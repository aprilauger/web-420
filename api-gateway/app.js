/*
============================================
; Title:  app.js
; Author: April Auger
; Date:   16 October 2019
; Description: Server configurations file for
; 			   an Express application.
;===========================================
*/

// Required modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var header = require('.././header.js');
var apiCatalog = require('./routes/api-catalog');

mongoose.Promise = require('bluebird');

// Output the header to the console
console.log(header.display('April', 'Auger', 'API Gateway Project') + '\n');

// Database Connection String
var mongoDB = "mongodb+srv://admin:admin@buwebdev-cluster-1-bzl71.mongodb.net/api-gateway?retryWrites=true&w=majority";

// Database connection
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, promiseLibrary: require('bluebird')})
.then ( () =>
	console.log('Connection successful')
)
.catch( (err) =>
	console.error(err)
);

// Create new Express application
var app = express();

// Register the API Catalog's routes
app.use('/api', apiCatalog);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
