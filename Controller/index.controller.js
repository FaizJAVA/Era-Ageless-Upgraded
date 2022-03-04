const Index=require('../Model/indexmodel.js');


exports.IndexPage=(request,response)=>{
    const ind=new Index();

    ind.fetchcategory().then(result=>{
        Index.indViewProduct().then(results=>{
            response.render('Index-view/index.ejs',{
            catlist:result,
            productlist:results
        });
        }).catch(error=>{

        })
        

    }).catch(err=>{
        console.log(err);
    });


    
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