import { changeApi, getData } from "./api.js"
import { modal } from "./modal.js"
import { renderMyPage } from "./mypage.js"
import { isLoggedIn } from "./storage.js"


export async function getUserInfo() {
    let me = await getData("http://localhost:1337/api/users/me?populate=deep")
    return me
}


// ------------------------------------------------ reading list ------------------------------------------------

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
        alert("du behöver vara medlem för att kunna lägga till bok")
        return false
    }
}


export async function removeBook(id) {
    let data = await getData("http://localhost:1337/api/users/me?populate=deep")

    let arr = data.books
    arr = arr.filter(x => x.id !== id)
    changeApi(arr, data.id)
    renderMyPage()
}
