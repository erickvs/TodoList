import { connect } from 'react-redux'
import Signup from '../Signup'
import { createAndLogInUser } from '../actions'

const mapStateToProps = state => {
	return {
		redirect: state.TodoList.redirect,
		isLoading: state.TodoList.isLoading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleOnSubmitNewUserForm: values => {
			dispatch(createAndLogInUser(values))
		}
	}
}

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup)
export default SignupContainer