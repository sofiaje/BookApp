let modalDiv = document.querySelector(".modal")

export async function modal() {
    modalDiv.classList.remove("hidden")
    setTimeout(() => {
        modalDiv.classList.add("hidden")
    }, 500)
}