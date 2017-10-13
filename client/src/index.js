import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import TodoList from './reducers/TodoList'
import {fetchTodos} from './actions'

const loggerMiddleware = createLogger()

let store = createStore(
	TodoList,
	compose(
		applyMiddleware(thunkMiddleware,loggerMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

// Hydrate the store
store.dispatch(fetchTodos())

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
