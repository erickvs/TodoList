import React from 'react'
import {connect} from 'react-redux'
import LoginForm from './LoginForm'
import {Redirect} from 'react-router'
import { loginUser } from './actions'

const mapStateToProps = state => {
	return {
		redirect: state.TodoList.redirect,
		isLoading: state.TodoList.isLoading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleOnSubmitLoginForm: values => {
			dispatch(loginUser(values))
		}
	}
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login)
export default LoginContainer

function Login(props) {
	return (
		<div className="container" style={{marginTop: "40px"}}>
			<div className="row">
				<div className="col-md-4 offset-md-4">
					<h1 style={{"textAlign": "center"}}>Log in</h1>
					<LoginForm onSubmit={props.handleOnSubmitLoginForm} />
					{props.redirect && (<Redirect to='/' />)}
				</div>
			</div>
		</div>
	)
}