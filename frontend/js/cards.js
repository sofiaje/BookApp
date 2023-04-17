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




// ------------------------------------------------ grading system------------------------------------------------

export function updateGrade(id, grade) {
    if (sessionStorage.getItem("jwt") || localStorage.getItem("jwt")) {
        console.log(`uppdatera bok nr ${id}, betyg ${grade}`)
        
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


// ------------------------------------------------ static test ------------------------------------------------


document.querySelector(".gradeBtn").addEventListener("click", (e) => {
    console.log(e.target.value);

    createGrade(e.target.value, 1, 3)
})

export async function createGrade(grade, userId, bookId) {
    let res = await axios.post(`http://localhost:1337/api/grades`, {
        data: {
            grade: grade,
            users: userId,
            book: bookId
        }
    },
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
            }
        })
    console.log(res)
}


async function getColorScheme() {
    let res = await axios.get("http://localhost:1337/api/colorscheme")
    console.log(res.data.data.attributes.color)
}
