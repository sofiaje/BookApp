import { loadPage } from "./firstpage.js"
import { modal, modalLogin } from "./modal.js"
import { addGradeAPI } from "./api.js"



// ----------------------- rewiev book -----------------------

// add grade function to each star
export function setRatingStars(card, id) {
    let stars = card.querySelectorAll(".star")
    stars.forEach(star => {
        star.addEventListener("click", async (e) => {
            if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
                let worked = await addGradeAPI(Number(e.target.getAttribute('value')), id)
                if (worked) {
                    loadPage()
                    modal()
                }
            } else {
                modalLogin()
            }
        })
    })
}



// calculate average grade
export function calcRate(arr) {
    if (arr.length < 1) { return "" }

    //reduce
    const initialValue = 0;
    const sum = arr.reduce(
        (accumulator, currentValue) => accumulator + Number(currentValue),
        initialValue
    );
        
    return Number(sum / arr.length).toFixed(1)
}


