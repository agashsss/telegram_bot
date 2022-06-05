const axios = require('axios')

exports.getQuestion = async (id, chatId, bot) => {
    try {
        const baseURL = 'http://localhost:4000/questions'
        const _id = Number(id) + 1;
        const questionId = `/${_id}`

        const GetUrl = baseURL + questionId;

        axios.get(GetUrl)
            .then(res => {
                bot.sendMessage(chatId, res.data[0][0].toString())
            });
    } catch (e) {
        console.log(e.message)
    }
}