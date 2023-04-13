import { registerUser, logout, login, signedIn, toggleVis } from "./login.js"
import { renderReadList, addToList, updateGrade } from "./cards.js"
import { changeNav } from "./nav.js"
// import { getData } from "./api.js"
import { setUsername, renderMyPage } from "./mypage.js"



let errorText
let allBooks
let inputName
let passw
let inputNameReg
let emailReg
let passwReg


let contentWrapper = document.getElementById("contentWrapper")



// ------------------------------ nav  ---------------------------------------

// home
document.getElementById("homeBtn").addEventListener("click", loadPage)

// sign in / register
document.getElementById("loginBtn").addEventListener("click", loginpage)

// log out
document.getElementById("logoutBtn").addEventListener("click", logout)

// my page
document.getElementById("mypageBtn").addEventListener("click", renderMyPage)




// ------------------------------ login  ------------------------------------

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


    //toggle between login form and register form
    document.getElementById("toReg").addEventListener("click", toggleVis)
    document.getElementById("backToLog").addEventListener("click", toggleVis)


    // log in button
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


    // register button
    document.getElementById("regform").addEventListener("submit", async (e) => {
        e.preventDefault()

        inputNameReg = document.getElementById("inputNameReg")
        emailReg = document.getElementById("emailReg")
        passwReg = document.getElementById("passwReg")

        if (!inputNameReg.value || !emailReg.value || !passwReg.value) {
            errorText.innerHTML = `Please make sure all fields are filled in correctly`

        } else {
            let data = await registerUser(inputNameReg.value, emailReg.value, passwReg.value)
            if (data) {
                signedIn(data);
            }
        }
    })
}





// ------------------------------ load first page ------------------------------------


async function loadPage() {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        changeNav()
        setUsername()
    }

    // ändra vid betygsättning, behöver då alltid hämta nytt data för att få senaste uppdateringen?
    if (allBooks === undefined) {
        let res = await axios.get("http://localhost:1337/api/books?populate=*");
        allBooks = res.data.data
        console.log("fetch books / not logged in")
    }


    contentWrapper.innerHTML = `<h2>Our Books</h2>
            <div class="bookContainer">
            </div>`

        allBooks.forEach(book => {
        bookCard(book)
    });
}


function bookCard(obj) {
    let { title, author, pages, releaseDate, grade, coverImg } = obj.attributes

    let card = document.createElement("div");
    card.classList.add("card")
    card.innerHTML = `<img src="http://localhost:1337${coverImg.data.attributes.url}" class="bookThumbnail" alt="bookcover">`

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

// calls page load
loadPage()