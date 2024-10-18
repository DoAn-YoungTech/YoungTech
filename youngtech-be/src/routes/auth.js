const express = require("express");
const auth = express.Router();

const authControllers = require("../controllers/authControllers");
auth.post("/register", authControllers.register);
auth.post("/login", authControllers.login);

module.exports = auth;
