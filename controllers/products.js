"use strict"

const express = require("express");
const router = express.Router();
const db = require("./../models");

router.route("/")
	.get(function(req,res){
		db.product.findAll().then(function(product){
			res.send(product);
		}).catch(function(err){
			console.log('error!,', err);
		});
	})
	.post(function(req,res){
		db.product.findOrCreate
	});

module.exports = router;