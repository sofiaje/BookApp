// function to register as new user
export async function registerUser(user, email, passw) {
    try {
        let res = await axios.post("http://localhost:1337/api/auth/local/register", {
            username: user,
            email: email,
            password: passw
        })
        return res.data
    } catch (error) {
        console.log(error)
        errorText.innerText = `${error.response.data?.error.message}`
    }
}



// function to log in user
export async function login(user, passw) {
    try {
        let res = await axios.post("http://localhost:1337/api/auth/local", {
            identifier: user.value,
            password: passw.value
        })

        return res.data
    } catch (error) {
        console.log(error)
        errorText.innerText = `${error.response.data?.error.message}`
        return false
    }
}


// function to log out user
export function logout() {
    sessionStorage.clear()
    localStorage.clear()
    location.reload()
}


// function that saves userdata in localstorage or sessionstorage depending on checkbox-status
export function signedIn(data) {
    const remember = document.getElementById("remember")

    if (remember.checked) {
        localStorage.setItem("user", data.user.username)
        localStorage.setItem("jwt", data.jwt)
    } else {
        sessionStorage.setItem("user", data.user.username)
        sessionStorage.setItem("jwt", data.jwt)
    }
}



// toggle register / login visability
export function toggleVis() {
    document.getElementById("register-container").classList.toggle("hidden")
    document.getElementById("login-container").classList.toggle("hidden")
    errorText.innerText = ""
}
