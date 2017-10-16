import { connect } from 'react-redux'
import './App.css';
import TodoList from '../TodoList'
import {
	toggleNewTodoFormDisplay, 
	saveToggleIsCompleted, 
	createNewTodo
} from '../actions'


const mapStateToProps = state => {
	return {
		todos: state.todos,
		displayNewTodoForm: state.displayNewTodoForm
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleToggleIsCompleted: (e) => {
			const todoId = e.target.dataset.todoid
			dispatch(saveToggleIsCompleted(todoId))
		},
		handleCreateNewTodo: (todo) => {
			dispatch(createNewTodo(todo))
		},
		toggleNewTodoFormDisplay: () => {
			dispatch(toggleNewTodoFormDisplay())
		}
	}
}

const App = connect(mapStateToProps, mapDispatchToProps)(TodoList)
export default App