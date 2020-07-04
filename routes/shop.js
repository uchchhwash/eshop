const adminData = require("./admin");
const rootDir = require("../util/path");
const path = require("path");
const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.render("shop", {
        pageTitle: "Products",
        path: "/shop",
        prods: adminData.products
    });
});

module.exports = router;