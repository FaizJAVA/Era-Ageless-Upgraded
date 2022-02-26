const express = require("express");
const route = express.Router();
const auth = require("../Middleware/admin-auth.js");
const categoryController = require("../Controller/category.controller");
const multer=require('multer');

const upload=multer({dest:'Public/Images'});

route.get("/add-category",auth.isAuth,categoryController.addCategory);
route.post("/add-category",auth.isAuth,upload.single('categoryImage'),categoryController.addCategoryPost);

module.exports = route;