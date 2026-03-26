const express = require("express");
const { signup } = require("../controller/UserController");
const route = express.Router();

route.get("/", signup);

module.exports = route
