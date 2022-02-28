const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const admin = require('./Routes/admin.route');
const session = require('express-session');
const category = require("./Routes/category.route");
const userRoute = require('./Routes/user.route');
// const fileUpload = require("express-fileupload");
const routeIndexExpo = require('./Routes/index.route');
const productRoute = require("./Routes/product.route");
const cartRouter = require('./Routes/cart.route');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'Public')));
app.use(session({
    secret: 'hellotherewearehere'
}));
app.use("/admin", admin);
app.use('/user', userRoute);
app.use("/category", category);
app.use("/cart",cartRouter);
app.use("/product", productRoute);
app.use(routeIndexExpo);
app.listen(3000, () => {
    console.log("Server Running"); 
});

