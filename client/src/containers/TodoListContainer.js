import { connect } from 'react-redux'
import TodoList from '../TodoList'
import {saveToggleIsCompleted} from '../actions'

const mapStateToProps = state => {
	return {
		todos: state.allTodos,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleToggleIsCompleted: (e) => {
			const todoId = e.target.dataset.todoid
			dispatch(saveToggleIsCompleted(todoId))
		}
	}
}

const TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList)
export default TodoListContainer