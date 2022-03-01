const res = require('express/lib/response');
const Cart = require('../Model/cart.model');
const Product = require('../Model/productmodel');
exports.readProduct = (request, response, next) => {
  // console.log(request.params.pid);
  Product.readOneProduct(request.params.pid)
    .then(result => {
      Product.checkProduct(request.params.pid)
      .then(isProductAdded=>{
        // console.log("jsdh");
        // console.log(isProductAdded);
        response.render('User-view/readmore.ejs', {
          productDetail: result[0],
          isProductAdded:isProductAdded
        });
      })
      .catch((err=>{
        console.log(err);
        response.send("Something went wrong");
      }))
    })
    .catch(err=>{
      console.log(err);
      response.send("Somthing went wrong");
    });
    
}
exports.removeFromCart = (request, response, next) => {
  let cart = new Cart();
  cart.productId = request.params.pid;
  cart.userId = request.session.current_user_id;
  cart.removeFromCart()
    .then(result => {
      return response.json({
        message: "success"
      });
    })
    .catch(err => {
      return response.json({
        message: "error"
      })
    });
}

exports.addToCart = (request,response)=>{
  console.log("Id" + request.params.id);
  console.log("QTY" + request.params.qty);

  let cart = new Cart();
  cart.productId = request.params.id;
  cart.userId = request.session.current_user_id;
  cart.qty = request.params.qty;
  console.log(cart);
  cart.addItemInCart()
  .then(result=>{
    return response.json({
      message: "success"
    });
    // response.redirect("/user/userDash");
  })
  .catch(err=>{
    response.send("Something went wrong");
  })
}