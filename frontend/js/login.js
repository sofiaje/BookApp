
// ------------------------------ login / register ------------------------------------


loginBtn.addEventListener("click", () => {
    contentWrapper.innerHTML = `
    <div id="login-container">
        <h2>Login</h2>
        <form action="" id="loginform">
            <label for="inputName">Username or email</label><br>
            <input type="text" id="inputName"><br>

            <label for="passw">Password</label><br>
            <input type="password" id="passw"><br>

            <input type="checkbox" id="remember">
            <label for="remember">Remember me</label><br>

            <input type="submit" class="btn" value="Login"><br>
        </form>
        <button class="invisible" onclick="toggleVis()">Not yet a member? Register here</button>
    </div>
    
    <div id="register-container" class="hidden">
        <h2>Create account</h2>
        <form action="" id="regform">
            <label for="inputNameReg">Username</label><br>
            <input type="text" id="inputNameReg"><br>

            <label for="emailReg">Email</label><br>
            <input type="email" id="emailReg"><br>

            <label for="passwReg">Password</label><br>
            <input type="password" id="passwReg"><br>

            <input type="submit" class="btn" value="Register"><br>
        </form>
        <button class="invisible" onclick="toggleVis()"><i class="fa-solid fa-arrow-left-long"></i> Back to login</button>
    </div>
    
    <p id="errorText"></p>`

    errorText = document.getElementById("errorText")

    document.getElementById("loginform").addEventListener("submit", (e) => {
        e.preventDefault()

        inputName = document.getElementById("inputName")
        passw = document.getElementById("passw")
        if (!inputName.value || !passw.value) {
            errorText.innerHTML = `Please make sure all fields are filled in correctly`
        } else {
            login(inputName.value, passw.value)

        }

    })

    document.getElementById("regform").addEventListener("submit", (e) => {
        e.preventDefault()

        inputNameReg = document.getElementById("inputNameReg")
        emailReg = document.getElementById("emailReg")
        passwReg = document.getElementById("passwReg")

        if (!inputNameReg.value || !emailReg.value || !passwReg.value) {
            errorText.innerHTML = `Please make sure all fields are filled in correctly`

        } else {
            registerUser(inputNameReg.value, emailReg.value, passwReg.value)
        }
    })
})

//toggle register / login visability
function toggleVis() {
    document.getElementById("register-container").classList.toggle("hidden")
    document.getElementById("login-container").classList.toggle("hidden")
    errorText.innerText = ""
}


// login function
async function login(user, passw) {
    try {
        let res = await axios.post("http://localhost:1337/api/auth/local", {
            identifier: user,
            password: passw
        })
        signedIn(res.data);

        inputName.value = ""
        passw.value = ""
        console.log("det gick bra va! ")

    } catch (error) {
        console.log(error)
        errorText.innerText = `${error.response.data.error.message}`
        console.log("det gick dåligt va! ")
    }
}

// function to register as new user
async function registerUser(user, email, passw) {
    try {
        let res = await axios.post("http://localhost:1337/api/auth/local/register", {
            username: user,
            email: email,
            password: passw
        })
        signedIn(res.data);
        inputNameReg.value = ""
        emailReg.value = ""
        passwReg.value = ""
    } catch (error) {
        errorText.innerText = `${error.response.data.error.message}`
    }
}

//function that saves userdata in localstorage or sessionstorage depending on checkbox-status
function signedIn(data) {
    const remember = document.getElementById("remember")

    if (remember.checked) {
        localStorage.setItem("user", data.user.username)
        localStorage.setItem("jwt", data.jwt)
    } else {
        sessionStorage.setItem("user", data.user.username)
        sessionStorage.setItem("jwt", data.jwt)
    }
    errorText.innerText = ``
    renderMyPage()
}

// function to log out user
function logout() {
    sessionStorage.clear()
    localStorage.clear()
    location.reload()
}

logoutBtn.addEventListener("click", () => {
    logout()
})

