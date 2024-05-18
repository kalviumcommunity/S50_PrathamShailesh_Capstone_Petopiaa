const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: {
    type: [String],
    required: true
  }
  ,
  messages: [{
    senderId: {
      type: String,
      required: true
    },
    receiverId: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    }
  }]
});


const Conversation = mongoose.model('chat', chatSchema);

module.exports = Conversation;
