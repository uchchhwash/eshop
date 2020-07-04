const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(3000, () => {
    console.log("server is listening on port: 3000")
})