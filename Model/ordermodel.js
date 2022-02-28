const pool = require("../Util/dbconnection");

module.exports = class Order {
    constructor(customer_id,totalAmount,date){
        this.customer_id = customer_id;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    static totalOrders(){
        return new Promise((resolve,reject) =>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else
                {
                    let sql = "select count(*) as totalOrders from orders";
                    con.query(sql,(err,result)=>{
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
            })
        })
    }

    static totalSales(){
        return new Promise((resolve,reject) =>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else
                {
                    let sql = "select sum(totalAmount) as totalAmount from orders;";
                    con.query(sql,(err,result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            })
        })
    }
    static recentOrders(){
        return new Promise((resolve,reject) =>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else
                {
                    let sql = "select customer.name as name,totalAmount,DATE_FORMAT(date,'%d-%m-%y') as date from orders inner join customer on orders.customer_id=customer.id where month(date) = month(UTC_TIMESTAMP());";
                    con.query(sql,(err,result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            })
        })
    }
    static orderList(){
        return new Promise((resolve,reject) =>{
            pool.getConnection((err,con)=>{
                if(err)
                    reject(err);
                else
                {
                    let sql = "select orders.id,customer.name as name,totalAmount,DATE_FORMAT(date,'%y-%m-%d') as date from orders inner join customer on orders.customer_id=customer.id;";
                    con.query(sql,(err,result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            })
        })
    }
}