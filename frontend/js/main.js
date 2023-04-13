import { registerUser, logout, login, signedIn, toggleVis } from "./login.js"
import { renderReadList, addToList, updateGrade } from "./cards.js"
import { changeNav } from "./nav.js"
// import { getData } from "./api.js"
import { setUsername, renderMyPage } from "./mypage.js"



let errorText, allBooks, inputName, passw, inputNameReg, emailReg, passwReg

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

        inputName = document.getElementById("inputName")
        passw = document.getElementById("passw")
        if (!inputName.value || !passw.value) {
            errorText.innerHTML = `Please make sure all fields are filled in correctly`
        } else {
            let data = await login(inputName, passw)
            if (data) {
                signedIn(data);
                renderMyPage()
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
                renderMyPage()
            }
        }
    })
}





// ------------------------------ load first page ------------------------------------


async function loadPage() {

    // ändra vid betygsättning, behöver då alltid hämta nytt data för att få senaste uppdateringen?
    if (allBooks === undefined) {
        let res = await axios.get("http://localhost:1337/api/books?populate=*");
        allBooks = res.data.data
        console.log("fetch books / not logged in")
    }



    contentWrapper.innerHTML = `
    <div class="firstpageContainer">
        <img src="assets/bookcovers/mag.jpg" class="bigImg" alt="pile of books">
        <div class="bigText">
            <h1>Keep track of<br> your reading</h1>
            <button class="btn startBtn" id="startBtn">Start now</button>
        </div>
    </div>
    <div class="firstpageInfo">
        <article>
            <h2>About us</h2>
            <p>LitRate is an innovative mobile app that allows users to rate and review a carefully curated selection of books and create personalized reading lists. Our small company is dedicated to providing a platform that is easy to use, visually appealing, and fosters a sense of community among readers.</p>
        </article>
        <article>
            <h2>How does it work?</h2>
            <p>With LitRate, you can easily discover new books based on your interests and share your thoughts and opinions with other book lovers. Whether you're an avid reader or just looking for your next great read, LitRate is the perfect app for you.</p>
        </article>
        <article>
            <h2>The books</h2>
            <p>Earum harum obcaecati reiciendis ex deserunt est sed in excepturi fugit voluptatum.</p>
        </article>
    </div>
        
    <h2 class="p-1">Our selection</h2>
    <div class="bookContainer">
    </div>`

    allBooks.forEach(book => {
        bookCard(book)
    });

    document.getElementById("startBtn").addEventListener("click", loginpage)

    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        changeNav()
        setUsername()
        document.querySelector(".firstpageContainer").classList.add("hidden")
        document.querySelector(".firstpageInfo").classList.add("hidden")
    }
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
        ${grade === null ? "" : grade} 

        <p>Pages: ${pages}<br>
        Relese date: ${releaseDate}</p>
    </div>`

    let btn = document.createElement("button")
    btn.classList.add("btn", "addBtn")
    btn.innerHTML = `<i class="fa-regular fa-bookmark fa-xl"></i>`

    card.append(textDiv, btn)


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