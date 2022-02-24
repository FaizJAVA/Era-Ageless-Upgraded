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

exports.loginPost= (request, response) => {
       console.log('hello');
       
       startconnection.getConnection((err,con)=>{
              if (!err) {
                     console.log('Inside');
                     let sql = "select * from admin where adminname=? and password=?";

                     const adminname=request.body.adminname;
                     const password=request.body.password;
                     console.log(adminname);
                     con.query(sql, [adminname,password], (err, result) => {
                            if (err) {
                                   console.log(err);
                                   response.send("<h1>Something went Wrong..</h1>");
                            }
                            else {
                                   request.session.admin_email=request.body.adminname;
                                response.redirect('/admin/dashboard');
                            }
                            con.release();
                     });
              }
              else{
                     console.log(err);
                     response.send("<h1>Something went wrong....</h1>");
              }
       })
       
}
exports.logOut = (request,response)=>{
       request.session.current_user = null;
       request.session.destroy();
       response.redirect("/admin/login");
   }