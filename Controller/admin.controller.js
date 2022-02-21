const Admin = require("../Model/adminmodel");
exports.loginPost = (req,res)=>{
    let admin = new Admin(req.body.email,req.body.password);
    admin.checkUser()
    .then(result=>{
        if(result.length>0)
            res.send("Login Successfull...");
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