import React from 'react'
import {connect} from 'react-redux'
import {logOutUser} from './actions'

const mapStateToProps = state => {
	return {
		user: state.TodoList.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleLogOutUser: e => {
			e.preventDefault()
			dispatch(logOutUser())
		}
	}
}

const NavigationBarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(NavigationBar)

function NavigationBar(props) {
	const loginLink  = (
		<a className="nav-link" href="/login" >Log in</a>
	)
	const logoutLink = (
		<a onClick={props.handleLogOutUser} className="nav-link">Log Out</a>
	)
	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
		<div className="container">
		  <a className="navbar-brand" href="/">TODO List</a>
		  <div style={{"flexGrow":0}} >
	    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
	      <li className="nav-item">
	        {props.user ? logoutLink : loginLink}
	      </li>
	    </ul>
		  </div>
		  </div>
		</nav>
	)
}

export default NavigationBarContainer