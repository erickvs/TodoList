import React from 'react'
import NewUserForm from './NewUserForm'
import {Redirect} from 'react-router'

function Signup(props) {
	return (
		<div className="container" style={{marginTop: "40px"}}>
			<div className="row">
				<div className="col-md-4 offset-md-4">
					<h1 style={{"textAlign": "center"}}>Sign up</h1>
					<NewUserForm onSubmit={props.handleOnSubmitNewUserForm} />
					{props.redirect && (<Redirect to='/' />)}
				</div>
			</div>
		</div>
	)
}

export default Signup