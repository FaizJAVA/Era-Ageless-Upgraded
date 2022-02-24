const express = require('express');
const pool = require('../util/dbconnection');
const auth=require('../Middleware/admin-auth');
const router = express.Router();
const adminRouter = require('../controller/admin.controller')

router.get("/login",adminRouter.loginPage);

router.post("/loginPost",adminRouter.loginPost);
router.get("/dashboard",auth.isAuth,adminRouter.AdminDashboardPage);
router.get("/orderlist",adminRouter.orderListPage);
router.get("/feedback",adminRouter.feedbackPage);
router.get("/Query",adminRouter.queryPage);
router.get("/logout",auth.isAuth,adminRouter.logOut);
route.get("/",adminRouter.loginPage);
route.post("/login",adminRouter.loginPost);
route.get("/dashboard",auth.isAuth,adminRouter.dashboard);

module.exports = router;
