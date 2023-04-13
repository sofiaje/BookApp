import { getData } from "./api.js"
import { changeNav } from "./nav.js"
import { removeBook } from "./cards.js"


export async function setUsername() {
    document.getElementById("userInfo").innerHTML = `logged in as ${sessionStorage.getItem("user") ? sessionStorage.getItem("user") : localStorage.getItem("user")}`
}



export async function renderMyPage() {
    let me = await getData("http://localhost:1337/api/users/me?populate=deep")

    setUsername()
    changeNav()
    
    contentWrapper.innerHTML = `
    <h2 class="p-1">Reading list</h2>
    <div class="bookContainer"></div><br>
    <h2 class="p-1">Rated books</h2>
    <div id="gradedWrapper"></div>`
    
    
    me.books?.forEach(book => {
        renderReadList(book)
    })
}




export function renderReadList(obj) {
    let { title, author, grade, pages, releaseDate, coverImg } = obj
    
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
                <i class="fa-solid fa-star ${1 <= grade ? "color" : ""}"></i>
                <i class="fa-solid fa-star ${2 <= grade ? "color" : ""}"></i>
                <i class="fa-solid fa-star ${3 <= grade ? "color" : ""}"></i>
                <i class="fa-solid fa-star ${4 <= grade ? "color" : ""}"></i>
                <i class="fa-solid fa-star ${5 <= grade ? "color" : ""}"></i>
            </span>
            ${grade === null ? "" : grade} 
            <br><br>
            <p>Pages: ${pages}<br>
            Relese date: ${releaseDate}</p>
        </div>`
    
    let btn = document.createElement("button")
    btn.classList.add("btn", "addBtn")
    btn.innerHTML = `<i class="fa-solid fa-xmark fa-xl"></i>`

    btn.addEventListener("click", () => {
        console.log(`ta bort bok nr ${obj.id}`)
        removeBook(obj.id)
    })

    card.append(textDiv, btn)
    document.querySelector(".bookContainer").append(card)
}

