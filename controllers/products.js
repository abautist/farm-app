"use strict"

const express = require("express");
const router = express.Router();
const db = require("./../models");

router.route("/")
	.get(function(req,res){
		db.product.findAll().then(function(products){
			res.send(products);
		}).catch(function(err){
	    if (err === "Unable to connect to database") {
	       return res.status(500).json({ error: "There was an internal error"});
	    }
			res.status(400).json({"error": "Bad input, please ensure you sent all required data" });
		});
	})
	.post(function(req,res){
		db.product.create(req.body).then(function(newProduct){
			res.send(newProduct);
		}).catch(function(err){
			console.log("error", err);
		});
	});

router.route("/:id")
	.get(function(req,res){
		let id = req.params.id;
		db.product.findById(id).then(function(product){
			res.send(product);
		}).catch(function(err){
			console.log("error", err);
		});
	})
	.put(function(req,res){
		db.product.update({
			name: req.body.name,
			price: req.body.price,
			image: req.body.image
		},
		{ where: 
				{
					id: req.params.id
				}
		})
		.then(function(){
			console.log("successfully updated!");
		})
		.catch(function(err){
			console.log("error", err);
		});
	})
	.delete(function(req,res){
		let id = req.params.id;
		db.product.findById(id).then(function(product){
			return product.destroy();
		})
		.then(function(){
			console.log("successfully removed item from db");
		})
		.catch(function(err){
			console.log("error", err);
		})
	});

//put and delete hangs when using postman but still works.

module.exports = router;