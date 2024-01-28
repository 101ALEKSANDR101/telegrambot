const { Sequelize } = require('sequelize');


module.exports = new Sequelize(
	'bot',
	'postgres',
	'alex200686',
	{
		host: 'localhost',
		port: '5432',
		dialect: 'postgres'
	}
)