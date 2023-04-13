export async function addAPI(id, user) {
    // console.log("change in api")

    let res = await axios.put(`http://localhost:1337/api/users/${user}`, {
        books: id 
    },
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
            }
    })
}


export async function getData(url) {

    let res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
        }
    })
    return res.data
}