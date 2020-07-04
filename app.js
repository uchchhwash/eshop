const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.listen(3000, () => {
    console.log("server is listening on port: 3000")
})