// Models
const  User  = require('../models/user.model');
const { Reviews } = require('../models/reviews.model');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');




dotenv.config({path:'./config.env'})





const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		where: { status: 'active' },
		include: [{ model: Reviews }],
	});

	res.status(200).json({
		status: 'success',
		data: { users },
	});
});

const createUser = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	const newUser = await User.create({
		name,
		email,
		password,
		
	});

	res.status(200).json({
		status: 'success',
		data: { newUser },
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name, email} = req.body;

	await user.update({ name, email});

	res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate credentials (email)
	const user = await User.findOne({
		where: {
			email,
			status: 'active',
		},
	});

	if (!user) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '3h',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	login
};