const axios = require('axios')

exports.getAllMeetings = async (chatId, bot) => {
    try {
        const baseURL = 'http://localhost:4000/meetings'

        axios.get(baseURL)
            .then(res => {
                res.data.forEach( key => {
                    const firstUser = key[0];
                    const secondUser = key[1];
                    const date= key[2];


                    const message = `   
                *STH*
                
                
first user:   ${firstUser}
second user:   ${secondUser}
date:   ${date}
                `

                    bot.sendMessage(chatId, message)
                })
            })
    } catch (e) {
        console.log(e.message)
    }
}

exports.getMeeting = async (id, chatId, bot) => {
    try {
        const baseURL = 'http://localhost:4000/meetings'
        const questionId = `/${id}`

        const GetUrl = baseURL + questionId;

        axios.get(GetUrl)
            .then(res => {
                const dataArr = res.data[0];

                const firstUser = dataArr[0];
                const secondUser = dataArr[1];
                const date = dataArr[2];

                const message = `   
                *STH*
                
             
first user:   ${firstUser}
second user:   ${secondUser}
date:   ${date}
                
*!* END *!*                `

                bot.sendMessage(chatId, message)
            });
    } catch (e) {
        console.log(e.message)
    }
}