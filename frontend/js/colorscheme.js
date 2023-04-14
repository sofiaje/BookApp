// http://localhost:1337/api/colorscheme


export async function getColorScheme() {
    let res = await axios.get("http://localhost:1337/api/colorscheme")
    console.log(res.data.data.attributes.color)

    if (res.data.data.attributes.color === "light") {
        console.log("there is light")
    } else {
        document.body.classList.add("dark")
    }
}

