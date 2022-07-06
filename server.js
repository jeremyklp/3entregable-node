const app = require('./app');

// Models
const { Games } = require('./models/games.model');
const { Consoles } = require('./models/consoles.model');
const { Reviews } = require('./models/reviews.model');
const User = require('./models/user.model')
//const {GamesInConsoles}= require ('./models/gamesInConsoles.model')
// Utils
const { db } = require('./utils/database.util');
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

// Database authenticated
db
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

// Init models relations
Games.belongsToMany(Games, { foreignKey: 'gameId', through: 'gamesInConsoles', as: 'consoles' });
Consoles.belongsToMany(Consoles, { foreignKey: 'consoleId', through: 'gamesInConsoles', as: 'games' });


User.hasMany(Reviews, { foreignKey: 'userId' });
Reviews.belongsTo(User);

Games.hasMany(Reviews, { foreignKey: 'gameId' });
Reviews.belongsTo(Games);
// Database synced with models' relations
db
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

// Spin up server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});
