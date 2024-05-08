const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [{
    type: String,
    required: true
  }],
  messages: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
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

// Concatenate participant names in lexicographical order to create the collection name
const getCollectionName = (participants) => {
  const sortedParticipants = participants.sort(); // Sort participant names
  return sortedParticipants.join('').toLowerCase(); // Concatenate and change to lowercase
};

const Conversation = mongoose.model('chat', chatSchema, (participants) => {
  return getCollectionName(participants);
});

module.exports = Conversation;
