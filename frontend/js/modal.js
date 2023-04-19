import { loginpage } from "./login.js"

let checkModal = document.querySelector("#checkModal")
let loginModal = document.querySelector("#loginModal")
let overlay = document.querySelector(".overlay")

overlay.addEventListener("click", () => {
    overlay.classList.add("hidden")
    loginModal.classList.add("hidden")
})

document.querySelector("#loginModalBtn").addEventListener("click", () => {
    loginModal.classList.add("hidden")
    overlay.classList.add("hidden")
    loginpage()
})

document.querySelector("#closeModal").addEventListener("click", () => {
    loginModal.classList.add("hidden")
    overlay.classList.add("hidden")
})

export async function modal() {
    checkModal.classList.remove("hidden")
    setTimeout(() => {
        checkModal.classList.add("hidden")
    }, 500)
}

export async function modalLogin() {
    overlay.classList.toggle("hidden")
    loginModal.classList.toggle("hidden")
}