const express = require('express');

// Controllers
const {
	getAllConsoles,
	createConsoles,
	updateConsoles,
    deleteConsoles
} = require('../controllers/consoles.controller');


const {protectSession, protectUserAccount}= require('../midlewares/auth.middleware')
const {createUserValidators}= require('../midlewares/validators.middleware')
const {userExists}= require('../midlewares/users.middleware')

const consoleRoute = express.Router();

consoleRoute.get('/', getAllConsoles);


consoleRoute.use(protectSession)

consoleRoute.post('/', createConsoles);

consoleRoute.patch('/:id', updateConsoles);

consoleRoute.delete('/:id', deleteConsoles);




module.exports = { consoleRoute };