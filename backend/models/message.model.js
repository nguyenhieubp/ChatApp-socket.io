const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversation: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Conversation",
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
  time: {
    type: Date,
  },
});

module.exports = mongoose.model("Message", messageSchema);
