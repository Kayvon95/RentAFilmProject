/**
 * Created by Lars on 15-6-2017.
 */
//Dit bestand bevat de endpoints die de logica van de interactie met de database bevat
var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../db/db_connector');

//Test cities
router.get('/test', function(req, res){
    res.send('Testresults.');
});

//Endpoint voor de registratie van nieuwe gebruikers/klanten
router.post('register', function (req, res){
    var customer = {

    };

});

//Endpoint om films op te zoeken door hun unieke ID op te geven.
router.get('/films/:filmid', function (req, res){
    var filmid = req.params.filmid;
    var query_str;

    if (filmid) {
        query_str = 'SELECT * FROM film WHERE film_id = "' + filmid + '";';
    } else {
        res.status(404);
        res.json({ "description" : "404 - Response not found.    Wrong parameter, please check your URL again and verify your film id."});
    }

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });
});

//Endpoint om alle uitgeleende films van een huurder te bekijken d.m.v. het opgeven van een userID.
router.get('/rentals/:userid', function(req, res){
    var userid = req.params.userid;
    var query_str;

    if (userid) {
        query_str = 'SELECT film.film_id FROM film, inventory, rental, customer ' +
                'WHERE film.film_id = inventory.film_id ' +
                'AND inventory.inventory_id = rental.inventory_id ' +
                'AND rental.customer_id = customer.customer_id ' +
                'AND customer.customer_id = "' + userid + '" ;';

    } else {
        res.status(404);
        res.json({ "description" : "404 - Response not found.    Wrong parameter, please check your URL again and verify your submitted customer id."});
    }

    pool.getConnection(function (err, connection) {
        if (err) {
            throw err
        }
        connection.query(query_str, function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err
            }
            res.status(200).json(rows);
        })
    });

});

module.exports = router;
