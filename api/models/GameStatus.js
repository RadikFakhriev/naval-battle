const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let GameStatusSchema = new Schema({
    code: {
        type: Number,
        default: 0
    },
    codeName: {
        type: String,
        default: 'CREATED'
    },
    name: {
        type: String,
        default: 'Создана'
    }
},{
    collection: 'game_status'
});

module.exports = mongoose.model('GameStatus', GameStatusSchema);