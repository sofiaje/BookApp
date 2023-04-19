import { getData, updateGrade } from "./api.js"
import { changeNav } from "./nav.js"
import { removeBook } from "./cards.js"
import { getUserInfo } from "./cards.js"
import { calcRate } from "./starRating.js"
import { sortRatedList, ratedList } from "./sortBy.js"



export async function setUsername() {
    document.getElementById("userInfo").innerHTML = `logged in as ${sessionStorage.getItem("user") ? sessionStorage.getItem("user") : localStorage.getItem("user")}`
}



export async function renderMyPage() {
    let me = await getUserInfo()
    // console.log(me)
    setUsername()
    changeNav()
    
    contentWrapper.innerHTML = `
    <h2 class="p-1">Reading list</h2>
    <div id="readinglistWrapper" class="bookContainer"></div><br>
    <div class="flex-1">
    <h2 class="p-1">Rated books</h2>
    <select id="sortBy" class="p-1">
        <option value="false">Sort by</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="rating">Rating</option>
    </select>
    </div>
    <div id="gradedWrapper" class="bookContainer"></div>`
    
    if (me.books.length > 0) {
        me.books.forEach(book => {
            let btn = deleteFromReadingListBtn(removeBook, book)
            let grades = book.review.map(x => x.grade)
            let grade = calcRate(grades)

            renderReadList(book, grade, "#readinglistWrapper", btn)
        })
    } else {
        document.querySelector("#readinglistWrapper").innerHTML = "<p>No books on the reading list</p>"
    }

    (me.grades.length > 0) ? ratedList(me.grades) : document.querySelector("#gradedWrapper").innerHTML = "<p>No rated books yet</p>" 
    
    document.getElementById("sortBy").addEventListener("change", async (e) => {
        let me = await getUserInfo()

        document.querySelector("#gradedWrapper").innerHTML = ""
        let sorted = sortRatedList(me.grades, e.target.value)

        ratedList(sorted)
    })
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