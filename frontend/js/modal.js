import { loginpage } from "./login.js"


// variables 
let checkModal = document.querySelector("#checkModal")
let loginModal = document.querySelector("#loginModal")
let overlay = document.querySelector(".overlay")



// check-modal, open and closes
export async function modal() {
    checkModal.classList.remove("hidden")
    setTimeout(() => {
        checkModal.classList.add("hidden")
    }, 500)
}

// please-log-in-modal, opens
export async function modalLogin() {
    overlay.classList.toggle("hidden")
    loginModal.classList.toggle("hidden")
}



// ------------ user interactions with modal ---------------------------

// closes modal and removes overlay when clicked on
overlay.addEventListener("click", () => {
    overlay.classList.add("hidden")
    loginModal.classList.add("hidden")
})

// login button, directs user to login / register page on click
document.querySelector("#loginModalBtn").addEventListener("click", () => {
    loginModal.classList.add("hidden")
    overlay.classList.add("hidden")
    loginpage()
})

// close modal button 
document.querySelector("#closeModal").addEventListener("click", () => {
    loginModal.classList.add("hidden")
    overlay.classList.add("hidden")
})
