const express = require("express");
const route = express.Router();
const productRoute = require("../Controller/product.controller");
const admin_auth = require("../Middleware/admin-auth"); 

route.get("/add-product",admin_auth.isAdminAuth,productRoute.addProductPage);
route.post("/add-product",productRoute.addProductPost);

module.exports = route;
