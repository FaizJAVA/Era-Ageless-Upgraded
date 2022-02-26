const express = require('express');
const pool = require('../Util/dbconnection');
const auth=require('../Middleware/admin-auth');
const router = express.Router();
const adminRouter = require('../Controller/admin.controller')

router.get("/login",adminRouter.loginPage);
//router.post("/loginPost",adminRouter.loginPost);
router.get("/dashboard",auth.isAuth,adminRouter.AdminDashboardPage);
// router.get("/addcategory",adminRouter.addCategoryPage);
// router.get("/productlist",adminRouter.productListPage);
// router.get("/addproduct",adminRouter.addProductPage);
router.get("/orderlist",adminRouter.orderListPage);
router.get("/feedback",adminRouter.feedbackPage);
router.get("/Query",adminRouter.queryPage);
router.get("/logout",auth.isAuth,adminRouter.logOut);
// router.get("/",adminRouter.loginPage);
router.post("/login",adminRouter.loginPost);
router.get("/dashboard",auth.isAuth,adminRouter.dashboard);

module.exports = router;