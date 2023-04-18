import { changeNav } from "./nav.js"
import { setUsername } from "./mypage.js"
import { loginpage } from "./login.js"
import { getInfo } from "./api.js"
import { addToList, getUserInfo } from "./cards.js"
import { setRatingStars, calcRate } from "./starRating.js"
import { isLoggedIn } from "./storage.js"



let allBooks
let info


// ------------------------------ load first page ------------------------------------


export async function loadPage() {

    // if first time on home page, fetch first page info and save in info variable
    if (!info) { info = await getInfo("http://localhost:1337/api/first-page-info?populate=*") }
    let articleArr = info.data.attributes.article

    // fetch books, everytime page load
    let res = await getInfo("http://localhost:1337/api/books?populate=*");
    allBooks = res.data
    console.log(allBooks)

    // display info first page
    contentWrapper.innerHTML = `
    <div class="firstpageContainer">
        <img src="assets/bookcovers/mag.jpg" class="bigImg" alt="pile of books">
        <div class="bigText">
            <h1>${info.data.attributes.heading}</h1>
            <button class="btn startBtn" id="startBtn">Start now</button>
        </div>
    </div>
    <div class="firstpageInfo">
    </div>
        
    <h2 class="p-1">Our selection</h2>
    <div class="bookContainer">
    </div>`

    // render articles on first page
    articleArr.forEach(x => { renderArticles(x.title, x.body)})

    // for each book, calculate avrage grade and display on first page
    allBooks.forEach((book, i)=> {
        let grades = book.attributes.review.data.map(x => x.attributes.grade)
        let grade = calcRate(grades)
        // console.log(book)
        bookCard(book, grade)
    });
    
    document.getElementById("startBtn").addEventListener("click", loginpage)


    // if user is logged in, set username, change nav, hide first page info
    if (isLoggedIn()) {
        changeNav()
        setUsername()
        document.querySelector(".firstpageContainer").classList.add("hidden")
        document.querySelector(".firstpageInfo").classList.add("hidden")
    }
}



// render article on first page
function renderArticles(title, body) {
    let article = document.createElement("article")
    article.innerHTML = `<h2>${title}</h2><p>${body}</p>`
    document.querySelector(".firstpageInfo").append(article)
}




export function bookCard(obj, grade) {
    let { title, author, pages, releaseDate, coverImg } = obj.attributes

    let card = document.createElement("div");
    card.classList.add("card")
    card.innerHTML = `<img src="http://localhost:1337${coverImg.data.attributes.url}" class="bookThumbnail" alt="bookcover">`

    let textDiv = document.createElement("div")
    textDiv.classList.add("text")
    textDiv.innerHTML = `<div>
        <h3>${title}</h3>
        <p class="author">by ${author}</p>
        <span class="grade">
            <div class="star" value="1"><i class="fa-solid fa-star ${1 <= grade ? "color" : ""}"></i></div>
            <div class="star" value="2"><i class="fa-solid fa-star ${2 <= grade ? "color" : ""}"></i></div>
            <div class="star" value="3"><i class="fa-solid fa-star ${3 <= grade ? "color" : ""}"></i></div>
            <div class="star" value="4"><i class="fa-solid fa-star ${4 <= grade ? "color" : ""}"></i></div>
            <div class="star" value="5"><i class="fa-solid fa-star ${5 <= grade ? "color" : ""}"></i></div>
        </span>
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
    
    setRatingStars(card, obj.id)
}

