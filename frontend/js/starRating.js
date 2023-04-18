import { getUserInfo } from "./cards.js"
import { loadPage } from "./firstpage.js"
import { modal } from "./modal.js"



// ----------------------- rewiev book -----------------------

// add grade function to each star
export function setRatingStars(card, id) {
    let stars = card.querySelectorAll(".star")
    stars.forEach(star => {
        star.addEventListener("click", (e) => {
            createGrade(Number(e.target.getAttribute('value')), id)
        })
    })
}


// create new review
// lägg i api.js senare
export async function createGrade(grade, bookId) {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        let me = await getUserInfo()
        await axios.post(`http://localhost:1337/api/grades`, {
        data: {
            grade: grade,
            users: me.id,
            book: bookId
            }
    },
    {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
        }
            })
        
        // updateGrade(grade, id)
        loadPage()
        modal()
    } else {
        alert("du behöver vara medlem för att kunna betygsätta böcker")
    }
    
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
        
    return sum / arr.length
}


