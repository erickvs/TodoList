import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import registerServiceWorker from './registerServiceWorker';
import TodoList from './reducers/TodoList'
import RouterContainer from './routes'

const loggerMiddleware = createLogger()

const middleware = applyMiddleware(
	thunkMiddleware,
	loggerMiddleware
);

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	TodoList,
	form: formReducer
})

const store = createStore(
	rootReducer,
	composeEnhancers(middleware)
);

// Hydrate the store
// store.dispatch(fetchTodos())

ReactDOM.render(
	<Provider store={store}>
		<RouterContainer />
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
