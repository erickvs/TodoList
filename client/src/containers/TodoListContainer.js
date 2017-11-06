import { connect } from 'react-redux'
import TodoList from '../TodoList'
import {
	toggleNewTodoFormDisplay, 
	saveToggleIsCompleted, 
	createNewTodo,
	deleteTodo
} from '../actions'

const mapStateToProps = state => {
	return {
		user: state.TodoList.user,
		todos: state.TodoList.todos,
		displayNewTodoForm: state.TodoList.displayNewTodoForm
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleToggleIsCompleted: e => {
			const todoId = e.target.dataset.todoid
			dispatch(saveToggleIsCompleted(todoId))
		},
		handleCreateNewTodo: todo => {
			dispatch(createNewTodo(todo))
		},
		toggleNewTodoFormDisplay: () => {
			dispatch(toggleNewTodoFormDisplay())
		},
		handleDeleteTodo: e => {
			const todoId = e.target.parentNode.dataset.todoid
			dispatch(deleteTodo(todoId))
		}
	}
}

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList)
export default TodoListContainer