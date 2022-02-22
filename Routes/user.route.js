const express=require('express');
const userrouteControl=require('../Controller/user.controller.js')
const routeUser=express.Router();
const auth=require('../Middleware/user-auth');

routeUser.get('/',userrouteControl.userHomePage);
routeUser.get('/login',userrouteControl.userLoginPage);
routeUser.get('/userDash',auth.isAuth,userrouteControl.userDashBoard);
routeUser.post('/saveData',userrouteControl.saveUserDetails);
routeUser.post('/checkUser',userrouteControl.checkUserLogIn);
routeUser.get('/query',userrouteControl.saveQuery);
module.exports=routeUser;