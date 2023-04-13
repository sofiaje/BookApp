import { addAPI } from "./api.js"


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
            <i class="fa-solid fa-star ${5 <= grade ? "color" : ""}"></i></span>
            ${grade === null ? "no grades" : grade} 
    
            <p>Pages: ${pages}<br>
            Relese date: ${releaseDate}</p>
        </div>`
    
    let btn = document.createElement("button")
    btn.classList.add("btn", "addBtn")
    btn.innerText = "Remove from list"
    textDiv.append(btn)

    card.append(textDiv)

    btn.addEventListener("click", () => {
        console.log(`ta bort bok nr ${obj.id}`)
    })
    document.querySelector(".bookContainer").append(card)
}




export async function addToList(id) {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        console.log("lägg till bok nr " + id + " på läslistan")

        let res = await axios.get("http://localhost:1337/api/users/me?populate=deep", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
            }
        })
        console.log(res.data.id)
        let arr = res.data.books
        arr = arr.map(x => x.id)

        arr.push(id)
        addAPI(arr, res.data.id)
        
        return true
    } else {
        alert("du behöver vara medlem för att kunna lägga till bok")
        return false
    }
}



export function updateGrade(id, grade) {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        console.log(`uppdatera bok nr ${id}, betyg ${grade}`)
        
    } else {
        alert("du behöver vara medlem för att kunna betygsätta böcker")
    }
}