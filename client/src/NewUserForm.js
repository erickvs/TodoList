import React from 'react'
import { Field, reduxForm } from 'redux-form'

let NewUserForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
			<div className="form-group">
		    <label>Name</label>
		    <Field 
		    	name="name" 
		    	component="input" 
		    	type="text" 
		    	className="form-control" 
		    	aria-describedby="name" 
		    	placeholder="Enter name"
		    />
		  </div>
		  <div className="form-group">
		    <label>Email address</label>
		    <Field 
		    	name="email" 
		    	component="input" 
		    	type="email" 
		    	className="form-control" 
		    	aria-describedby="emailHelp" 
		    	placeholder="Enter email"
		    />
		    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
		  </div>
		  <div className="form-group">
		    <label>Password</label>
		    <Field 
		    	name="password" 
		    	component="input"
		    	type="password" 
		    	className="form-control" 
		    	placeholder="Password"
		    />
		  </div>
		  <div className="form-group">
		    <label>Password Confirmation</label>
		    <Field 
		    	name="passwordConfirmation" 
		    	component="input"
		    	type="password" 
		    	className="form-control" 
		    	placeholder="Password"
		    />
		  </div>
		  <button 
		  	type="submit" 
		  	className="btn btn-primary" 
		  	style={{"width": "100%"}}>
		  	Submit
		  </button>
    </form>
  )
}

NewUserForm = reduxForm({form: 'newUser'})(NewUserForm)

export default NewUserForm
