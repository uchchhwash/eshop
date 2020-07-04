const path = require("path");
const express = require("express");
const router = express.Router();
const productsController = require("../controller/products")


router.get("/add-product", productsController.getAddProduct)
    .post("/add-product", productsController.postAddProduct)


module.exports = router;