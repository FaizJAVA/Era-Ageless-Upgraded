const Product = require("../Model/productmodel");
const Category = require("../Model/categorymodel");
const multer=require('multer');
const path=require('path');

const upload=multer({dest:'Public/Images'});
exports.addProductPage = (request,response)=>{
    let cat = new Category();
    cat.fetchAll()
    .then(result=>{
        response.render('Admin-view/add-product.ejs',{
            categoryList : result
        });
        // console.log(result);
    })
    .catch(err=>{
        response.send("Something went wrong");
        console.log(err);
    })
}

exports.addProductPost = (req,res)=>{
    var product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.qty=req.body.qty;
    product.description=req.body.description;
    product.category_id=req.body.category_id;
    product.images=req.file.filename;
    
    let date = new Date();
    product.date = date.getFullYear() + "-" + (date.getMonth() + 1) +"-"+ date.getDate();    
    // console.log(product)
    product.addProduct()
    .then((result)=>{
        console.log(result);
        return res.send("Product added");
    })
    .catch(err=>{
        console.log(err);
        return res.send("Something went wrong");
    })
    
}

exports.productList=(request,response)=>{
    
    Product.viewProduct().then(result=>{
        // console.log(result)
        response.render('Admin-view/productList.ejs',{
            productlist:result
        });
    }).catch(err=>{
        console.log(err);
    })
};


exports.deleteProduct = (request,response,next)=>{
    const id = request.params.id;
    Product.deleteProduct(id).then(
        (result)=>{
          response.send("Product Deleted...");
        }
    ).catch(error=>{
        response.send("Something went wrong");
    });
 };

 exports.editProduct = (req,res)=>{
     let id = req.params.id;
     let cat = new Category();
     console.log("shgdkghf");
     Product.viewOneProduct(id)
     .then(product=>{
        cat.fetchAll()
        .then(category=>{
            console.log(product);
            res.render("Admin-view/edit-product",{
                product:product[0],
                category:category,
            });
        })
        .catch(err=>{
            console.log(err);
            res.send("Something went wrong");
        })
     })
     .catch(err=>{
         res.send("Something went wrong");
         console.log(err);
     });

 }

 exports.editProductPost = (req,res)=>{
    var product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.qty=req.body.qty;
    product.description=req.body.description;
    product.category_id=req.body.category_id;
    product.images=req.file.filename;
    product.id = req.body.id;
    let date = new Date();
    product.date = date.getFullYear() + "-" + (date.getMonth() + 1) +"-"+ date.getDate();    
    console.log(product);
    product.editProduct()
    .then(result=>{
        res.redirect("/product/view-product");
    })
    .catch(err=>{
        res.send("Something went wrong");
        console.log(err);
    });
    
 }