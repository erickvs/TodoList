import { connect } from 'react-redux'
import { fetchTodos } from './actions'
import './App.css';
import TodoList from './TodoList'
import {saveToggleIsCompleted} from './actions'


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
		},
		fetchTodos: fetchTodos
	}
}

const App = connect(mapStateToProps, mapDispatchToProps)(TodoList)
export default App