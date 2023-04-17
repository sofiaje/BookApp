import { getData } from "./api.js"
import { changeNav } from "./nav.js"
import { removeBook } from "./cards.js"
import { calcRate, getUserInfo } from "./cards.js"

let me; 

export async function setUsername() {
    document.getElementById("userInfo").innerHTML = `logged in as ${sessionStorage.getItem("user") ? sessionStorage.getItem("user") : localStorage.getItem("user")}`
}



export async function renderMyPage() {
    me = await getUserInfo()

    setUsername()
    changeNav()
    
    contentWrapper.innerHTML = `
    <h2 class="p-1">Reading list</h2>
    <div id="readinglistWrapper" class="bookContainer"></div><br>
    <h2 class="p-1">Rated books</h2>
    <div id="gradedWrapper" class="bookContainer"></div>`
    
    
    if (me.books.length > 0) {
        me.books.forEach(book => {
            let btn = deleteFromReadingListBtn(removeBook, book)
            let grades = book.review.map(x => x.grade)
            let grade = calcRate(grades)
            renderReadList(book, grade, "#readinglistWrapper", btn)
        })
    } else {
        document.querySelector(".bookContainer").innerHTML = "<p>No books here! Add books by pressing the bookmark next to the book you like on the home page.</p>"
    }

    ratedList()
}




async function ratedList() {
    if (me.grades.length > 0) {
        me.grades.forEach(book => {
            let grades = book.book.review.map(x => x.grade)
            let grade = calcRate(grades)
            renderReadList(book.book, grade, "#gradedWrapper")
        })
    } 
}



export function renderReadList(obj, grade, elem, btn) {
    let { title, author, pages, releaseDate, coverImg } = obj
    
    let card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `
        <img src="http://localhost:1337${coverImg.url}" class="bookThumbnail" alt="bookcover">`
    
        let textDiv = document.createElement("div")
        textDiv.classList.add("text")
        textDiv.innerHTML = `<div>
            <h3>${title}</h3>
            <p class="author">by ${author}</p>
            <span class="grade">
                <i class="fa-solid fa-star ${1 <= grade ? "color" : ""}" value="1"></i>
                <i class="fa-solid fa-star ${2 <= grade ? "color" : ""}" value="2"></i>
                <i class="fa-solid fa-star ${3 <= grade ? "color" : ""}" value="3"></i>
                <i class="fa-solid fa-star ${4 <= grade ? "color" : ""}" value="4"></i>
                <i class="fa-solid fa-star ${5 <= grade ? "color" : ""}" value="5"></i>
            </span>
            <span class="color">${grade === null ? "" : grade} </span>
            <br><br>
            <p>Pages: ${pages}<br>
            Relese date: ${releaseDate}</p>
        </div>`
    


    card.append(textDiv)
    if (btn) { card.append(btn) }
    document.querySelector(elem).append(card)
}


function deleteFromReadingListBtn(func, obj) {
    let btn = document.createElement("button")
    btn.classList.add("btn", "addBtn")
    btn.innerHTML = `<i class="fa-solid fa-xmark fa-xl"></i>`

    btn.addEventListener("click", () => {
        func(obj.id)
    })

    return btn
}