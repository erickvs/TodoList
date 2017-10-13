import {	ADD_TODO, 
					TOGGLE_IS_COMPLETED,
					INITIALIZE_TODOS
				} from '../actions'
const initialState = {
	allTodos: []
}

export default (state = initialState, action) => {
	switch(action.type) {
		case INITIALIZE_TODOS:
			return {
				allTodos: action.todos
			}
		case ADD_TODO:
			return {
				...state,
				allTodos: [
					...state.allTodos,
					action.todo
				]
			}
		case TOGGLE_IS_COMPLETED:
			const newTodos = [...state.allTodos]
			const index = action.todo.position
			newTodos[index].isCompleted = action.todo.isCompleted
			return {
				...state,
				allTodos: newTodos
			}
		default:
			return state
	}
}