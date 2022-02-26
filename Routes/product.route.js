const express = require("express");
const route = express.Router();
const multer=require('multer');
const productRoute = require("../Controller/product.controller");
const admin_auth = require("../Middleware/admin-auth");

const upload=multer({dest:'Public/Images'});
route.get("/add-product",admin_auth.isAuth,productRoute.addProductPage);
route.post("/add-product",upload.single('images'),productRoute.addProductPost);
route.get("/view-product",productRoute.productList);
// route.get("/signout",productRoute.productView);
module.exports = route;