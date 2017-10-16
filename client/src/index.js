import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import TodoList from './reducers/TodoList'
import {fetchTodos} from './actions'

const loggerMiddleware = createLogger()

const middleware = applyMiddleware(
	thunkMiddleware,
	loggerMiddleware
);

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	TodoList,
	composeEnhancers(middleware)
);

// Hydrate the store
store.dispatch(fetchTodos())

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
