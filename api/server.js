const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());



server.get('/games', async (req, res) => {
  const Games = await games.getAll();

  res.status(200).json(Games);
});


server.post('/games', async (req, res) => {
    const game = req.body;
  if(!req.body.name) {
    return res.status(422).json({ message: 'Complete Name' });
  }
    try {
      const addGame = await games.insert(game);
      res.status(201).json(addGame);
    } catch (error) {
      res.status(500).json({ error: `There be an ${error}` });
    }
  });

module.exports = server;