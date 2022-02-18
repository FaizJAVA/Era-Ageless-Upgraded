const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');

const app=express();

app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'Public')));

app.listen(3000,()=>{
    console.log("Server Running");
});