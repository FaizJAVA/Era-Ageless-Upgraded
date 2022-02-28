const Order = require("../Model/ordermodel");
exports.orderList = (req,res)=>{
    Order.orderList()
    .then(result=>{
        res.render("Admin-view/orderlist.ejs",{
            orders : result
        });
    })
    .catch(err=>{
        res.send("Something went wrong");
        console.log(err);
    })
}