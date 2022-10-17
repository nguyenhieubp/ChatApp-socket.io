const express = require("express");
const router = express.Router();
const controllerAuth = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");
const checkCurrentUser = require("../middlewares/checkCurrentUser");
router.get("/userCurrent", checkCurrentUser, controllerAuth.checkCurrentUser);
router.post("/register", controllerAuth.register);
router.get("/getAllFriend", verifyToken, controllerAuth.getAllFriend);
router.post("/login", controllerAuth.login);
router.put("/update/:id", verifyToken, controllerAuth.update);

module.exports = router;
