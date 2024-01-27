

const token = '6614873465:AAFRpRzJMncMAWWbsyzCE7OnBxZmszOeiis';
const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');
const bot = new TelegramApi(token, { polling: true });



const chats = {}

bot.setMyCommands([
	{ command: '/start', description: 'Начало работы ботаб, приветствие' },
	{ command: '/game', description: 'Начало игры в угадай число' },
]);

const startGame = async (chatId, name) => {
	await bot.sendMessage(chatId, `${name}, сыграем в игру, я загадаю число, а ты попробуй отгадать`);
	const randomNumber = Math.floor(Math.random() * 10);
	chats[chatId] = randomNumber;
	return await bot.sendMessage(chatId, `Отгадывай!`, gameOptions);
}

const start = async () => {
	bot.on('message', async msg => {
		const data = msg.text;
		const chatId = msg.chat.id;
		if (data === '/start') {
			await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.webp')
			return await bot.sendMessage(chatId, `Приветствую ${msg.from.first_name}!`)
		}
		if (data === '/game') {
			return await startGame(chatId, msg.from.first_name);
		}
		return bot.sendMessage(chatId, `${msg.from.first_name} я тебя не понимаю, попробуй еще раз!`);
	});

	bot.on('callback_query', async msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;
		if (data === '/again') {
			return await startGame(chatId, msg.from.first_name);
		}
		if (+data === chats[chatId]) {
			return await bot.sendMessage(chatId, `Поздравляю ${msg.from.first_name}, ты угадал!`, againOptions);
		}
		if (+data !== chats[chatId]) {
			return await bot.sendMessage(chatId, `К сожалению ${msg.from.first_name}, ты не угадал число ${chats[chatId]}, попробуй еще раз!`, againOptions);
		}
	});
}

start();