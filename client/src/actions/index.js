import axios from 'axios'
import {logIn, logOut} from '../helperFunctions'

export const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING"
export const toggleIsLoading = () => {
	return {
		type: TOGGLE_IS_LOADING
	}
}

export const TOGGLE_REDIRECT = "TOGGLE_REDIRECT"
export const toggleRedirect = () => {
	return {
		type: TOGGLE_REDIRECT
	}
}

export const SET_USER = "SET_USER"
export const setUser = name => {
	return {
		type: SET_USER,
		name
	}
}

export const logOutUser = () => {
	return dispatch => {
		dispatch(toggleIsLoading())
		logOut()
		dispatch(setUser(""))
		dispatch(toggleIsLoading())
	}
}

export const loginUser = credentials => {
	return dispatch => {
		axios({
			method: 'post',
			url: '/api/login',
			data: {
				email: credentials.email,
				password: credentials.password
			}
		}).then(response => {
			dispatch(toggleIsLoading())
			logIn(response.data.token)
			dispatch(setUser(response.data.username))
			dispatch(fetchTodos(response.data.token))
			dispatch(toggleRedirect())
			dispatch(toggleIsLoading())
		})
	}
}

export const createAndLogInUser = user => {
	return dispatch => {
		axios({
			method: 'post',
			url: '/api/users',
			data: {
				name: user.name,
				email: user.email,
				password: user.password
			}
		}).then(response => {
			dispatch(toggleIsLoading())
			logIn(response.data.token)
			dispatch(setUser(response.data.username))
			dispatch(toggleRedirect())
			dispatch(toggleIsLoading())
		}).catch(error => {
			console.log(error)
		})
	}
}


// This has to be edited.. retrieve TODOS using token
export const fetchTodos = token => {
	return dispatch => {
		return axios({
			method: 'get',
			url: '/api/todos',
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then( response => {
			const todos = response.data
			dispatch(initializeTodos(todos))
		}).catch(error => console.log(error))
	}
}

export const INITIALIZE_TODOS = "INITIALIZE_TODOS"
export const initializeTodos = (todos) => {
	return {
		type: INITIALIZE_TODOS,
		todos
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
			data: { todo: todo },
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`
			}
		}).then(
			response => {
				dispatch(addTodo(response.data))
			}
		).catch(error => console.log(error))
	}
}

export const deleteTodo = todoId => {
	return dispatch => {
		return axios({
			method: 'delete', 
			url: `/api/todos/${todoId}`,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`
			}
		}).then(response => {
			dispatch(fetchTodos(sessionStorage.getItem('jwtToken')))
		}).catch(error => console.log(error))
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
			url: `/api/todos/${todoId}/toggle-is-completed`,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`
			}
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
