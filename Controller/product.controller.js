const Product = require("../Model/productmodel");
const Category = require("../Model/categorymodel");
exports.addProductPage = (request,response)=>{
    let cat = new Category();
    cat.fetchAll()
    .then(result=>{
        response.render('Admin-view/add-product.ejs',{
            categoryList : result
        });
        console.log(result);
    })
    .catch(err=>{
        response.send("Something went wrong");
        console.log(err);
    })
}

exports.addProductPost = (req,res)=>{
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.qty=req.body.qty;
    product.description=req.body.description;
    product.category_id=req.category_id;
    
    let date = new Date();
    product.date = date.getFullYear() + "-" + (date.getMonth() + 1) +"-"+ date.getDate();    
    
    product.addProduct()
    .then((result)=>{
        return res.send("Product added");
    })
    .catch(err=>{
        console.log(err);
        return res.send("Something went wrong");
    })
    
}