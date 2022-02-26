const Category = require("../Model/categorymodel");
const path = require("path");
const multer=require('multer');

const upload=multer({dest:'Public/Images'});

exports.addCategory = (req, res, next) => {
    res.render("Admin-view/add-category.ejs");
}

exports.addCategoryPost = (req, res, next) => {
    const cat=new Category();
    cat.categoryName=req.body.categoryName;
    cat.categoryImage=req.file.filename;
    cat.gender=req.body.gender;
    cat.save().then(result=>{
        res.send('Added');
    }).catch(err=>{
        console.log(err);
        res.send('err');
    });
}