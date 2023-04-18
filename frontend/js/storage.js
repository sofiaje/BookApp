export function isLoggedIn() {
    if (sessionStorage.getItem("jwt") || sessionStorage.getItem("jwt")) {
        return true
    }
}