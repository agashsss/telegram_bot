const axios = require('axios')

exports.getAllClients = async (chatId, bot) => {
    try {
        const baseURL = 'http://localhost:4000/clients'

        axios.get(baseURL)
            .then(res => {
                res.data.forEach( key => {
                    const username = key[0];
                    const name = key[1];
                    const city = key[2];
                    const role = key[3];
                    const hobby = key[4];

                    const message = `   
                *STH*
                
                
username:   ${username}
name:   ${name}
city:   ${city}
role:   ${role}
hobby:   ${hobby}
                `

                    bot.sendMessage(chatId, message)
                })
            })
    } catch (e) {
        console.log(e.message)
    }
}

exports.getClient = async (id, chatId, bot) => {
    try {
        const baseURL = 'http://localhost:4000/clients'
        const questionId = `/${id}`

        const GetUrl = baseURL + questionId;

        axios.get(GetUrl)
            .then(res => {
                const dataArr = res.data[0];

                const username = dataArr[0];
                const name = dataArr[1];
                const city = dataArr[2];
                const role = dataArr[3];
                const hobby = dataArr[4];

                const message = `   
                *STH*
                
                
username:   ${username}
name:   ${name}
city:   ${city}
role:   ${role}
hobby:   ${hobby}
                `

                bot.sendMessage(chatId, message)
            });
    } catch (e) {
        console.log(e.message)
    }
}

exports.updateClient = async (row, chatId, bot, username, name, city, role, hobby) => {
    try {
        const baseURL = `http://localhost:4000/clients/${row}`

        axios.patch(baseURL, {
            username: username,
            name: name,
            city: city,
            role: role,
            hobby: hobby
        })
            .then( res => {
                bot.sendMessage(chatId, res.data)
            })
    } catch (e) {
        console.log(e.message)
    }
}

exports.deleteClient = async (row, chatId, bot) => {
    try {
        const baseURL = `http://localhost:4000/clients/${row}`

        axios.delete(baseURL)
            .then( res => {
                bot.sendMessage(chatId, res.data + ` on row ${row}`)
            })
    } catch (e) {
        console.log(e.message)
    }
}

exports.addClient = async (chatId, bot, username, name, city, role, hobby) => {
    try {
        const baseURL = 'http://localhost:4000/clients';

        axios.post(baseURL, {
            username: username,
            name: name,
            city: city,
            role: role,
            hobby: hobby
        }) .then( res => {
            console.log(res.data)
        })
    } catch (e) {
        console.log(e.message)
    }
}