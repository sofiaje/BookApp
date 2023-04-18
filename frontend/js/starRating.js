import { getUserInfo } from "./cards.js"
import { loadPage } from "./firstpage.js"
import { modal } from "./modal.js"



export function setRatingStars(card, obj) {
    let stars = card.querySelectorAll(".star")
    stars.forEach(star => {
        star.addEventListener("click", (e) => {
            createGrade(Number(e.target.getAttribute('value')), obj)
        })
    })
}




// lägg i api.js senare
export async function createGrade(grade, bookId) {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        let me = await getUserInfo()
        let res = await axios.post(`http://localhost:1337/api/grades`, {
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
        loadPage()
        modal()
    } else {
        alert("du behöver vara medlem för att kunna betygsätta böcker")
    }
}


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




// ---------------------------------- ta bort ----------------------------------


//används ej än
// export function updateGrade(id, grade) {
//     if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
//         console.log(`uppdatera bok nr ${id}, betyg ${grade}`)
        
//     } else {
//         alert("du behöver vara medlem för att kunna betygsätta böcker")
//     }
// }



// test knapp
// document.querySelector(".gradeBtn").addEventListener("click", (e) => {
//     console.log(e.target.value);

//     createGrade(e.target.value, 1, 3)
// })






