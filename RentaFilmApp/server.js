/**
 * Created by Kayvon Rahimi on 13-6-2017.
 */
//Initialize components.
var http = require('http');
var express = require('express');
var config = require('./config.json');

var app = express();

//Set the port for the server by fetching it from config.json
app.set('PORT' , config.webPort);
var port = process.env.PORT || app.get('PORT');


//Log each endpoint URL when queried and the request-type.
app.get( '*' , function(req, res, next){
    //example = GET + /hi, POST + /about
    console.log(  "Method type: " + req.method + " on URL:  " + req.url );
    next();
});

app.get('/about', function(request, response){
    response.send('This project serves as practice for programming classes.' + '\n'  +
        'This server is currently hosted on port ' + port );
});



app.listen(port, function () {
   console.log('The Rent-A-Film server is listening on port ' + port );
});








module.exports = app;