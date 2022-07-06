//const { Sequelize} = require('sequelize');


// Models
const { Games } = require('../models/games.model');
const { Reviews } = require('../models/reviews.model');
const { GamesInConsoles } = require('../models/gamesInConsoles.model');
const {Consoles}= require ('../models/consoles.model')

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getAllGames = catchAsync(async (req, res, next) => {
	const game = await Games.findAll({
		where: { status: 'active' },
		include:[
			
			
		{ model: GamesInConsoles, attributes: ['id','consoleId'], 
			include:[{model: Consoles, attributes: ['id','name'] }]}, 
		
		
		{model: Reviews, attributes: ['id','comment']}],
	});

	res.status(200).json({
		status: 'success',
		data: { game },
	});
});

const createGames = catchAsync(async (req, res, next) => {
	const { title, genre } = req.body;

	const newGames = await Games.create({
		title,
		genre
		
		
	});

	res.status(200).json({
		status: 'success',
		data: { newGames },
	});
});

const updateGames = catchAsync(async (req, res, next) => {
	const { games } = req;
	const { title} = req.body;

	await games.update({ title});

	res.status(204).json({ status: 'success' });
});

const deleteGames = catchAsync(async (req, res, next) => {
	const { games } = req;

	await games.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const createComment = catchAsync(async (req, res, next) => {
	const { userId, gameId, comment } = req.body;

	const newComment = await Reviews.create({
		userId,
		gameId,
		comment
	});

	res.status(201).json({
		status: 'success',
		newComment,
	});
});

module.exports = {
	getAllGames,
	createGames,
	updateGames,
	deleteGames,
	createComment
};