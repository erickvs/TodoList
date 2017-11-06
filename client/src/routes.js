import React from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import NavigationBarContainer from './NavigationBar'
import SignupContainer from './containers/SignupContainer'
import HomeContainer from './containers/HomeContainer'
import {connect} from 'react-redux'
import Loading from './Loading'
import LoginContainer from './Login'

const mapStateToProps = state => {
	return {
		isLoading: state.TodoList.isLoading
	}
}

const RouterContainer = connect(mapStateToProps)(TodoRouter)

function TodoRouter(props) {
	return (
		props.isLoading ? <Loading /> :
		<Router>
			<div>		
				<NavigationBarContainer />
				<Route exact path="/" component={HomeContainer} />
				<Route path="/signup" component={SignupContainer}/>
				<Route path="/login" component={LoginContainer}/>
			</div>
		</Router>
	)
}

export default RouterContainer