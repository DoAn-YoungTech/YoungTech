const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.accessSecretKey, (err, user) => {
        if (err) {
          res.status(403).json({ message: "Token not valid" });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(401).json(`You'r not authentication`);
    }
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id) {
        next();
      } else {
        res
          .status(403)
          .json({ message: `You're not allowed to delete other ` });
      }
    });
  },
};
module.exports = middlewareController;
