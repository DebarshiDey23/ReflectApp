const mongoose = require('mongoose')

const promptSchema = new mongoose.Schema({
    content: {type: String, required: true},
})

const Prompt = mongoose.model("Prompt", promptSchema);

module.exports = Prompt;