import React from 'react'
import {connect} from 'react-redux'
import {toggleRedirect} from '../actions'
import {isLoggedIn} from '../helperFunctions'
import TodoListContainer from './TodoListContainer'
import LandingPage from '../LandingPage'

const mapStateToProps = state => {
	return {
		redirect: state.TodoList.redirect
	}
}
const mapDispatchToProps = dispatch => {
	return {
		toggleRedirect: () => {
			dispatch(toggleRedirect())
		}
	}
}
const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)
export default HomeContainer

function Home(props) {
	// Toggle the value of redirect, just in case we were redirected from anywhere
	(props.redirect && props.toggleRedirect())
	return isLoggedIn() ? <TodoListContainer /> : <LandingPage />
}