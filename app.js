const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));


app.use("/admin", adminData.routes);
app.use("/shop", shopRoutes);

app.use((req, res) => {
    res.status(404).render('404', { pageTitle: "Page not found" });
})

app.listen(3000, () => {
    console.log("server is listening on port: 3000")
})