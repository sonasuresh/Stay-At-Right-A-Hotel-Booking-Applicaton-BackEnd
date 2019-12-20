const mongoose = require('mongoose');

const ConfigSchema = mongoose.Schema({
    key: String,
    value: Number
})


const Config = module.exports = mongoose.model('Config',ConfigSchema);

