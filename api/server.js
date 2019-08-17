const express = require('express'),
    path = require('path'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

const playerRoute = require('./routes/player.route');
    
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected'); },
    err => { console.log('Can not connect to the database' + err); }
);


const app = express();
let port = process.env.PORT || 4000;
// подключаем middleware для работы 
app.use(express.json()); // и application/json
app.use(cors()); // c CORS

app.use('/player', playerRoute);
app.use('/',function(req,res) {
    res.sendFile(path.join(__dirname, 'index.html'))
});

const server = app.listen(port, function() {
    console.log('Listening on port ' + port);
});

    