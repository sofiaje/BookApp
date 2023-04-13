import { loginpage, logout } from "./login.js"
import { renderMyPage } from "./mypage.js"
import { loadPage } from "./firstpage.js"



// variables
let contentWrapper = document.getElementById("contentWrapper")



// ------------------------------ nav  ---------------------------------------

// home
document.getElementById("homeBtn").addEventListener("click", loadPage)

// sign in / register
document.getElementById("loginBtn").addEventListener("click", loginpage)

// log out
document.getElementById("logoutBtn").addEventListener("click", logout)

// my page
document.getElementById("mypageBtn").addEventListener("click", renderMyPage)




// calls page load on.. page load
loadPage()


