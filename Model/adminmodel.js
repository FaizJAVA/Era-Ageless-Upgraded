const pool = require("../Util/dbconnection");
module.exports = class Admin{
    constructor(email,password){
        this.email = email;
        this.password = password;
    }

    checkUser(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err) reject(err);
                else{
                    let sql = "select * from admin where email=? and password = ?";
                    con.query(sql,[this.email,this.password],(err,result)=>{
                        err ? reject(err) : resolve(result);
                        con.release();
                    });
                }
            })
        });
    }
}