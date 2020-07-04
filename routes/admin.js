const path = require("path");
const rootDir = require("../util/path")
const express = require("express");
const router = express.Router();


router.get("/add-product", (req, res) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"))
})


module.exports = router;