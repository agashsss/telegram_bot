const questionService = require("../services/QuestionService");

exports.start = async(bot) => {
    try {

        let writeName = (msg) => {
            const chatId = msg.chat.id;
            bot.sendMessage(chatId, 'handler deleted');
            bot.removeListener('message', writeName)
        }

        bot.on('message', msg => {
            const chatId = msg.chat.id
            bot.sendMessage(chatId, 'hehe')
            bot.on('message', writeName)

            bot.on('message', msg => {
                bot.sendMessage(chatId,'heh')
            })
        })



    } catch (e) {
        console.log(e.message)
    }
}

//helper functions

const writeName = (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'handler deleted');
    bot.removeListener('message', writeName)
}

const chooseYourCity = (chatId, bot) => {
    questionService.getQuestion(1, chatId, bot)

    bot.sendMessage('message', '', require('../buttons/city_buttons'))
    bot.on('callback_query', answer => {
        bot.sendMessage(chatId, `your city is ${answer.text}`)
        bot.removeListener("message", chooseYourCity)
    })
}