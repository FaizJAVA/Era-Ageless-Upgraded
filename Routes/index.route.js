const express=require('express');
const indexControl=require('../Controller/index.controller');

const routeIndex=express.Router();

routeIndex.get('/',indexControl.IndexPage);
routeIndex.get('/feature',indexControl.FeaturePage);
routeIndex.get('/product',indexControl.ProductPage);
routeIndex.get('/categories',indexControl.CategoryPage);
routeIndex.get('/reviews',indexControl.ReviewPage);

module.exports=routeIndex;