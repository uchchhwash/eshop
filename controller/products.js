const products = [];

exports.getAddProduct = (req, res) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product"
    });
};

exports.postAddProduct = (req, res) => {
    products.push({ title: req.body.title })
    res.redirect("/shop");
}

exports.getProducts = (req, res) => {
    res.render("shop", {
        pageTitle: "Products",
        path: "/shop",
        prods: products
    });
}