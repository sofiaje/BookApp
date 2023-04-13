import { logout, login } from "./login.js"
import { renderReadList, addToList, updateGrade } from "./cards.js"
import { getData, changeNav } from "./helpers.js"


let contentWrapper = document.getElementById("contentWrapper")

let errorText
let me
let inputName
let passw
let inputNameReg
let emailReg
let passwReg


const loginBtn = document.getElementById("loginBtn")
const mypageBtn = document.getElementById("mypageBtn")

const userInfo = document.getElementById("userInfo")

// nav
document.getElementById("homeBtn").addEventListener("click", () => {
    loadPage()
})





// ------------------------------ login  ------------------------------------

//login
loginBtn.addEventListener("click", loginpage)

//log out
document.getElementById("logoutBtn").addEventListener("click", logout)




async function loginpage() {
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
        <button class="invisible" id="toReg">Not yet a member? Register here</button>
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
        <button class="invisible" id="backToLog"><i class="fa-solid fa-arrow-left-long"></i> Back to login</button>
    </div>
    
    <p id="errorText"></p>`

    errorText = document.getElementById("errorText")


    //toggla mellan login form och register form
    document.getElementById("toReg").addEventListener("click", toggleVis)
    document.getElementById("backToLog").addEventListener("click", toggleVis)


    //När man trycker på logga in knapp
    document.getElementById("loginform").addEventListener("submit", async (e) => {
        e.preventDefault()

        inputName = document.getElementById("inputName")
        passw = document.getElementById("passw")
        if (!inputName.value || !passw.value) {
            errorText.innerHTML = `Please make sure all fields are filled in correctly`
        } else {
            let data = await login(inputName, passw)
            if (data) {
                signedIn(data);
            }
        }
    })


    //När man trycker på registrera knapp
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
}






// ------------------------------ toggle / register / login  ------------------------------------

//toggle register / login visability
function toggleVis() {
    document.getElementById("register-container").classList.toggle("hidden")
    document.getElementById("login-container").classList.toggle("hidden")
    errorText.innerText = ""
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


// ------------------------------ save local storage ------------------------------------


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



// ------------------------------ render my page --------------------------------------------

mypageBtn.addEventListener("click", () => {
    renderMyPage()
})


async function setUsername() {
    if (!me) {
        me = await getData("http://localhost:1337/api/users/me?populate=deep")
    }
    userInfo.innerHTML = `logged in as ${me.username}`
    return me
}



async function renderMyPage() {
    me = await setUsername()
    changeNav()
    
    contentWrapper.innerHTML = `<h2>Profile page</h2>
    <h3>Reading list</h3>
    <div class="bookContainer"></div><br>
    <h3>Rated books</h3>
    <div id="gradedWrapper"></div>`
    
    
    me.books?.forEach(book => {
        renderReadList(book)
    })
}




// ------------------------------ load page ------------------------------------


function bookCard(obj) {
    let { title, author, pages, releaseDate, grade, coverImg } = obj.attributes

    let card = document.createElement("div");
    card.classList.add("card")
    card.innerHTML = `
        <img src="http://localhost:1337${coverImg.data.attributes.url}" class="bookThumbnail" alt="bookcover">`

    
    let textDiv = document.createElement("div")
    textDiv.classList.add("text")
    textDiv.innerHTML = `<div>
        <h3>${title}</h3>
        <p class="author">by ${author}</p>
        <span class="grade">
        <i class="fa-solid fa-star ${1 <= grade ? "color" : ""}"></i>
        <i class="fa-solid fa-star ${2 <= grade ? "color" : ""}"></i>
        <i class="fa-solid fa-star ${3 <= grade ? "color" : ""}"></i>
        <i class="fa-solid fa-star ${4 <= grade ? "color" : ""}"></i>
        <i class="fa-solid fa-star ${5 <= grade ? "color" : ""}"></i></span>
        ${grade === null ? "no grades" : grade} 

        <p>Pages: ${pages}<br>
        Relese date: ${releaseDate}</p>
    </div>`


    let btn = document.createElement("button")
    btn.classList.add("btn", "addBtn")
    btn.innerText = "Add to reading list"
    textDiv.append(btn)

    card.append(textDiv)
        
    btn.addEventListener("click", async () => {
        let loggedin = await addToList(obj.id)
        if (!loggedin) {
            loginpage()
        }
    })

    document.querySelector(".bookContainer").append(card)
}



async function loadPage() {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        changeNav()
        setUsername()
    }

    let res = await axios.get("http://localhost:1337/api/books?populate=*");

    contentWrapper.innerHTML = `<h2>Books</h2>
            <div class="bookContainer">
            </div>`

    res.data.data.forEach(book => {
        bookCard(book)
    });
}





loadPage()