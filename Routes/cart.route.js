const express = require('express');
const Cart = require('../Model/cart.model');
const cartController = require('../Controller/cart.controller');
const userAuth = require('../Middleware/user-Auth');
const router = express.Router();

router.get("/read-product/:pid",userAuth.isAuth,cartController.readProduct);
router.post("/add-to-cart/:id:/qty",userAuth.isAuth,cartController.addToCart);
router.get("/remove-from-cart/:pid",userAuth.isAuth,cartController.removeFromCart);
// /cart/view-cart
router.get("/view-cart",userAuth.isAuth,(request,response,next)=>{
    let userId = request.session.current_user_id;
    Cart.fetchAllCartItem(userId)
    .then(results=>{
        console.log(results);
        response.render("view-cart.ejs",{
            title: "Cart",
            cartItemList: results,
            isLoggedIn: request.session.current_user_id
        });
    })
    .catch();
});
router.get("/get-cart-item-local",(request,response,next)=>{
    let userId = request.session.current_user_id;
    Cart.fetchAllCartItem(userId)
    .then(results=>{
        return response.json(results);
    })
    .catch();
});
module.exports = router;

