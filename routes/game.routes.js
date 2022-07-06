const express = require('express');

// Controllers
const {
	getAllGames,
	createGames,
	updateGames,
	deleteGames,
    createComment
} = require('../controllers/games.controller');


const {protectSession, protectUserAccount}= require('../midlewares/auth.middleware')
const {createUserValidators}= require('../midlewares/validators.middleware')
const {userExists}= require('../midlewares/users.middleware')

const gameRoute = express.Router();

gameRoute.get('/', getAllGames);


gameRoute.use(protectSession)

gameRoute.post('/', createGames);

gameRoute.patch('/:id', updateGames);

gameRoute.delete('/:id', deleteGames);

gameRoute.post('/reviews/:gameid', createComment );



module.exports = { gameRoute };