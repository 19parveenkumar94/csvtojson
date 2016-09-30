var mongoose = require('mongoose');



var personalChatData = mongoose.Schema({
    chatId: String,
    user1: String,
    user2: String,
    chatMessages :[{
      sender: String,
      message: String
    }]
});

module.exports= mongoose.model('personalChatData', personalChatData);
