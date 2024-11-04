const bcrypt = require("bcrypt");
const authService = require("../services/authService");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
const authController = {
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const result = await authService.register(userName, email, hashPassword);
      if (!result) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.status(201).json({ message: "Register success !" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  //generateAccessToken
  generateAccessToken: (user) => {
    return jwt.sign(
      // payload
      { id: user.id, email: user.email },
      // secret key
      process.env.accessSecretKey,
      // option
      { expiresIn: "30d" }
    );
  },
  refreshToken: (user) => {
    return jwt.sign(
      // payload
      { id: user.id, email: user.email },
      // secret key
      process.env.refreshToken,
      // option
      { expiresIn: "365d" }
    );
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // find userName follow email
      const user = await authService.findUserByEmail(email);
      console.log(user);
      if (!user) {
        res
          .status(404)
          .json({ message: "Email use not exit , Please try again !" });
      }
      // then => compare pass login === pass on database ,use bcrypt
      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        res.status(404).json({ message: "Password wrong!" });
      }
      if (user && comparePass) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.refreshToken(user);
        refreshTokens.push(refreshToken);

        res.cookie("refreshToken", refreshToken,{
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  requestRefreshToken: async (req, res) => {
    // take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "You are not authentication" });
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: "Refresh token is not valid" });
    }
    // check refresh token is valid or not
    jwt.verify(refreshToken, process.env.refreshToken, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Refresh token is valid " });
      }

      //filter
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      // if valid => generate new refresh token and access token

      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.refreshToken(user);

      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ AccessToken: newAccessToken });
    });
  },

  userLogout: (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json({ message: "Logged out success!" });
  },
};

module.exports = authController;

// STORE TOKEN
//1 . LOCAL STORAGE
//agin SXX
//2 . COOKIES
//AGIN => CSRF =/ SAMESITE
//3 . REDUX STORE --> ACCESSTOKEN
// HTTPONLY COOKIES --> REFRESHTOKEN
