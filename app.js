const express = require('express');

// Routers
const { userRouter } = require('./routes/user.routes');
const { gameRoute } = require('./routes/game.routes');
const { consoleRoute } = require('./routes/console.routes');

// Global err controller
const { globalErrorHandler } = require('./controllers/error.controller');

// Utils
const { AppError } = require('./utils/appError');

// Init express app
const app = express();

app.use(express.json());

// Define endpoints

app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gameRoute);
app.use('/api/v1/consoles', consoleRoute);

// Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use(globalErrorHandler);

module.exports =  app ;