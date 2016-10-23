var express = require('express'),
	logger = require('../../config/logger'),
  	router = express.Router()  

module.exports = function (app) {
  	app.use('/api', router);  

	router.route('/users')	

		.get(function (req, res) {
			logger.log("Get all users","verbose");
            res.status(200).json({msg: "GET all users"});
		})

		.post(function(req, res){
			logger.log("Create a users","verbose");
			res.status(201).json({msg: "Create a user"});
		})

		.put(function(req, res){
			logger.log("Update a users","verbose");
			res.status(201).json({msg: "Update a user"});
		});

		router.route('/users/:id')	

		.get(function (req, res) {
			logger.log("Get a users","verbose");
            res.status(200).json({msg: "GET a user"});
		})

		.delete(function (req, res) {
			logger.log("Delete a user","verbose");
            res.status(200).json({msg: "Delete a user"});
		});

		router.route('/users/screenName/:name')

		.get(function (req, res) {
			logger.log("Get a user based on screen name","verbose");
            res.status(200).json({msg: "Get a user based on screen name"});
		});

		router.route('/users/followedChirps/:id')
		
		.get(function (req, res) {
			logger.log("Get the chirps of the users a user follows","verbose");
            res.status(200).json({msg: "Get the chirps of the users a user follows"});
		});

		router.route('/users/follow/:id')

		.put(function(req, res){
			logger.log("Follow a user","verbose");
			res.status(201).json({msg: "Follow a user"});
		});
}
