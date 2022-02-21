const express = require("express");
const route = express.Router();
const adminController = require("../Controller/admin.controller");
const auth = require("../Middleware/admin-auth.js");

route.get("/",adminController.loginPage);
route.post("/login",adminController.loginPost);
route.get("/dashboard",auth.isAdminAuth,adminController.dashboard);

module.exports = route;