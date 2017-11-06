// Logs the user in by saving the token in session storeage
export const logIn = token => sessionStorage.setItem('jwtToken', token)

// Logs the user out by removing the token from session storage
export const logOut = () => sessionStorage.removeItem('jwtToken')

// Returns true if there exists a token in session storage
export const isLoggedIn = () => !!sessionStorage.getItem('jwtToken')