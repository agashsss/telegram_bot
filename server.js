require('dotenv').config()
const express = require('express');
const TelegramApi = require('node-telegram-bot-api');
const PORT = 4000;
const bodyParser = require('body-parser')
const app = express();
const token = process.env.TG_BOT_TOKEN;
app.use(bodyParser.json())
app.use(express.json())

app.use('/', require('./routes/googleSheetRoute'));
const bot = new TelegramApi(token, {polling: true});
const commands = require('../telegram_bot/commands/commands.js')
commands();

bot.on('message', msg => {
    let clientid = Number(msg.text)
    const chatId = msg.chat.id
    let username, name, city, role, hobby;
    require('./services/ClientService').updateClient(3 ,chatId, bot, 'derzeet', 'Tamerlan', 'Nur-Sultan', 'Software Engineer', 'Sleeping')
})



/*
let username, name, city, role, hobby;
require('./services/ClientService').addClient(chatId, bot, username, name, city, role, hobby)
*/

const start = async () => {
    try {
        app.listen(PORT, () => console.log('It works on port: ' + PORT))
    }catch (e) {
        console.log(e);
    }
}

start();