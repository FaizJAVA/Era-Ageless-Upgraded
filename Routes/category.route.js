const express = require("express");
const route = express.Router();
const auth = require("../Middleware/admin-auth.js");
const categoryController = require("../Controller/category.controller");

route.get("/add-category",auth.isAdminAuth,categoryController.addCategory);

module.exports = route;