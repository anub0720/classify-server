const mongoose = require("mongoose");

const schema = mongoose.Schema;

const chatSchema = new schema({
  email: {
    type: String,
    required: true,
  },
  userMessage: {
    type: String,
    required: true,
  },
  apiResponse: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  sentTime: {
    type: String,
    default: () => new Date().toLocaleTimeString('en-IN', { hour12: false }),
  },
});

module.exports = mongoose.model("chatbot", chatSchema);
