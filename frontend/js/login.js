import { loginApi, registerUserApi } from "./api.js"
import { renderMyPage } from "./mypage.js"


let errorText, inputName, passw, inputNameReg, emailReg, passwReg


// ------------------------------ login  ------------------------------------

export async function loginpage() {
    contentWrapper.innerHTML = `
    <div id="login-container" class="p-1">
        <h2 class="head">Login</h2>
        <form action="" id="loginform">
            <label for="inputName">Username or email</label><br>
            <input type="text" id="inputName"><br>

            <label for="passw">Password</label><br>
            <input type="password" id="passw"><br>

            <div class="flex max">
                <div>
                    <input type="checkbox" id="remember">
                    <label for="remember">Remember me</label>
                </div>
                <a class="navLink" id="toReg">Not yet a member? Register here</a>
            </div><br>

            <input type="submit" class="btn" value="Login"><br>
        </form>
    </div>
    
    <div id="register-container" class="hidden p-1">
        <h2 class="head">Create account</h2>
        <form action="" id="regform">
            <label for="inputNameReg">Username</label><br>
            <input type="text" id="inputNameReg"><br>

            <label for="emailReg">Email</label><br>
            <input type="email" id="emailReg"><br>

            <label for="passwReg">Password</label><br>
            <input type="password" id="passwReg"><br>

            <input type="submit" class="btn" value="Register"><br>
        </form>
        <button class="invisible" id="backToLog"><i class="fa-solid fa-arrow-left-long"></i> Back to login</button>
    </div>
    
    <p id="errorText" class="p-1"></p>`

    errorText = document.getElementById("errorText")

    //toggle between login form and register form
    document.getElementById("toReg").addEventListener("click", toggleVis)
    document.getElementById("backToLog").addEventListener("click", toggleVis)

    // log in button
    document.getElementById("loginform").addEventListener("submit", async (e) => {
        e.preventDefault()
        login()
    })

    // register button
    document.getElementById("regform").addEventListener("submit", async (e) => {
        e.preventDefault()
        register()
    })
}



// check input fields, call login user api function
async function login() {
    inputName = document.getElementById("inputName")
    passw = document.getElementById("passw")
    if (!inputName.value || !passw.value) {
        errorText.innerHTML = `Please make sure all fields are filled in correctly`
    } else {
        let data = await loginApi(inputName, passw)
        console.log(data)
        if (data) {
            signedIn(data);
            renderMyPage()
        }
    }
}


// check input fields, call register user api function
async function register() {
    inputNameReg = document.getElementById("inputNameReg")
    emailReg = document.getElementById("emailReg")
    passwReg = document.getElementById("passwReg")

    if (!inputNameReg.value || !emailReg.value || !passwReg.value) {
        errorText.innerHTML = `Please make sure all fields are filled in correctly`

    } else {
        let data = await registerUserApi(inputNameReg.value, emailReg.value, passwReg.value)
        console.log(data)

        if (data) {
            signedIn(data);
            renderMyPage()
        }
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
