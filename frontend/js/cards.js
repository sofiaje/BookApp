import { changeApi, getData } from "./api.js"
import { modal } from "./modal.js"
import { renderMyPage } from "./mypage.js"


export async function getUserInfo() {
    let me = await getData("http://localhost:1337/api/users/me?populate=deep")
    return me
}


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





// ------------------------------------------------ static test ------------------------------------------------

async function getColorScheme() {
    let res = await axios.get("http://localhost:1337/api/colorscheme")
}
