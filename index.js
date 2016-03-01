"use strict"

const express = require("express");
const db = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const flash = require("connect-flash");
app.use(flash());

app.use("/api/products", require("./controllers/products"));

app.get("/*", function(req,res){
	res.sendFile(path.join(__dirname, "public/index.html"));
})

app.listen(port, function() {
	console.log("Port 3000 is live");
});
