/**
 * Created by Kayvon Rahimi on 13-6-2017.
 */
//Initialize components.
var http = require('http');
var express = require('express');
var config = require('./config.json');
var bodyParser = require('body-parser');
var routes_v1 = require('./routes/routes_v1');
var auth_routes_v1 = require('./routes/authentication.routes.v1');
var db = require('./db/db_connector');

var app = express();

var expressJWT = require('express-jwt');

// Bodyparser lets you use the body from a request, which contains the content of a post request
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(expressJWT({
    secret: config.secretkey
}).unless({
    path: ['/api/v1/login']
}));

// app configuration

//Set the port for the server by fetching it from config.json
app.set('PORT' , config.webPort);
var port = process.env.PORT || app.get('PORT');


//Log each endpoint URL when queried and the request-type.
app.get( '*' , function(req, res, next){
    //example = GET + /hi, POST + /about
    console.log(  "Method type: " + req.method + " on URL:  " + req.url );
    next();
});

// About the server
app.get('/about', function(request, response){
    response.send('This project serves as practice for programming classes.' + '\n'  +
        'This server is currently hosted on port ' + port );
});

//Preprocessor route om te testen of gebruiker ingelogd is
app.use('*', function (req, res, next) {
    // console.log etc....
    next();
});

//installeer routes

app.use(function (err, req, res, next) {
    console.dir(err);
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).send(error);
});

// Fallback voor als geen enkele route werkt
app.use('*', function(req, res) {
    res.status(400);
    res.json({
        'error': 'URL niet beschikbaar.'
    });
});

// Installatie klaar; start server
app.listen(port, function () {
   console.log('The Rent-A-Film server is listening on port ' + port );
});








module.exports = app;