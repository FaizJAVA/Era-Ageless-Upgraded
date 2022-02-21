const express = require("express");
const route = express.Router();
const adminController = require("../Controller/admin.controller");

route.get("/",adminController.loginPage);
route.post("/login",adminController.loginPost);

module.exports = route;