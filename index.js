const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
process.env.MONGODB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/todolist';

//mongoose.connect('mongodb://localhost/todolist')
mongoose.connect(uristring, function (err, res) {
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

	todoSchema.methods.updatePosition = function(pos) {
		this.position = pos
	}

	// Todo model
	var Todo = mongoose.model('Todo', todoSchema )

	// Create a new todo
	app.post('/api/todos', function(req, res) {
		const todo = new Todo({
			todo: req.body.todo, 
			isCompleted: false
		})
		todo.save(function (err, todo) {
			if (err) {
				return console.log(err)
			}
			res.json({
				todo: todo.todo,
				isCompleted: todo.isCompleted,
				todoId: todo._id
			})
		})
	})

	// Toggle a TODO's completed state
	app.put('/api/todos/:todoId/toggle-is-completed', function(req, res) {
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
	})

	// Modify TODOs positions
	app.put('/api/todos/', function(req, res) {
		const REGEX = /([a-f0-9]+):([\d]+)/
		const arr = req.body.todos.split(",")
		arr.forEach( token => {
			const matchResult = token.match(REGEX)
			const todoId = matchResult[1]
			const newPosition = matchResult[2]
			Todo.findOne({_id: todoId}, function(err, todo) {
				if (err) return console.log(err)
				todo.updatePosition(newPosition) // Update position
				todo.save(function(err, todo) {
					if (err) return console.log(err)
					// TODO should be updated now
				})
			})
		})
		res.json({success: true})
	})

	// Delete todo
	app.delete('/api/todos/:todoId', function(req, res) {
		Todo.remove({_id: req.params.todoId}, function(err, todo) {
			if (err) {
				return console.log(err)
			}
			res.json({
				success: true
			})
		})
	})

	// Get all todos
	app.get('/api/todos', function(req, res) {
		Todo.find(function(err, todos) {
			if (err) { return console.error(err)}
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