const Admin=require('../Model/adminmodel');
const startconnection= require("../Util/dbconnection");
const session = require('express-session');
exports.loginPage = (request, response) => {
       console.log("Inside index Route");
       response.render("Admin-view/admin_login.ejs");
};
exports.AdminDashboardPage=(request,response)=>{
    response.render('Admin-view/admin_index.ejs');
}

exports.addCategoryPage=(request,response)=>{
       response.render('Admin-view/add-category.ejs');
}


exports.productListPage=(request,response)=>{
    response.render('Admin-view/productList.ejs');

}

exports.addProductPage=(request,response)=>{
    response.render('Admin-view/add-product.ejs');

}

exports.orderListPage=(request,response)=>{
       response.render('Admin-view/orderlist.ejs');

}

exports.queryPage=(request,response)=>{
    response.render('Admin-view/Query.ejs');

}

exports.feedbackPage=(request,response)=>{
       response.render('Admin-view/feedback.ejs');

}

exports.logOut = (request,response)=>{
       request.session.current_user = null;
       request.session.destroy();
       response.redirect("/admin/login");
   }
exports.loginPost = (req,res)=>{
    console.log(req.body);
    let adminobj = new Admin(req.body.email,req.body.password);
    adminobj.checkUser()
    .then(results=>{
        if(results.length>0){
            console.log(req.body.email);
            req.session.current_user = req.body.email;
            console.log(req.body.adminname);
            // res.render("Admin-view/dashboard.ejs");
            return res.redirect("/admin/dashboard");
        }
        else{
            console.log(results);
            res.send("Invalid email or password");
        }
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