import React from 'react'
import { Field, reduxForm } from 'redux-form'

let LoginForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
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
		  <button 
		  	type="submit" 
		  	className="btn btn-primary" 
		  	style={{"width": "100%"}}>
		  	Submit
		  </button>
    </form>
  )
}

LoginForm = reduxForm({form: 'newUser'})(LoginForm)

export default LoginForm
