const e = require("express");
const pool = require("../Util/dbconnection");
module.exports = class Category {
    constructor(categoryName,categoryImage) {
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
    }

    save(){
        return new Promise((resolve,reject) =>{
            pool.getConnection((err,con) =>{
                if(err)
                    reject(err);
                else
                {
                    let sql = "insert into category"
                }
            })
        })
    }
}