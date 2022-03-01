const User = require("../Model/usermodel")
const Product = require("../Model/productmodel");

exports.userHomePage = (request, response) => {
    response.render('User-view/userReg.ejs');
}

exports.userLoginPage = (request, response) => {
    response.render('User-view/Login.ejs');
}

exports.userDashBoard=(request,response)=>{
    Product.viewProduct()
    .then(result=>{
     response.render('User-view/user-dashboard',{
         products:result
     })

    })
    .catch(err=>{

    })
}

exports.saveQuery=(request,response)=>{
    response.render('User-view/user-query')
}

exports.saveUserDetails = (request, response) => {
    const userobj = new User();
    userobj.name = request.body.name;
    userobj.email = request.body.email;
    userobj.password = request.body.password;
    userobj.mobile = request.body.mobile;
    userobj.gender = request.body.gender;
    userobj.address = request.body.address;

    userobj.saveuser().then(result => {
        response.send("Successfull");
    }).catch(err => {
        console.log(err);
        response.send("UNSuccessfull");
    });
}

exports.checkUserLogIn = (request, response) => {
    console.log("Hello");
    const userobj = new User();
    userobj.email = request.body.email;
    userobj.password = request.body.password;
    
    userobj.check().then(result => {
        if (result.length > 0) {
            request.session.current_user_id = result[0].id; 
            console.log(request.session.current_user_id);
            response.redirect("/user/userdash");
        }
        else{
            response.send('Invalid User');

        }

    }).catch(err => {
        console.log(err);

    });
}