var mongoose = require('mongoose');



var user = mongoose.Schema({
    username: String,
    password: String,
    email:String
});

module.exports= mongoose.model('user', user);
