import { changeNav } from "./nav.js"
import { setUsername } from "./mypage.js"
import { loginpage } from "./login.js"
import { addToList, calcRate } from "./cards.js"


let allBooks


// ------------------------------ load first page ------------------------------------

export async function loadPage() {

    // needs to be updated because of the grades
    let res = await axios.get("http://localhost:1337/api/books?populate=*");
    allBooks = res.data.data
    console.log(res.data)

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
            <h2>How does it work?</h2>
            <p>With LitRate, you can easily discover new books based on your interests and share your thoughts and opinions with other book lovers. Whether you're an avid reader or just looking for your next great read, LitRate is the perfect app for you.</p>
        </article>
        <article>
            <h2>About us</h2>
            <p>LitRate is an innovative mobile app that allows users to rate and review a carefully curated selection of books and create personalized reading lists. Our small company is dedicated to providing a platform that is easy to use, visually appealing, and fosters a sense of community among readers.</p>
        </article>
        <article>
            <h2>The books</h2>
            <p>Earum harum obcaecati reiciendis ex deserunt est sed in excepturi fugit voluptatum deserunt est sed in excepturi fugit volupta.</p>
        </article>
        
    </div>
        
    <h2 class="p-1">Our selection</h2>
    <div class="bookContainer">
    </div>`

    allBooks.forEach(book => {
        let grade = calcRate(book.attributes.rate)
        bookCard(book, grade)
    });

    document.getElementById("startBtn").addEventListener("click", loginpage)

    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        changeNav()
        setUsername()
        document.querySelector(".firstpageContainer").classList.add("hidden")
        document.querySelector(".firstpageInfo").classList.add("hidden")
    }
}






export function bookCard(obj, grade) {
    let { title, author, pages, releaseDate, coverImg } = obj.attributes

    console.log()

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
        <span class="color">${grade === null ? "" :  grade} </span>
        <br><br>
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
