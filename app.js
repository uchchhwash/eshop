const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controller/error");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));


app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
    console.log("server is listening on port: 3000")
})