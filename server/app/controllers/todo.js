var express = require('express'),
	logger = require('../../config/logger'),
	router = express.Router()
mongoose = require('mongoose'),
	Todo = mongoose.model('Todo');
//Authentication
passportService = require('../../config/passport')
passport = require('passport')
var requireAuth = passport.authenticate('jwt', { session: false });
//End Authentication

module.exports = function (app) {
	app.use('/api', router);

	router.route('/todos')

		//More Web Services
		.post(requireAuth, function (req, res, next) {
			logger.log('Create Todo', 'verbose');
			var todo = new Todo(req.body);
			todo.save()
				.then(function (result) {
					res.status(201).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})

		.get(requireAuth, function (req, res) {
			logger.log("Get all todos", "verbose");
			res.status(200).json({ msg: "Get all todos" });
		})

		// .post(function(req, res){
		// 	logger.log("Create a chirps","verbose");
		// 	res.status(201).json({msg: "Create a chirps"});
		// })

		// .put(requireAuth, function (req, res) {
		// console.log(req.params.id)
		// 	Todo.put({ _id: req.params.id }, function (err, result) {
		// 		if (err) {
		// 			return next(err);
		// 		} else {
		// 			res.status(200).json({ message: 'Update a todos' });
		// 		}
		// 	});
		// });

		.put(function (req, res, next) {
			logger.log('Update a Todo ' + req.params.id, 'verbose');
			var query = Todo.findOneAndUpdate(
				{ _id: req.body._id },
				req.body,
				{ _id: true })
				.exec()
				.then(function (result) {
					res.status(200).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		});

	router.route('/todos/:id')

		.get(requireAuth, function (req, res) {
			logger.log("Get a todos", "verbose");
			res.status(200).json({ msg: "Get a todos" });
		})

		.delete(requireAuth, function (req, res) {
			console.log(req.params.id)
			Todo.remove({ _id: req.params.id }, function (err, result) {
				if (err) {
					return next(err);
				} else {
					res.status(200).json({ message: 'Record Deleted' });
				}
			});
		});

	router.route('/todos/userTodo/:id')

		//More Web Services
		.get(requireAuth, function (req, res, next) {
			logger.log('Get User Todos ' + req.params.id, 'verbose');
			Todo.find({ todoAuthor: req.params.id })
				.populate('todoAuthor')
				.sort("-dateCreated")
				.exec()
				.then(function (todos) {
					res.status(200).json(todos);
				})
				.catch(function (err) {
					return next(err);
				})
		});


	// 	.get(function (req, res) {
	// 	logger.log("Get a user’s chirps", "verbose");
	// 	res.status(200).json({ msg: "Get a user’s chirps" });
	// });

	router.route('/todos/like/:id')

		//More Web Services
		.put(requireAuth, function (req, res, next) {
			logger.log('Update Todo ' + req.params.id, 'debug');
			Todo.findOne({ _id: req.params.id }).exec()
				.then(function (todo) {
					todo.likes++;
					return todo.save();
				})
				.then(function (todo) {
					res.status(200).json(todo);
				})
				.catch(function (err) {
					return next(err);
				});
		});

	router.route('/todos/followedTodos/:id')

		//More Web Services
		.get(requireAuth, function (req, res, next) {
			logger.log('Get Users followed todos ' + req.params.id, 'debug');
			User.findOne({ _id: req.params.id }, function (err, user) {
				if (!err) {
					Todo.find({
						$or: [
							{ todoAuthor: user._id }, { todoAuthor: { $in: user.follow } }
						]
					}).populate('todoAuthor').sort({ dateSubmitted: -1 }).exec(function (err, todos) {
						if (!err) {
							res.status(200).json(todos);
						} else {
							res.status(403).json({ message: "Forbidden" });
						}
					});
				}
			});
		});

	// .get(requireAuth, function (req, res, next) {
	// 	logger.log('Get Users followed chirps ' + req.params.id, 'verbose');
	// 	User.findOne({ _id: req.params.id })
	// 		.then(function (user) {
	// 			Chirp.find({ $or: [{ chirpAuthor: user._id }, { chirpAuthor: { $in: user.follow } }] })
	// 				.populate('screenName')
	// 				.sort('-dateCreated')
	// 				.exec()
	// 				.then(function (chirps) {
	// 					res.status(200).json(chirps);
	// 				})
	// 		})
	// 		.catch(function (err) {
	// 			return next(error);
	// 		});
	// });



	// 	.put(function (req, res) {
	// 	logger.log("Like a chirp", "verbose");
	// 	res.status(201).json({ msg: "Like a chirp" });
	// });

}