export async function getData(url) {
    let res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : localStorage.getItem("jwt")}`
        }
    })
    return res.data
}

export function changeNav() {
    mypageBtn.classList.remove("hidden")
    loginBtn.classList.add("hidden")
    logoutBtn.classList.remove("hidden")
}