const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let GameSchema = new Schema({
    created: {
        type: Date
    },
    updated: {
        type: Date
    },
    closed: {
        type: Date
    },
    player: {
        type: Schema.Types.ObjectId, ref: 'Player'
    },
    oppositePlayer: {
        type: Schema.Types.ObjectId, ref: 'Player'
    },
    lastStepOwner: {
        type: Schema.Types.ObjectId, ref: 'Player'
    },
    winner: {
        type: Schema.Types.ObjectId, ref: 'Player'
    },
    status: {
        type: Schema.Types.ObjectId, ref: 'GameStatus'
    }
},{
    collection: 'game'
});

module.exports = mongoose.model('Game', GameSchema);