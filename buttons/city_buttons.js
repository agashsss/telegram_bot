
const cities = {
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: 'Нур-Султан', callback_data: 'Нур-Султан'}, {text: 'Алматы', callback_data: 'Алматы'}, {text: 'Павлодар', callback_data: 'Павлодар'}],
            [{text: 'Караганда', callback_data: 'Караганда'}, {text: 'Семей', callback_data: 'Семей'}, {text: 'Уральск', callback_data: 'Уральск'}],
            [{text: 'Москва', callback_data: 'Москва'}, {text: 'Санкт-Петербург', callback_data: 'Санкт-Петербург'}, {text: 'Новосибирск', callback_data: 'Новосибирск'}],
            [{text: 'Омск', callback_data: 'Омск'}, {text: 'Казань', callback_data: 'Казань'}, {text: 'Челябинск', callback_data: 'Челябинск'}],
        ]
    })
}

module.exports = cities;