// check if user is logged in
export function isLoggedIn() {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        return true
    }
}


// get token from session storage or local storage
export function getToken() {
    if (sessionStorage.getItem("jwt")) {
        return sessionStorage.getItem("jwt")
    } else {
        return localStorage.getItem("jwt")
    }
}