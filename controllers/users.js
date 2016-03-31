const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.route("/signup")
	.get(function(req,res){
		res.render("auth/signup");
	})
	.post(function(req,res){
		if(req.body.password !== req.body.password2){
			req.flash("error", "Passwords must match");
			res.redirect("/auth/signup");
		} else {
			db.user.findOrCreate({
				where: {
					email: req.body.email
				},
				defaults: {
					name: req.body.name,
					email: req.body.email,
					password: req.body.password
				}
		}).spread(function(user,created){
			if(created) {
				req.flash("success", "you are signed up");
				res.redirect("/");
			} else {
				req.flash("danger", "a user with that email already exists");
				res.redirect("auth/signup");
			}
		}).catch(function(err){
			req.flash("error", "an error occured");
			res.redirect("/auth/signup");
		})
		}
	});

router.route("/login")
	.get(function(req,res){
		res.render("auth/login");
	})
	.post(function(req,res){
    passport.authenticate("local", function(err, user, info) {
      if (user) {
        req.login(user, function(err) {
          if (err) throw err;
          req.session.user = user.id;
          req.flash("success", "you are now logged in.");
          res.redirect("/products");
        });
      } else {
        req.flash("danger", "error");
        res.redirect("/auth/login");
      }
    })(req, res);		
	});

router.route("/logout", function(req,res){
  req.logout();
  req.flash("info", "You have been logged out.");
  req.session.user = false;
  res.redirect("/");
});

module.exports = router;