function enablePopUpClose() {
    let types = ["action", "add"]
    types.forEach(type => {
        document.querySelector(`.pop-up.${type} .pop-up-close svg`).addEventListener("click", () => {
            closePopUp(type);
        });
    })
}

function closePopUp(type) {
    document.querySelector(`.pop-up.${type}`).style.display = "none";
    document.querySelector(".main-container").style.overflow = "auto";
}

function openPopUp(type) {
    document.querySelector(`.pop-up.${type}`).style.display = "flex";
    document.querySelector(".main-container").style.overflow = "hidden";
}