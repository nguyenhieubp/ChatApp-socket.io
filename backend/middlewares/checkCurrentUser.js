const jwt = require("jsonwebtoken");
const checkCurrentUser = (req, res, next) => {
  const Authorization = req.header("authorization");
  if (!Authorization) {
    req.user = null;
    next();
  } else {
    try {
      const token = Authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.APP_SECRET);
      req.user = { id };
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
};

module.exports = checkCurrentUser;
