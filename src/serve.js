const express = require("express");
const { request } = require("http");
const app = express();
const path = require("path");
const routes = require("./routes");

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,"..","public")))

app.set("views",path.resolve(__dirname,"src","views"));
app.set("view engine","ejs");

app.use(routes);
app.listen(3333,() => console.log("funcionou"))