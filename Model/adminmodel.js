const pool = require("../Util/dbconnection");
module.exports = class Admin{
    constructor(adminname,password){
        this.adminname = adminname;
        this.password = password;
    }

    checkUser(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(err) reject(err);
                else{
                    let sql = "select * from admin where adminname=? and password = ?";
                    con.query(sql,[this.adminname,this.password],(err,result)=>{
                        err ? reject(err) : resolve(result);
                        con.release();
                    });
                }
            })
        });
    }
}