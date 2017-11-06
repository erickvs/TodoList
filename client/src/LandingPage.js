import React from 'react'

function LandingPage(props) {
	return(
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="jumbotron" style={{"marginTop": "35px"}}>
						<h1 className="display-3" style={{"textAlign": "center"}}>
							Welcome to the TODO List App!
						</h1>
						<p className="lead" style={{"textAlign": "center"}}>
							This app was created using React, Redux, ExpressJS, MongoDB and Node.
						</p>
				 		<p className="lead" style={{"textAlign": "center"}}>
				    	<a className="btn btn-primary btn-lg" href="/signup" role="button" 
				    			style={{"margin": "20px", "width": "30%"}}>
				    		Sign up
				    	</a>
				  	</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LandingPage