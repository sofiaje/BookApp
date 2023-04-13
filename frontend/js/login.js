// function to log out user
export function logout() {
    sessionStorage.clear()
    localStorage.clear()
    location.reload()
}

// login function
export async function login(user, passw) {
    try {
        let res = await axios.post("http://localhost:1337/api/auth/local", {
            identifier: user.value,
            password: passw.value
        })

        inputName.value = ""
        passw.value = ""
        console.log("det gick bra va! ")
        return res.data

    } catch (error) {
        console.log(error)
        errorText.innerText = `${error.response.data?.error.message}`
        console.log("det gick dåligt va! ")
        return false
    }
}
