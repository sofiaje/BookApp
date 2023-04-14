import { changeApi } from "./api.js"
import { modal } from "./modal.js"
import { renderMyPage } from "./mypage.js"



// ------------------------------------------------ reading list ------------------------------------------------

export async function addToList(id) {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {

        let res = await axios.get("http://localhost:1337/api/users/me?populate=deep", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
            }
        })
        
        let arr = res.data.books
        arr = arr.map(x => x.id)

        arr.push(id)
        changeApi(arr, res.data.id)
        modal()
        
        return true
    } else {
        alert("du behöver vara medlem för att kunna lägga till bok")
        return false
    }
}


export async function removeBook(id) {
    let res = await axios.get("http://localhost:1337/api/users/me?populate=deep", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
            }
    })
    let arr = res.data.books
    arr = arr.filter(x => x.id !== id)
    changeApi(arr, res.data.id)
    renderMyPage()
}




// ------------------------------------------------ grading system------------------------------------------------

export function updateGrade(id, grade) {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        console.log(`uppdatera bok nr ${id}, betyg ${grade}`)
        
    } else {
        alert("du behöver vara medlem för att kunna betygsätta böcker")
    }
}