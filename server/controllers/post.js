'use strict'

let Post = require('../models/post');
let _ = require('underscore');
let haversine = require('haversine');

let methods = {
	create(req,res){

		let post = new Post(req.body);
		post.save((err,post) => {
			let errors = {},
				success = {};

			if(err){
				errors.errors = err;
				return res.status(503).send(errors);
			}

			success.message = "Post created successfully!";	
			success.id = post.id;
			return res.status(200).send(success);
		})
	},

	list(req,res){

		var radius = req.query.radius;
		var latitude = req.query.latitude;
		var longitude = req.query.longitude;
		console.log(req.query)
		Post.find({},(err,posts) => {
			let errors = {},
				success = {};

			if(err){
				errors.errors = err
				return res.status(503).send(errors);
			}

			if(radius&&latitude&&longitude){
				console.log('entro aqui')
				posts = _.filter(posts, post => {

					let myRadius = haversine({
						latitude:post.latitude,
						longitude:post.longitude
					},{
						latitude:latitude,
						longitude:longitude
					});

					if(myRadius<radius) return post;
					return;
				});			
			}

			success.message = posts.length? "Posts found!" : "Posts not found!"; 
			if(posts) success.posts = posts;
			return res.status(200).send(success);
		})

	},

	getOne(req,res){
		console.log(req.params.id)
		Post.findOne({_id:req.params.id},(err,post) => {
			let errors = {},
				success = {};
			console.log(post)
			if(err){
				errors.errors = err
				return res.status(503).send(errors);
			}

			success.message =  post? "Post found ! ": "Post not found !" ;
			if(post) success.post = post;

			return res.status(200).send(success);

		});
	},

	update(req,res){

		let post = req.body;
		Post.update({ _id:req.params.id },post,(err,post) => {

			let errors = {},
				success = {};

			if(err){
				errors.errors = err;
				return res.status(503).send(errors);
			}
			success.message = "Post updated successfully!";
			return res.status(200).send(success);

		});
	},

	delete(req,res){
		Post.remove({_id:req.params.id},function(err) {
			let errors = {},
				success = {};

			if(err){
				errors.errors = err;
				return res.status(503).send(errors);
			}
			success.message = "Post deleted successfully!";
			return res.status(200).send(success);

		})
	}

}


module.exports = methods;