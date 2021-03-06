const pool = require("../Util/dbconnection");
module.exports= class Query{
    constructor(query,customer_id,status){
        this.query=query;
        this.customer_id=customer_id;
        this.status=status;
    }
    static fetchAll(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from query inner join customer on customer_id=customer.id";
                    con.query(sql, (err, result) => {
                        err ? reject(err) : resolve(result);
                    })
                }
                else {
                    reject(err);
                }
            });
        });
    }
     update(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "update query set status=? where customer_id =?;";
                    con.query(sql,[this.status,this.customer_id] ,(err, result) => {
                        console.log(result);
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else {
                    reject(err);
                }
            });
        });
    }


}