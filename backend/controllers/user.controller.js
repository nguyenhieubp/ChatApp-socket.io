const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("../middlewares/handleError");

module.exports.register = async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    const token = jwt.sign({ id: newUser }, process.env.APP_SECRET);
    const { password, ...other } = newUser._doc;
    await newUser.save();
    res.status(200).json({ message: "SUCCESS", token, user: other });
  } catch (error) {
    next(500, error);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      next(createError(400, "Not matches email"));
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.APP_SECRET);
      const { password, ...other } = user._doc;
      res.status(200).json({ message: "SUCCESS", token, user: other });
    } else {
      next(createError(400, "Not matches password !"));
    }
  } catch (error) {
    next(400, error);
  }
};

module.exports.getAllFriend = async (req, res, next) => {
  try {
    const friends = await User.find();
    res.status(200).json({ message: "SUCCESS", friends });
  } catch (error) {
    next(createError(500, "Not get friend"));
  }
};

module.exports.update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.json({ updateUser });
    } catch (error) {
      next(createError(400, "You don't account "));
    }
  } else {
    return next(createError(400, "Not have user find"));
  }
};

module.exports.checkCurrentUser = async (req, res, next) => {
  let currentUser = null;
  try {
    if (req.user) {
      currentUser = await User.findById(req.user.id);
    }
    res.status(200).json({ message: "SUCCESS", user: currentUser });
  } catch (error) {
    res.status(500).json({ message: "NULL" });
  }
};
