"use strict"

const express = require("express");
const db = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
const port = 3000;
const session = require("express-session");
const passport = require("passport");
const strategies = require("./config/strategies");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
	secret: "supersecret",
	resave: false,
	saveUninitialized: true
}));

const flash = require("connect-flash");
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);

passport.use(strategies.localStrategy);

app.use(function(req, res, next){
	if (req.session.user) {
		db.user.findById(req.session.user).then(function(user){
			if (user) {
				req.currentUser = user;
				next();
			} else {
				req.currentUser = false;
				next();
			}
		});
	} else {
		req.currentUser = false;
		next();
	}
});

app.use(function(req, res, next) {
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});

app.get('/', function(req,res) {
	res.render('index');
});

app.use("/api/products", require("./controllers/products"));
app.use("/api/auth", require("./controllers/users"));

app.get("/*", function(req,res){
	res.sendFile(path.join(__dirname, "public/index.html"));
})

app.listen(port, function() {
	console.log("Port 3000 is live");
});
