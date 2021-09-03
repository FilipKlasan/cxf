const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    h: [Object],
    n: [Object],
    podaci: Object,
    r: String,
    counter: Number
});

module.exports = Data = mongoose.model('wxr', dataSchema);