const pool=require('../Util/dbconnection');

module.exports=class User{
    constructor(name,email,password,mobile,gender,address){
        this.name=name;
        this.email=email;
        this.password=password;
        this.mobile=mobile;
        this.gender=gender;
        this.address=address;
    }

    saveuser(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,conn)=>{
                if(!err){
                    const sql='insert into customer(name,email,password,mobile,gender,address) values(?,?,?,?,?,?)';                    
                    conn.query(sql,[this.name,this.email,this.password,this.mobile,this.gender,this.address],(err,result)=>{
                        err ? reject(err) : resolve(result);
                    });
                }
                else
                    reject(err);
            });
        });
    }

    check(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,conn)=>{
                if(!err){
                    const sql="select * from customer where email=? and password=?";
                    conn.query(sql,[this.email,this.password],(err,result)=>{
                        err ? reject(err) : resolve(result);
                    });
                }
                else   
                    reject(err);
            });
        });
    }
    static countUser(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,conn)=>{
                if(!err){
                    const sql="select count(*) as totalCustomer from customer;";
                    conn.query(sql,(err,result)=>{
                        err ? reject(err) : resolve(result);
                    });
                }
                else   
                    reject(err);
            });
        });
    }
}