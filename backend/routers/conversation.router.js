const express = require("express");
const router = express.Router();
const controllerConversation = require("../controllers/conversation.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get(
  "/getConversation",
  verifyToken,
  controllerConversation.getConversation
);

router.get(
  "/getConversationFriend",
  verifyToken,
  controllerConversation.getConversationFriend
);

router.post(
  "/createGroup",
  verifyToken,
  controllerConversation.createGroupConversation
);
router.put("/kickGroup/:id", verifyToken, controllerConversation.groupKick);
router.put(
  "/addMemberGroup/:id",
  verifyToken,
  controllerConversation.addMember
);
router.get(
  "/friendInGroup/:id",
  verifyToken,
  controllerConversation.friendInGroup
);
router.put("/leaveGroup/:id", verifyToken, controllerConversation.leaveGroup);
router.put("/updateGroup/:id", verifyToken, controllerConversation.updateGroup);
router.get("/getGroup", verifyToken, controllerConversation.getGroup);
router.delete(
  "/deleteGroup/:id",
  verifyToken,
  controllerConversation.deleteGroup
);

module.exports = router;
