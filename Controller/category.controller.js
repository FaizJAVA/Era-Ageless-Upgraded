const Category = require("../Model/categorymodel");
const path = require("path");
exports.addCategory = (req, res, next) => {
    res.render("Admin-view/add-category.ejs");
}

exports.addCategoryPost = (req, res, next) => {
    const file = req.files.categoryImage;
    const fileName = new Date().getTime() + file.name;

    if (file) {
        let filePath = path.join(__dirname, "../", "Public/Images", fileName);
        file.mv(filePath, (err) => {
            if (!err) {
                let cat = new Category();
                cat.categoryName = req.body.categoryName;
                cat.categoryImage = fileName;
                cat.save()
                .then((result)=>{
                    res.redirect("/admin/dashboard");
                })
                .catch((err) =>{
                    res.send('Something went wrong');
                })
            }
        })
    }

}
