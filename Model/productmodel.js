const pool = require("../Util/dbconnection");
module.exports = class Product{
    constructor(name,price,description,qty,date,category_id){
        this.name = name;
        this.price = price;
        this.description = description;
        this.qty = qty;
        this.date = date;
        this.category_id = category_id;
    }

    addProduct(){
        return new Promise((resolve,reject) =>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else{
                    let sql = "insert into product(name,price,description,qty,date,category_id) values(?,?,?,?,?,?)";
                    con.query(sql,[this.name,this.price,this.description,this.qty,this.date,this.category_id],(err,result) =>{
                        err ? reject(err) : resolve(result);
                    });
                }
            });
        });
    }
}