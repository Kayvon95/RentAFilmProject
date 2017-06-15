/**
 * Created by Lars on 15-6-2017.
 */
<<<<<<< HEAD
var express = require('express');
var routes = express.Router();
var db = require('../db/db_connector');

routes.get('*', function (req, res) {
    res.contentType('application/json');
    res.status(200);
    res.json({
        'welkom' : 'hallo!'
    });
});

module.exports = routes;
=======
//Dit bestand bevat de endpoints die de logica van de interactie met de database bevat

>>>>>>> origin/feature-server
