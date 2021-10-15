'use strit';

function enablePopUpClose() {
    let types = ["action", "add"]
    types.forEach(type => {
        document.querySelector(`svg.${type}`).addEventListener("click", () => {
            closePopUp(type);
        });
    })
}

function closePopUp(type) {
    document.querySelector(`.pop-up.${type}`).style.display = "none";
    document.body.style.overflow = "auto";
}

function openPopUp(type) {
    document.querySelector(`.pop-up.${type}`).style.display = "flex";
    document.body.style.overflow = "hidden";
}