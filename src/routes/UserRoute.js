const express = require("express");
const { userCredentials } = require("../controller/UserController");
const route = express.Router();

route.get("/:id", userCredentials);

module.exports = route;
