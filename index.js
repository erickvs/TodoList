const _ = require("lodash");
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const mongoose = require('mongoose')
const morgan = require('morgan')
const SECRET = require('./config').SECRET
const bcrypt = require("bcrypt-nodejs");
const SALT_FACTOR = 10;

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
process.env.MONGODB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/todolist';

// Use bluebird
mongoose.Promise = require('bluebird');

mongoose.connect(uristring, {useMongoClient: true},
	function (err, res) {
	  if (err) {
	  	console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	  } else {
	  	console.log ('Succeeded connected to: ' + uristring);
	  }
});

const app = express()
app.use(morgan('combined'))

// Create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Database setup
var db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', function() {

	// Todo Schema
	var todoSchema = mongoose.Schema({
		todo: String,
		isCompleted: Boolean
	})
	todoSchema.methods.toggleCompleted = function() {
		this.isCompleted = !this.isCompleted
	}

	var userSchema = mongoose.Schema({
	  // _id: mongoose.Schema.Types.ObjectId,
	  name: {
	  	type: String,
	  	required: [true, 'There was no name submitted in the request.'],
	  	maxlength: [100, 'Name exceeds the number of characters allowed (100).'],
	  },
	  email: {
	  	type: String,
	  	unique: true,
	  	index: true,
	  	required: true,
	  	maxlength: 255,
	  	validate: {
          validator: function(v) {
          	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(v)
          },
          message: '{VALUE} is not a valid email address!'
        },
	  },
	  password: { type: String, required: true },
	  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
	});	

	const noop = function() {};

	userSchema.pre("save", function(done) {
		const user = this
		if (!user.isModified("password")) {
			return done()
		}
		bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
			if (err) { 
				return done(err)
			}

			bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
				if (err) { 
					return done(err)
				}
				user.password = hashedPassword
				done()
			})
		})
	})


	//  Models
	var Todo = mongoose.model('Todo', todoSchema )
	var User = mongoose.model('User', userSchema)

	// JWT
	const jwtOptions = {}
	jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
	jwtOptions.secretOrKey = SECRET

	const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	  console.log('payload received', jwt_payload);
	  // usually this would be a database call:
	  const user = User.findOne({_id: jwt_payload.userId}, function(err, user) {
			if (user) {
		    next(null, user);
		  } else {
		    next(null, false);
		  }
	  })
	});

	passport.use(strategy);
	app.use(passport.initialize());

	// Log the user in
	app.post('/api/login', function(req, res) {

		// Extract email and password from the request
		const email = req.body.email
		const password = req.body.password

		// Make sure that the name, email and password are present.
		if (!(email && password)) {
			var msg = ""
			if (!email) msg += "Email is missing. "
			if (!password) msg += "Password is missing. "
			res.status(401).json({message: msg})
			// Log the error and return
			return console.log("REQUEST ERROR(S): ", msg)
		}
		User.findOne({email: email}, function(err, user) {
			if (err) {
				res.status(401)
				return console.log(err.message)
			} else if (user) {
				bcrypt.compare(password, user.password, function(err, isMatch) {
					if (err) {console.log(err)}
					if (isMatch) {
						// At this point the user should have been succesfully saved to the
						// database, therefore the user should now have an identifying _id
						const payload = {userId: user._id}
						const token = jwt.sign(payload, jwtOptions.secretOrKey)
						res.json({username: user.name, token: token})
						return console.log(`${user.name} has succesfully logged in!`)
					}
				})
			} else {
				res.status(401).json({message: "Invalid email/password combination"})
				return console.log(`Unsuccesful login attempt: ${email}`)
			}
		})
	})

	// Create a new user, this happens when a user signs up for the app. The user
	// is automatically signed in.
	app.post('/api/users', function(req, res) {

		// Extract name, email and password from the request
		const name = req.body.name
		const email = req.body.email
		const password = req.body.password

		// Make sure that the name, email and password are present.
		if (!(name && email && password)) {
			var msg = ""
			if (!name) msg += "Name is missing. "
			if (!email) msg += "Email is missing. "
			if (!password) msg += "Password is missing. "
			res.status(401).json({message: msg})
			// Log the error and return
			return console.log("REQUEST ERROR(S): ", msg)
		}
		// Create a new user
		const user = new User({
			name: name,
			email: email,
			password: password
		})
		// Attempt to save the user to the database
		user.save(function(err, user) {
			// An error will occur if there is a validation error.
			if (err) {
				res.status(401).json({message: err.message})
				return console.log(err.message)
			}
			// At this point the user should have been succesfully saved to the
			// database, therefore the user should now have an identifying _id
			const payload = {userId: user._id}
			const token = jwt.sign(payload, jwtOptions.secretOrKey)
			res.json({username: user.name, token: token})
			return console.log(`${user.name} was succefully saved to the database`)
		})
	})

	// Create new todo
	app.post('/api/todos', 
		passport.authenticate('jwt', {session: false}), 
		function(req, res) {
			// Make sure that the user has permission to do this.
			const token = req.get('Authorization').split(" ")[1]
			jwt.verify(token, SECRET, function(err, decoded) {
				if (err) {
					res.status(401)
					return console.log(err.message)
				}
				// Everything has checked out, lets save the TODO
				User.findOne({_id: decoded.userId}, function(err, user) {
					if (err) {
						res.status(401)
						return console.log(err.message)
					}
					const todo = new Todo({
						todo: req.body.todo, 
						isCompleted: false
					})
					todo.save(function (err, todo) {
						if (err) {return console.log(err)}
						user.todos.push(todo._id)
						user.save(function(err, user) {
							if (err) {return console.log(err)}
							res.json({
								todo: todo.todo,
								isCompleted: todo.isCompleted,
								todoId: todo._id
							})
						})
					})
				})
			})
	}) // end create new todo

	// Toggle a TODO's completed state
	app.put('/api/todos/:todoId/toggle-is-completed',
		passport.authenticate('jwt', {session: false}), 
		function(req, res) {
			// Make sure that the user has permission to do this.
			const token = req.get('Authorization').split(" ")[1]
			jwt.verify(token, SECRET, function(err, decoded) {
				if (err) {
					res.status(401)
					return console.log(err.message)
				}
				// Find the user and make sure that the TODO is in their list
				User.findOne({_id: decoded.userId}, function(err, user) {
					if (err) {
						res.status(401)
						return console.log(err.message)
					}
					// If the todo exists in the array then it belongs to the user...
					if (user.todos.indexOf(req.params.todoId) !== -1) {
						Todo.findOne({_id: req.params.todoId}, function(err, todo) {
							if (err) {
								return console.log(err)
							}
							todo.toggleCompleted()
							todo.save(function(err, todo) {
								if (err) return console.log(err)
								res.json({
									todo: todo.todo,
									isCompleted: todo.isCompleted,
									todoId: todo._id
								})
							})
						})
					} else {
						res.status(401).json({message: "Invalid TODO id"})
					}
				})
			})
	})

	// Delete a TODO of the current user
	app.delete('/api/todos/:todoId',
		passport.authenticate('jwt', {session: false}),
		function(req, res) {
			// Make sure that the user has permission to do this
			const token = req.get("Authorization").split(" ")[1]
			jwt.verify(token, SECRET, function(err, decoded) {
				if (err) {
					res.status(401).json({message: "You cannot delete this TODO!"})
					return console.log(err.message)
				}
				// Delete the TODO id from the users list of todos
				User.findOne({_id: decoded.userId}, function(err, user) {
					if (err) {
						const msg = "There was a problem trying to find the user."
						res.status(500).json({message: msg})
						return console.log(msg)
					}
					const index = user.todos.indexOf(req.params.todoId)
					if (index > -1) { 
						user.todos.splice(index,1) 
						user.save(function(err, user) {
							if (err) {
								return console.log("Error saving user after remoing TODO")
							}
						})
					} else {
						res.status(400).json({message: "The todoId is invalid."})
						return console.log("The todoId is invalid")
					}
					Todo.remove({_id: req.params.todoId}, function(err, todo) {
						if (err) {
							res.status(500)
							return console.log("There was an error removing the TODO.")
						}
						res.json({success: true})
						return console.log(`Removed TODO`)
					})
				})
			})
		})

	// Get all todos for current user
	app.get('/api/todos', 
		passport.authenticate('jwt', {session: false}), 
		function(req, res) {
			// Make sure that the user has permission to do this
			const token = req.get("Authorization").split(" ")[1]
			jwt.verify(token, SECRET, function(err, decoded) {
				if (err) {
					res.status(500).json({message: "Error verifying token."})
					return console.log(err.message)
				}

				User.findOne({_id: decoded.userId}, function(err, user) {
					if (err) {
						res.status(500)
						return console.log(err.message)
					}
				})
				.populate('todos')
				.exec(function(err, user) {
					if (err) {
						res.status(500).json("There was an error populating TODOs")
						return console.log(err.message)
					}
					const todos = user.todos
					const todosAsObjects = {}
					todos.forEach(todo => {
						todosAsObjects[`${todo._id}`] = {
							todo: todo.todo,
							isCompleted: todo.isCompleted
						}
					})
					res.json(todosAsObjects)
				})
			})
	})

	// The "catchall" handler: for any request that doesn't
	// match one above, send back React's index.html file.
	app.get('*', (req, res) => {
	  res.sendFile(path.join(__dirname+'/client/build/index.html'));
	});	
})

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`TODO List API listening on port ${port}`)
})