// models
const {Consoles}= require ('../models/consoles.model')
const { Games } = require('../models/games.model');
const { GamesInConsoles } = require('../models/gamesInConsoles.model');
// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getAllConsoles = catchAsync(async (req, res, next) => {
	const console = await Consoles.findAll({
		where: { status: 'active' },
		include:[
			
			
		{ model: GamesInConsoles, attributes: ['id','gameId'], 
			include:[{model: Games, attributes: ['id','title'] }]}, 
		
		
		],
	});

	res.status(200).json({
		status: 'success',
		data: { console },
	});
});

const createConsoles = catchAsync(async (req, res, next) => {
	const { name, company } = req.body;

	const newConsoles = await Consoles.create({
		name,
		company
		
		
	});

	res.status(200).json({
		status: 'success',
		data: { newConsoles },
	});
});

const updateConsoles = catchAsync(async (req, res, next) => {
	const { console } = req;
	const { name} = req.body;

	await console.update({ name});

	res.status(204).json({ status: 'success' });
});

const deleteConsoles = catchAsync(async (req, res, next) => {
	const { console } = req;

	await console.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});



module.exports = {
	getAllConsoles,
	createConsoles,
	updateConsoles,
    deleteConsoles
};