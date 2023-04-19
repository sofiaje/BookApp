import { changeNav } from "./nav.js"
import { loginpage } from "./login.js"
import { getInfo } from "./api.js"
import { addToList, cardText, setUsername } from "./cards.js"
import { setRatingStars, calcRate } from "./starRating.js"
import { isLoggedIn } from "./storage.js"



let allBooks
let info


// ------------------------------ load first page ------------------------------------


// load home page
export async function loadPage() {

    if (!isLoggedIn()) {
        // if first time on home page, fetch first page info and save in info variable
        if (!info) { info = await getInfo("http://localhost:1337/api/first-page-info?populate=*") }
        let articleArr = info.data.attributes.article


        // display info first page
        contentWrapper.innerHTML = `
        <div class="firstpageContainer">
            <img src="assets/bookcovers/mag.jpg" class="bigImg" alt="hand holding book">
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
        articleArr.forEach(x => { renderArticles(x.title, x.body) })

        // login btn
        document.getElementById("startBtn").addEventListener("click", loginpage)
    } else {
        changeNav()
        setUsername()
        contentWrapper.innerHTML = `<h2 class="p-1">Our selection</h2>
            <div class="bookContainer">
            </div>`
    }
    
    // fetch books, everytime page load
    let res = await getInfo("http://localhost:1337/api/books?populate=*");
    allBooks = res.data
    console.log(allBooks)


    // for each book, calculate avrage grade and display on first page
    allBooks.forEach((book, i) => {
        let grades = book.attributes.review.data.map(x => x.attributes.grade)
        let grade = calcRate(grades)
        bookCardFirstPage(book, grade)
    });

}



// render article on first page
function renderArticles(title, body) {
    let article = document.createElement("article")
    article.innerHTML = `<h2>${title}</h2><p>${body}</p>`
    document.querySelector(".firstpageInfo").append(article)
}



// create book card and append in bookcontainer
export function bookCardFirstPage(obj, grade) {
    let { title, author, pages, releaseDate, coverImg } = obj.attributes

    let card = document.createElement("div");
    card.classList.add("card")
    card.innerHTML = `<img src="http://localhost:1337${coverImg.data.attributes.url}" class="bookThumbnail" alt="bookcover">`

    let textDiv = document.createElement("div")
    textDiv.classList.add("text")
    textDiv.innerHTML = cardText(title, author, grade, pages, releaseDate, true)

    let btn = document.createElement("button")
    btn.classList.add("btn", "addBtn")
    btn.innerHTML = `<i class="fa-regular fa-bookmark fa-xl"></i>`

    card.append(textDiv, btn)

    btn.addEventListener("click", async () => {
        await addToList(obj.id)
    })

    document.querySelector(".bookContainer").append(card)

    setRatingStars(card, obj.id)
}

