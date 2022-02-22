const pool = require("../Util/dbconnection");
module.exports = class Category {
    constructor(categoryName,categoryImage,gender) {
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
        this.gender = gender;
    }

    save(){
        return new Promise((resolve,reject) =>{
            pool.getConnection((err,con) =>{
                if(err)
                    reject(err);
                else
                {
                    let sql = "insert into category(name,image,gender) values(?,?,?)";
                    con.query(sql,[this.categoryName,this.categoryImage,this.gender],(err,result)=>{
                        err ? reject(err) : resolve(result);
                        con.release();
                    });
                }
            });
        });
    }

    fetchAll(){
        return new Promise((resolve,reject) =>{
            pool.getConnection((err,con) =>{
                if(err)
                    reject(err);
                else
                {
                    let sql = "select * from category";
                    con.query(sql,(err,result)=>{
                        err ? reject(err) : resolve(result);
                        con.release();
                    });
                }
            });
        });
    }
}