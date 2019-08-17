const express = require('express');
const app = express();
const playerRoutes = express.Router();

let Player = require('../models/Player');


// Defined store route
playerRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let player = new Player(req.body);
  player.save()
    .then(player => {
      res.status(200).json({'player': 'player in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
  

module.exports = playerRoutes;