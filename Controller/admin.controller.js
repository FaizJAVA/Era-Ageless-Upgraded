
const startconnection= require("../Util/dbconnection");
const session = require('express-session');
exports.loginPage = (request, response) => {
       console.log("Inside index Route");
       response.render("Admin-view/admin_login.ejs");
};

exports.AdminDashboardPage=(request,response)=>{
       response.render('Admin-view/admin_index.ejs');
}


exports.orderListPage=(request,response)=>{
       response.render('Admin-view/orderlist.ejs');

}

exports.feedbackPage=(request,response)=>{
       response.render('Admin-view/feedback.ejs');

}

exports.queryPage=(request,response)=>{
       response.render('Admin-view/Query.ejs');

}

exports.logOut = (request,response)=>{
       request.session.current_user = null;
       request.session.destroy();
       response.redirect("/admin/login");
   }
const Admin = require("../Model/adminmodel");
exports.loginPost = (req,res)=>{
    let admin = new Admin(req.body.email,req.body.password);
    admin.checkUser()
    .then(result=>{
        if(result.length>0){
            req.session.current_user = req.body.email;
            // res.render("Admin-view/dashboard.ejs");
            res.redirect("/admin/dashboard");
        }
        else
            res.send("Invalid email or password");
    })
    .catch(err=>{
        res.send("Something went wrong");
        console.log(err);
    })
}
exports.loginPage = (req,res) =>{
    res.render("Admin-view/login.ejs");
}
exports.dashboard = (req,res) =>{
    res.render("Admin-view/dashboard.ejs");
}
