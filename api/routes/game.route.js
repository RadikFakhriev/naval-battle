const express = require('express');
const app = express();
const gameRoutes = express.Router();

let Game = require('../models/Game');

// Defined store route
gameRoutes.route('/create').post(function (req, res) {
  console.log(req.body);
  let game = new Game(req.body);
  game.save()
    .then(game => {
      res.status(200).json({'Game': 'game created successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
  

module.exports = gameRoutes;