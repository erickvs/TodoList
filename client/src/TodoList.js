import React from 'react'
import Todo from './Todo'
import './ListContainer.css'

class TodoList extends React.Component {
	componentWillMount() {
		this.props.fetchTodos()
	}
	render() {
		const props = this.props
		const todos = props.todos.map((todo, index) => {
			return <Todo 
				toggleIsCompleted={props.handleToggleIsCompleted} 
				key={index}
				todoIndex={index}
				todoId={todo.todoId}
				todo={todo.todo} 
				completed={todo.isCompleted} 
			/>
		})
		return(
			<div className='container-fluid'>
				<header>
					<h1>Erick's TODOs</h1>
				</header>
				<ul className='todoList'>
					{ todos }
				</ul>
			</div>
		)
	}
}
export default TodoList