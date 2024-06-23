const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    content: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    sender: {type: String, required: true}
})

module.exports = messageSchema