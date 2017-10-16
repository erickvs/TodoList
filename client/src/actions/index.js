import axios from 'axios'

export const INITIALIZE_TODOS = "INITIALIZE_TODOS"
export const initializeTodos = (todos) => {
	return {
		type: INITIALIZE_TODOS,
		todos
	}
}
export const fetchTodos = () => {
	return dispatch => {
		return axios({
			method: 'get',
			url: `/api/todos`
		}).then( response => {
			const todos = response.data
			dispatch(initializeTodos(todos))
		}).catch(error => console.log(error))
	}
}

export const ADD_TODO = "ADD_TODO"
export const addTodo = (todo) => {
	return {
		type: ADD_TODO,
		todo
	}
}
export const createNewTodo = todo => {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: '/api/todos',
			data: { todo: todo }
		}).then(
			response => {
				dispatch(addTodo(response.data))
			}
		).catch(
			error => console.log(error)
		)
	}
}

export const TOGGLE_IS_COMPLETED = "TOGGLE_IS_COMPLETED"
export const toggleIsCompleted = (todo) => {
	return {
		type: TOGGLE_IS_COMPLETED,
		todo
	}
}
export const saveToggleIsCompleted = (todoId) => {
	return dispatch => {
		return axios({
			method: 'put',
			url: `/api/todos/${todoId}/toggle-is-completed`
		}).then(
			response => {
				const todo = response.data
				dispatch(toggleIsCompleted(todo))
		}).catch(
			error => console.log(error)
		)
	}
}

export const TOGGLE_NEW_TODO_FORM_DISPLAY = 'TOGGLE_NEW_TODO_FORM_DISPLAY'
export const toggleNewTodoFormDisplay = () => {
	return {
		type: TOGGLE_NEW_TODO_FORM_DISPLAY
	}
}
