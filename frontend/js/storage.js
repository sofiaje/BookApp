export function isLoggedIn() {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        return true
    }
}

export function getToken() {
    if (sessionStorage.getItem("jwt")) {
        return sessionStorage.getItem("jwt")
    } else {
        return localStorage.getItem("jwt")
    }
}