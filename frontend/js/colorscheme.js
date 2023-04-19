import { getInfo } from "./api.js"


// get info on color scheme
export async function getColorScheme() {
    let data = await getInfo("http://localhost:1337/api/colorscheme")

    if (data.data.attributes.color === "dark") {
        document.body.classList.add("dark")
    } 
}

