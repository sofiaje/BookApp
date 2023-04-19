import { changeApi, getData } from "./api.js"
import { modal, modalLogin } from "./modal.js"
import { renderMyPage } from "./mypage.js"
import { isLoggedIn } from "./storage.js"



export async function getUserInfo() {
    let me = await getData("http://localhost:1337/api/users/me?populate=deep")
    return me
}

// show username when logged in
export async function setUsername() {
    document.getElementById("userInfo").innerHTML = `logged in as ${sessionStorage.getItem("user") ? sessionStorage.getItem("user") : localStorage.getItem("user")}`
}




// ------------------------------------------------ reading list ------------------------------------------------

// add book to reading list
export async function addToList(id) {
    if (isLoggedIn()) {
        let data = await getData("http://localhost:1337/api/users/me?populate=deep")
        
        let arr = data.books
        arr = arr.map(x => x.id)

        arr.push(id)
        changeApi(arr, data.id)
        modal()
        
        return true
    } else {
        modalLogin()
        return false
    }
}

// remove book from reading list
export async function removeBook(id) {
    let data = await getData("http://localhost:1337/api/users/me?populate=deep")

    let arr = data.books
    arr = arr.filter(x => x.id !== id)
    changeApi(arr, data.id)
    renderMyPage()
}



// star-rating system for bookCards
export function cardText(title, author, grade, pages, releaseDate, rating) {
    return `<div>
    <h3>${title}</h3>
    <p class="author">by ${author}</p>
    <span class="grade">
        <div class="star ${rating ? "point" : ""}" value="1"><i class="fa-solid fa-star ${1 <= grade ? "color" : ""}"></i></div>
        <div class="star ${rating ? "point" : ""}" value="2"><i class="fa-solid fa-star ${2 <= grade ? "color" : ""}"></i></div>
        <div class="star ${rating ? "point" : ""}" value="3"><i class="fa-solid fa-star ${3 <= grade ? "color" : ""}"></i></div>
        <div class="star ${rating ? "point" : ""}" value="4"><i class="fa-solid fa-star ${4 <= grade ? "color" : ""}"></i></div>
        <div class="star ${rating ? "point" : ""}" value="5"><i class="fa-solid fa-star ${5 <= grade ? "color" : ""}"></i></div>
    </span>
    <span class="color">${grade === null ? "" : grade} </span>
    <br><br>
    <p>Pages: ${pages}<br>
    Relese date: ${releaseDate}</p>
    </div>`
} 