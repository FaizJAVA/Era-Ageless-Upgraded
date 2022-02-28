const express = require("express");
const route = express.Router();
const orderController = require("../Controller/order.controller");
route.get("/orderlist",orderController.orderList);

module.exports = route;