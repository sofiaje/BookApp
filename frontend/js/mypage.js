import { renderReadList } from "./cards.js"
import { getData } from "./api.js"
import { changeNav } from "./nav.js"



export async function setUsername() {
    document.getElementById("userInfo").innerHTML = `logged in as ${sessionStorage.getItem("user") ? sessionStorage.getItem("user") : localStorage.getItem("user")}`
}



export async function renderMyPage() {
    // let me = await setUsername()
    let me = await getData("http://localhost:1337/api/users/me?populate=deep")


    setUsername()
    changeNav()
    
    contentWrapper.innerHTML = `<h2>Profile page</h2>
    <h3>Reading list</h3>
    <div class="bookContainer"></div><br>
    <h3>Rated books</h3>
    <div id="gradedWrapper"></div>`
    
    
    me.books?.forEach(book => {
        renderReadList(book)
    })
}
