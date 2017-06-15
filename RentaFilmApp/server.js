/**
 * Created by Kayvon Rahimi on 13-6-2017.
 */
//Initialiseer de hoofdcomponenten van de server-applicatie.
var http = require('http');
var express = require('express');
var config = require('./config.json');
var bodyParser = require('body-parser');
var routes_v1 = require('./routes/routes_v1');
var auth_routes_v1 = require('./routes/authentication.routes.v1');
var expressJWT = require('express-jwt');

var db = require('./db/db_connector');

var app = express();

// Bodyparser om informatie uit een post-request te kunnen verwerken in de logica van endpoints.
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

//Laat de server gebruik maken van JWT, haal de secret key op uit config.
app.use(expressJWT({
    secret: config.secretkey
}).unless({
    path: ['/api/v1/login']
}));

// app configuration

//Set the port for the server by fetching it from config.json
app.set('PORT' , config.webPort);
var port = process.env.PORT || app.get('PORT');


//Deze methode logt elke request type + url in de console.
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