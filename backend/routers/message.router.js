const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const verifyToken = require("../middlewares/verifyToken");

router.post("/send", verifyToken, messageController.sendMessage);
router.get("/get/:id", verifyToken, messageController.getMessage);
router.delete("/delete/:id", verifyToken, messageController.deleteMessage);

module.exports = router;
