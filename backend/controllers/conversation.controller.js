const Conversation = require("../models/conversation.model");
const createError = require("../middlewares/handleError");
const User = require("../models/user.model");

module.exports.getConversation = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const conversations = await Conversation.find({
      isGroup: false,
      members: { $in: userId },
    });
    res.status(200).json(conversations);
  } catch (error) {}
};

module.exports.getConversationFriend = async (req, res, next) => {
  const friendId = req.query.userId;
  try {
    const friend = await User.findById(friendId);
    const { password, ...other } = friend._doc;
    res.status(200).json(other);
  } catch (error) {
    console.log(error);
  }
};

module.exports.friendInGroup = async (req, res, next) => {
  const conversation = await Conversation.findById(req.params.id);
  const { members } = conversation;
  const allFriend = await Promise.all(
    members.map(async (member) => {
      return await User.findById(member);
    })
  );
  try {
    res.status(200).json({ members: allFriend });
  } catch (error) {
    res.status(500).json({ message: "ERROR" });
  }
};

//GROUP
module.exports.createGroupConversation = async (req, res, next) => {
  const userIdCreate = req.user.id;
  const listMemberAdd = req.body.listMemberAdd;

  try {
    if (userIdCreate) {
      const newConverSation = new Conversation({
        members: [userIdCreate, ...listMemberAdd],
        adMinGroupId: userIdCreate,
        nameGroup: req.body.nameGroup,
        imageGroup: req.body.imageGroup,
        isGroup: true,
      });

      const adminGroup = await User.findById(userIdCreate);
      const { password, ...other } = adminGroup._doc;

      await newConverSation.save();
      res.status(200).json({
        message: "SUCCESS",
        conversation: newConverSation,
        adminGroup: other,
      });
    } else {
      return next(createError(400, "Not have account find"));
    }
  } catch (error) {
    next(createError(500, error));
  }
};

module.exports.groupKick = async (req, res, next) => {
  const userId = req.user.id;
  const conversationId = req.params.id;
  const listUserKick = req.body.listKick;

  try {
    const adMinGroupId = await Conversation.findOne({
      _id: conversationId,
      adMinGroupId: userId,
      isGroup: true,
    });

    if (adMinGroupId) {
      const conversation = await Conversation.findByIdAndUpdate(
        conversationId,
        { $pull: { members: { $in: listUserKick } } },
        { new: true }
      );
      res.status(200).json({ message: "CLICK SUCCESS", conversation });
    } else {
      res.status(400).json({ message: "You don't have click" });
    }
  } catch (error) {
    next(createError(500, error));
  }
};

module.exports.addMember = async (req, res, next) => {
  const conversationId = req.params.id;
  const listMemberAdd = req.body.listMemberAdd;
  try {
    const isGroup = await Conversation.findOne({
      _id: conversationId,
      isGroup: true,
    });
    if (isGroup) {
      await Conversation.updateMany(
        { _id: conversationId },
        {
          $push: {
            members: {
              $each: listMemberAdd,
            },
          },
        }
      );
      res.status(200).json({ message: "ADD MEMBER SUCCESS" });
    } else {
      return next(createError(400, "Not have conversation"));
    }
  } catch (error) {
    next(createError(500, error));
  }
};

module.exports.leaveGroup = async (req, res, next) => {
  const userId = req.user.id;
  const conversationId = req.params.id;
  const newAdmin = req.body.newAdmin;
  const isGroup = await Conversation.findOne({
    _id: conversationId,
    isGroup: true,
  });
  if (isGroup) {
    if (isGroup.members.length < 2) {
      await Conversation.findByIdAndDelete(conversationId);
      return res.status(200).json({ message: "DELETE group success" });
    }
    try {
      const adMinGroupId = await Conversation.findOne({
        _id: conversationId,
        adMinGroupId: userId,
        isGroup: true,
      });
      if (adMinGroupId) {
        if (newAdmin) {
          await Conversation.updateOne(
            { _id: conversationId },
            {
              $set: { adMinGroupId: newAdmin },
              $pull: { members: userId },
            }
          );
          res.status(200).json({ message: "SUCCESS", admin: newAdmin });
        } else {
          const otherAdmin = isGroup.members[1];
          await Conversation.updateOne(
            { _id: conversationId },
            {
              $set: { adMinGroupId: otherAdmin },
              $pull: { members: userId },
            }
          );
          res.status(200).json({ message: "SUCCESS", admin: otherAdmin });
        }
      } else {
        await Conversation.updateOne(
          { _id: conversationId },
          {
            $pull: { members: userId },
          }
        );
        res.status(200).json({ message: "Leave success! " });
      }
    } catch (error) {
      next(createError(500, error));
    }
  } else {
    next(400, "Don't have conversation");
  }
};

module.exports.updateGroup = async (req, res, next) => {
  const idUser = req.user.id;
  const idConversation = req.params.id;
  const group = await Conversation.findOne({
    isGroup: true,
    _id: idConversation,
  });
  const members = group.members;
  const isInGroup = members.findIndex((item) => item === idUser);
  if (isInGroup === -1) {
    next(createError(400, "You not includes the group"));
  } else {
    await Conversation.updateOne(
      {
        _id: idConversation,
        isGroup: true,
      },
      { $set: req.body }
    );
    res.status(200).json({ message: "UPDATE SUCCESS" });
  }
};

module.exports.deleteGroup = async (req, res, next) => {
  const userId = req.user.id;
  const conversationId = req.params.id;
  const isAdmin = await Conversation.findOne({
    _id: conversationId,
    adMinGroupId: userId,
    isGroup: true,
  });
  try {
    if (isAdmin) {
      await Conversation.findByIdAndDelete(conversationId);
      res.status(200).json({ message: "DELETE SUCCESS" });
    } else {
      next(createError(400, "You can not delete because you do not admin"));
    }
  } catch (error) {
    next(createError(500, "Can't delete"));
  }
};

module.exports.getGroup = async (req, res, next) => {
  const idUser = req.user.id;
  try {
    const isInGroup = await Conversation.find({
      isGroup: true,
      members: idUser,
    });
    res.status(200).json(isInGroup);
  } catch (error) {
    next(createError(500, "Not get group"));
  }
};
