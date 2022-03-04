const pool = require("../Util/dbconnection");
module.exports = class Index {
    constructor(name,image,gender) {
        this.name = name;
        this.image = image;
        this.gender = gender;
    }

    

    fetchcategory(){
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
    static indViewProduct() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select category.name as c_name,product.id,product.name,price,description,qty,DATE_FORMAT(date,'%d-%m-%y') as  date,product.images from product inner join category on product.category_id=category.id";
                    con.query(sql, (err, result) => {
                        err ? reject(err) : resolve(result);
                        con.release();
                    })
                }
                else {
                    reject(err);
                }
            })
        })
    }
}