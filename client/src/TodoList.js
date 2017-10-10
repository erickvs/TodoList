import React from 'react'
import Todo from './Todo'

function TodoList(props) {
	return(
		<div className='container'>
			<header>
				<h1>Welcome to the TodoList</h1>
			</header>
			<Todo />
		</div>
	)
}

export default TodoList