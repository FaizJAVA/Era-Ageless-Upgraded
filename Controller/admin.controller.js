const Admin=require('../Model/adminmodel');
const Order = require("../Model/ordermodel");
const User = require("../Model/usermodel");
const Query = require("../Model/querymodel");
const nodemailer = require("nodemailer");
// const startconnection= require("../Util/dbconnection");
// const session = require('express-session');
// exports.loginPage = (request, response) => {
//        console.log("Inside index Route");
//        response.render("Admin-view/admin_login.ejs");
// };
exports.AdminDashboardPage=(request,response)=>{
    Order.totalOrders()
    .then((totalOrders=>{
        User.countUser()
        .then(totalUser=>{
            Order.totalSales()
            .then(totalSalesAmount =>{
                Order.recentOrders()
                .then(Order=>{
                    response.render("Admin-view/admin_index.ejs",{
                        totalOrders : totalOrders[0].totalOrders,
                        totalUser : totalUser[0].totalCustomer,
                        totalSales : totalSalesAmount[0].totalAmount,
                        recentOrders : Order
                    });
                })
                .catch(err=>{
                    response.send("Something went wrong");
                    console.log(err);
                })
            })
            .catch(err=>{
                response.send("something went wrong");
                console.log(err);
            })
        })
        .catch(err=>{
            response.send("Something went wrong");
        })
    }))
    .catch(err=>{
        console.log(err);
    });
}

exports.addCategoryPage=(request,response)=>{
       response.render('Admin-view/add-category.ejs');
}


exports.productListPage=(request,response)=>{
    response.render('Admin-view/productlist.ejs');

}

exports.addProductPage=(request,response)=>{
    response.render('Admin-view/add-product.ejs');

}

exports.orderListPage=(request,response)=>{
       response.render('Admin-view/orderlist.ejs');

}

exports.queryPage=(request,response)=>{
    Query.fetchAll()
    .then(result=>{
        response.render('Admin-view/Query',{
            Queries : result
        });
        
    })
    .catch(err=>{
        response.send("Something went wrong");
        console.log(err);
    });
}

exports.feedbackPage=(request,response)=>{
       response.render('Admin-view/feedback.ejs');

}

exports.logOut = (request,response)=>{
       request.session.current_user = null;
       request.session.destroy();
       response.redirect("/");
   }
exports.loginPost = (req,res)=>{
    let adminobj = new Admin(req.body.email,req.body.password);
    adminobj.checkUser()
    .then(results=>{
        if(results.length>0){
            req.session.current_user = req.body.email;
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
    Order.totalOrders()
    .then((result=>{
        console.log("Hello");
        console.log(result);
        // res.render("Admin-view/dashboard.ejs");

    }))
    .catch(err=>{
        console.log(err);
    });
}

exports.replyQuery = (req,res) =>{
    res.render("Admin-view/composeEmail.ejs",{
        email : req.params.email,
        id : req.params.id
    });
    console.log(req.params.id);
}

exports.sendEmail = (req,res)=>{
    let sender = "mahak01agrawal@gmail.com";
    let reciever = req.body.reciever;
    let subject = req.body.subject;
    let message = req.body.message;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender,
            pass: 'mahak@123!'
        }
    });

    // email options
    let mailOptions = {
        from: sender,
        to: reciever,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
            res.send("Something went wrong");
        }
        else{
            let q = new Query();
            q.customer_id = req.body.id;
            q.status = "solved";
            console.log(q);
            q.update()
            .then(result=>{
                res.redirect("/admin/Query");
            })
            .catch(err=>{
                console.log(err);
                res.send("Something went wrong");
            })
            
            // res.redirect("/admin/Query");
            // console.log(response);
        }
        
    });
    
}