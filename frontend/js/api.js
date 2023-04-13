export async function addAPI(id, user) {
    let res = await axios.put(`http://localhost:1337/api/users/${user}`, {
        books: id 
    },
        {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
            }
    })
}
