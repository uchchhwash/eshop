const path = require("path");
const rootDir = require("../util/path")
const express = require("express");
const router = express.Router();

const products = [];

router.get("/add-product", (req, res) => {
        res.render("add-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product"
        });
    })
    .post("/add-product", (req, res) => {
        products.push({ title: req.body.title })
        res.redirect("/shop");
    })

exports.routes = router;
exports.products = products;