# TODO List
A simple TODO list powered by a ExpressJS, MongoDB and Mongoose back-end and a 
React and Redux front-end.

## Creating a new TODO
POST https://dry-brushlands-90075.herokuapp.com/api/todos

body {
	content: Your TODO 
	position: A number that will indicate the position of this TODO in the TODO list
}
RETURNS: 
{
	"success": true,
	todoId: a 24 hex character string representing the id of the TODO
}

## Deleting a TODO
DELETE http://localhost:5000/api/todos/:todoId
RETURNS:
{
	"success": true
}

## Toggling completed state of TODO
PUT http://localhost:5000/api/todos/:todoId
body {
	type: "TOGGLE_IS_COMPLETED" (like literally the string)
}
RETURNS:
{

  "todo": TODO,
  "isCompleted": BOOLEAN,
  "todoId": TODO ID

}

## Change the position of the TODO (moving the TODO in the list)
PUT http://localhost:5000/api/todos/:todoId
body {
	type: POSITIONS_CHANGED,
	todos: 	something like 59dc14e413129b0683634f05:5,59dc14c013129b0683634f04:4
					which is a string that separates tokens by comas, the part of each token
					before the semicolon is the ID of the TODO and the number after is its new
					position in the list. This method is meant to do a batch update of the positions
					of the items in the list, why? For example lets say you have this list
					a > b > c > d > e
					where > indicates that x is above y (x > y), lets say that we move e above all
					this means that e's postion changes from 4 to 0 and thus all the remaining items 
					in the list must update their positions as well.

}

## Getting all TODOs
GET https://dry-brushlands-90075.herokuapp.com/api/todos
RETURNS {
	todos: 	An array of objects where each object represents a todo
					for example: 
				[{
            "todo": "Hi I am a TODO",
            "isCompleted": false,
            "todoId": "59dc3185584a1800048c32a6",
            "position": 1
        }]
}