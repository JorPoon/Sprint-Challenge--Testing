//server testing done before server routing handlers

const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');
const games = require('../games/gamesModel.js');

describe('server.js', () => {
    afterEach(async () => {
        await db('games').truncate();
    })

    describe('GET /games', () => {
        it('should respond with 200 OK', async () => {
            const response = await request(server).get('/games');
            
            expect(response.status).toBe(200)
            
        })

        it('should return JSON', async () => {
            const response = await request(server).get('/games');

            expect(response.type).toBe('application/json');
              
          });

        it(' should return an empty array', async () => {
            const response = await request(server).get('/games');

            expect(response.body).toHaveLength(0)
                // truncating makes it 0 
            
        })

        it(' should return an empty array', async () => {
            games.insert({name: 'Epic Seven', genre: 'RPG', year: 2018})
            games.insert({name: 'Fate Grand Order', genre: 'RPG', year: 2015})
            games.insert({name: 'Fire Emblem Heroes', genre: 'RPG', year: 2017})

            const response = await request(server).get('/games');

            expect(response.body).toHaveLength(3)
                // truncating makes it 0 
            
        })
    })

    describe('POST /games', () => {
        it('should return status 201', async () => {
            const game = { name: 'Dynasty Warriors', genre: 'Hack and Slash', year: 2007 };
      
            let response = await request(server)
              .post('/games')
              .send(game);
            expect(response.status).toBe(201);
          });


          it('returns the new game', async () => {
            const game = { name: 'Dynasty Warriors', genre: 'Hack and Slash', year: 2007 };
            
      
            let response = await request(server)
              .post('/games')
              .send(game);
            expect(response.body).toEqual({ id: 1, name: 'Dynasty Warriors', genre:'Hack and Slash', year: 2007 });
          });

          it('returns status 422 if incomplete information', async () => {
            const game = { notname: 'Dynas' };
      
            let response = await request(server)
              .post("/games")
              .send(game);
      
            expect(response.status).toBe(422);
          });
    })
})