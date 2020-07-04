const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product"
    });
};

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/shop");
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render("shop", {
            pageTitle: "Products",
            path: "/shop",
            prods: products
        });
    });
}