const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conversationSchema = new Schema({
  nameGroup: {
    type: String,
  },
  members: {
    type: Array,
  },
  adMinGroupId: {
    type: String,
  },
  img: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfWDY2FF1EIUgV-oXGRT4N0mxF3n9kayZtzs4OZWW1Iw&s",
  },
  isGroup: {
    type: Boolean,
  },
  listInGroup: { type: Array },
});

module.exports = mongoose.model("Conversation", conversationSchema);
