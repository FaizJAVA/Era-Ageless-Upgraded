const pool = require('../Util/dbconnection');
module.exports = class Cart{
    constructor(productId,userId,qty){
        this.productId = productId;
        this.userId = userId;
        this.qty = qty;
    }
    static fetchAllCartItem(userId){
       return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
          if(!err){
            let sql = "select product.id,product.productName,product.productPrice,product.productQty,product.productDescription,product.frontViewImage,cart.id as cartId from product inner join cart on product.id = cart.productId where cart.userId = ?";
            con.query(sql,[userId*1],(err,queryResults)=>{
              con.release();
              err ? reject(err) : resolve(queryResults);
            });    
          }
          else
            reject(err);
        });
       });
    }
    removeFromCart(){
        return new Promise((resolve,reject)=>{
             pool.getConnection((err,con)=>{
               if(!err){
                 let sql = "delete from cart where productId=? and userId=?";
                 con.query(sql,[this.productId,this.userId],(err,queryResult)=>{
                    con.release();
                    err ? reject(err) : resolve(queryResult);
                 });
               }
               else
                 reject(err);
             });
        });   
     }
    addItemInCart(){
       return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
              if(!err){
                let sql = "insert into cart(productId,userId,qty) values(?,?,?)";
                con.query(sql,[this.productId,this.userId,this.qty],(err,queryResult)=>{
                   con.release();
                   err ? reject(err) : resolve(queryResult);
                });
              }
              else
                reject(err);
            });
       });   
    }
}