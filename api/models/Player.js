const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlayerSchema = new Schema({
  name: {
    type: String
  }
},{
    collection: 'player'
});
  
module.exports = mongoose.model('Player', PlayerSchema);