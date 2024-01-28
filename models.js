const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true },
	chatId: { type: DataTypes.INTEGER, unique: true },
	rights: { type: DataTypes.INTEGER, defaultValue: 0 },
	wrongs: { type: DataTypes.INTEGER, defaultValue: 0 },
},
	{
		timestamps: false
	});

module.exports = User;