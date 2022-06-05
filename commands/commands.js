const TelegramApi = require('node-telegram-bot-api');

const token = '5474234683:AAE1i-78DCW4cqz7Pmffz9Yoe5iLSQ3JCRY';

const bot = new TelegramApi(token);

module.exports = async() => {
    await bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Получить информацию'},
        {command: '/help', description: 'Получить помощь'}
    ])
}