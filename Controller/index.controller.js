exports.IndexPage=(request,response)=>{
    response.render('Index-view/index.ejs');
}
exports.FeaturePage=(request,response)=>{
    response.render('Index-view/feature.ejs');
}

exports.ProductPage=(request,response)=>{
    response.render('Index-view/product.ejs');
}

exports.CategoryPage=(request,response)=>{
    response.render('Index-view/categories.ejs');
}

exports.ReviewPage=(request,response)=>{
    response.render('Index-view/reviews.ejs');
}

