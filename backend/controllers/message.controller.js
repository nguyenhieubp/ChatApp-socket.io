const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");
const User = require("../models/user.model");
const createError = require("../middlewares/handleError");
module.exports.sendMessage = async (req, res, next) => {
  const idUserSend = req.body.sender;
  const idConversation = req.body.conversation;
  const textContent = req.body.text;
  try {
    const conversation = await Conversation.findById(req.body.conversation);
    const membersInGroup = conversation.members;
    const isInGroup = membersInGroup.findIndex((item) => item === idUserSend);
    const userSender = await User.findById(idUserSend);
    if (isInGroup !== -1) {
      if (conversation.members.length > 1) {
        const newMessage = new Message({
          conversation: idConversation,
          sender: userSender,
          text: textContent,
          time: new Date(),
        });
        await newMessage.save();
        res.status(200).json({ status: "SUCCESS", message: newMessage });
      }
    } else {
      next(createError(400, "You not includes in the group"));
    }
  } catch (error) {
    next(createError(500, "Not send message"));
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  const idUser = req.user.id;
  const idConversation = req.params.id;
  const idMessage = req.body.message;
  const isAuthorMessage = await Message.findOne({
    _id: idMessage,
    conversation: idConversation,
    sender: idUser,
  });
  if (isAuthorMessage) {
    try {
      await Message.findByIdAndDelete(idMessage);
      res.status(200).json({ message: "DELETE MESSAGE SUCCESS" });
    } catch (error) {
      next(createError(400, "FAIL DELETE MESSAGE !"));
    }
  } else {
    next(createError(500, "you do not author massage !"));
  }
};

module.exports.getMessage = async (req, res, next) => {
  const userId = req.user.id;
  const idConversation = req.params.id;
  try {
    const conversation = await Message.find({
      conversation: idConversation,
    }).populate("sender", "name avatar");
    const room = await Conversation.findById(idConversation);
    const members = room.members;
    const inRoom = members.findIndex((item) => item === userId);
    if (inRoom !== -1) {
      if (!conversation) {
        return next(createError(400, "Not have conversation"));
      }
      res.status(200).json({ conversation });
    } else {
      next(createError(400, "You not in conversation"));
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
