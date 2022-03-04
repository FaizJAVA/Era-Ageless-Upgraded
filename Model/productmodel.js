const { promiseImpl } = require("ejs");
const pool = require("../Util/dbconnection");
module.exports = class Product {
    constructor(name, price, description, qty, date, category_id, images) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.qty = qty;
        this.date = date;
        this.category_id = category_id;
        this.images = images;
    }

    addProduct() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err)
                    reject(err);
                else {
                    // console.log("Inside Query : "+this.images);
                    let sql = "insert into product(name,price,description,qty,date,category_id,images) values(?,?,?,?,?,?,?)";
                    con.query(sql, [this.name, this.price, this.description, this.qty, this.date, this.category_id, this.images], (err, result) => {
                        err ? reject(err) : resolve(result);
                    });
                }
            });
        });
    }

    static viewProduct() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select category.name as c_name,product.id,product.name,price,description,qty,DATE_FORMAT(date,'%d-%m-%y') as  date,product.images from product inner join category on product.category_id=category.id";
                    con.query(sql, (err, result) => {
                        err ? reject(err) : resolve(result);
                    })
                }
                else {
                    reject(err);
                }
            })
        })
    }

    static deleteProduct(id){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "delete from product where id = ?";
                    con.query(sql,[id],(err, result) => {
                        err ? reject(err) : resolve(result);
                    })
                }
                else {
                    reject(err);
                }
            })
        })
    }

    editProduct(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "update product set name=?,price=?,description=?,qty=?,images=?, category_id=?,date=? where id = ?";
                    con.query(sql,[this.name,this.price,this.description,this.qty,this.images,this.category_id,this.date,this.id],(err, result) => {
                        err ? reject(err) : resolve(result);
                    });
                }
                else {
                    reject(err);
                }
            })
        });
    }

    static readOneProduct(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from product where id=?";
                    con.query(sql,[id] ,(err, result) => {
                        err ? reject(err) : resolve(result);
                    })
                }
                else {
                    reject(err);
                }
            })
        })
    }
    
    static viewOneProduct(id){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select category_id,category.name as c_name,product.id,product.name,price,description,qty,images from product inner join category on category.id=product.category_id where product.id=?;";
                    con.query(sql,[id*1],(err, result) => {
                        console.log(result);
                        err ? reject(err) : resolve(result);
                    })
                }
                else {
                    reject(err);
                }
            })
        })
    }
    
    static checkProduct(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = " select * from cart where productId = ?;";
                    con.query(sql,[id] ,(err, result) => {
                        err ? reject(err) : resolve(result);
                    })
                }
                else {
                    reject(err);
                }
            })
        })
    }


    // static signout() {
    //     return new Promise((resolve, reject) => {
    //         pool.getConnection((err, con) => {
    //             if (!err) {
    //                 let sql = "select * from product";
    //                 con.query(sql, (err, result) => {
    //                     err ? reject(err) : resolve(result);
    //             | query              | customer_id | status    })
    //             }
    //             else {
    //                 reject(err);
    //             }
    //         })
    //     })
    // }

}