const express = require('express');
const auth = express.Router();

const authControllers = require('../controllers/authControllers');
const middlewareController = require('../controllers/middlewareController');
auth.post('/register', authControllers.register);
auth.post('/login', authControllers.login);
auth.post('/refreshToken', authControllers.requestRefreshToken);
// LOG OUT
auth.post(
  '/logout',
  middlewareController.verifyToken,
  // authorization
  authControllers.userLogout
  // authentication
);

auth.post(
  '/generateResetTokens',
  middlewareController.verifyToken,
  authControllers.generateResetTokens
);

auth.patch(
  '/resetPassword',
  middlewareController.verifyToken,
  authControllers.resetPassword
);
module.exports = auth;
