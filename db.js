const { Sequelize } = require('sequelize');


module.exports = new Sequelize(
	'telegrambot',
	'root',
	'root',
	{
		host: 'lmaster.13ce5085-5114-487e-8fbd-5c5d5236d8be.c.dbaas.selcloud.ru',
		port: '5432',
		dialect: 'postgres'
	}
)