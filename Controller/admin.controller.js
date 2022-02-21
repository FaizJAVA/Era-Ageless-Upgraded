const res = require("express/lib/response");
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