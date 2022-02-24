const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
const admin = require('./Routes/admin.route');
const session=require('express-session');

const app=express();

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
    secret:'ghadsshfdsjfdlfjd'
}));

app.use(express.static(path.join(__dirname,'Public')));
app.use('/admin',admin);
app.listen(3000,()=>{
    console.log("Server Running");
});