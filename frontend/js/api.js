// fetch data from api 

//get info, public
export async function getInfo(url) {
    let res = await axios.get(`${url}`)
    return res.data
}


// fetch auth data from api
export async function getData(url) {

    let res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
        }
    })
    return res.data
}


// create relations between user and book, api
export async function changeApi(id, user) {
    let res = await axios.put(`http://localhost:1337/api/users/${user}?populate=*`, {
        books: id 
    },
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
            }
        })
}



// function to register as new user, api
export async function registerUserApi(user, email, passw) {
    try {
        let res = await axios.post("http://localhost:1337/api/auth/local/register", {
            username: user,
            email: email,
            password: passw
        })
        return res.data
    } catch (error) {
        console.log(error)
        errorText.innerText = `${error.response.data?.error.message}`
    }
}


// function user log in, api
export async function loginApi(user, passw) {
    try {
        let res = await axios.post("http://localhost:1337/api/auth/local", {
            identifier: user.value,
            password: passw.value
        })

        return res.data
    } catch (error) {
        console.log(error)
        errorText.innerText = `${error.response.data?.error.message}`
        // return false
    }
}
