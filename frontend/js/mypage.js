import { changeNav } from "./nav.js"
import { removeBook, getUserInfo, cardText, setUsername } from "./cards.js"
import { calcRate } from "./starRating.js"
import { sortRatedList, ratedList } from "./sortBy.js"



// render my page
export async function renderMyPage() {
    let me = await getUserInfo()
    setUsername()
    changeNav()
    
    contentWrapper.innerHTML = `
    <h2 class="p-1">Reading list</h2>
    <div id="readinglistWrapper" class="bookContainer"></div><br>
    <div class="flex">
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
            let btn = deleteFromReadingListBtn(book)
            let grades = book.review.map(x => x.grade)
            let grade = calcRate(grades)

            bookCardMyPage(book, grade, "#readinglistWrapper", btn)
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


// create card for each book
export function bookCardMyPage(obj, grade, elem, btn) {
    let { title, author, pages, releaseDate, coverImg } = obj
    
    let card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `
        <img src="http://localhost:1337${coverImg.url}" class="bookThumbnail" alt="bookcover">`
    
        let textDiv = document.createElement("div")
        textDiv.classList.add("text")
        textDiv.innerHTML = cardText(title, author, grade, pages, releaseDate, false)
    

    card.append(textDiv)
    if (btn) { card.append(btn) }
    document.querySelector(elem).append(card)
}



// creates button to delete book from reading list
function deleteFromReadingListBtn(obj) {
    let btn = document.createElement("button")
    btn.classList.add("btn", "addBtn")
    btn.innerHTML = `<i class="fa-solid fa-xmark fa-xl"></i>`

    btn.addEventListener("click", () => {removeBook(obj.id)})

    return btn
}