var mongoose = require('mongoose');



var personChat = mongoose.Schema({
    name: String,
    message: String
});

module.exports= mongoose.model('personChat', personChat);
