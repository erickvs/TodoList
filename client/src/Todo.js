import React from 'react'
import './Todo.css'
import FontAwesome from 'react-fontawesome'
/*
	A TODO has 2 parts, the text part and 
	the UI that marks the TODO as completed.
	Pass the TODO and the completed state
	in the props.
*/

function Todo(props) {
	const completedTodo = (
			<svg xmlns="http://www.w3.org/2000/svg" width="90%" height="100%">
				<circle cx="40" cy="29" r="22" stroke="black" fill="black" 
					onClick={props.toggleIsCompleted} 
					data-todoid={props.todoId}/>
				<text x="80" y="36" fontFamily='Quicksand' fontSize="20px" 
				fill="rgb(150,150,150)" style={{textDecoration: "line-through"}}>
					{props.todo} 
				</text>
			</svg>
	)
	const incompleteTodo = (
			<svg xmlns="http://www.w3.org/2000/svg" width="90%" height="100%">
				<circle cx="40" cy="29" r="22" stroke="black" fill="white" 
				onClick={props.toggleIsCompleted}
				data-todoid={props.todoId}/>
				<text x="80" y="36" fontFamily='Quicksand' fontSize="20px" fill="black">
					{props.todo} 
				</text>
			</svg>
	)

	return(
		<li className="todo" draggable="true" >
			{props.completed ? completedTodo : incompleteTodo}
			<div id="delIcon">
				<h1 data-todoid={props.todoId} onClick={props.deleteTodo}>
					<FontAwesome name='close' />
				</h1>
			</div>
		</li>
	)
}

export default Todo