import {	ADD_TODO, 
					TOGGLE_IS_COMPLETED,
					INITIALIZE_TODOS,
					TOGGLE_NEW_TODO_FORM_DISPLAY
				} from '../actions'
const initialState = {
	todos: {},
	displayNewTodoForm: false
}

export default (state = initialState, action) => {
	switch(action.type) {

		case INITIALIZE_TODOS:
			return {
				...state,
				todos: action.todos
			}

		case ADD_TODO:
			return {
				...state,
				todos: {
					...state.todos,
					[action.todo.todoId]: {
						todo: action.todo.todo,
						isCompleted: false,
					}
				}
			}

		case TOGGLE_IS_COMPLETED:
			return {
				...state,
				todos: {
					...state.todos,
					[action.todo.todoId]: {
						todo: action.todo.todo,
						isCompleted: action.todo.isCompleted
					}
				}
			}

		case TOGGLE_NEW_TODO_FORM_DISPLAY:
			return {
				...state,
				displayNewTodoForm: !state.displayNewTodoForm
			}

		default:
			return state
	}
}