function enablePopUpClose() {
    let types = ["action", "add"]
    types.forEach(type => {
        document.querySelector(`svg.${type}`).addEventListener("click", function () {
            closePopUp(type);
        });
    })
}

function closePopUp(type) {
    console.log(type);
    console.log(`.pop-up.${type}`);
    document.querySelector(`.pop-up.${type}`).style.display = "none";
    document.querySelector(".main-container").style.overflow = "auto";
}

function openPopUp(type) {
    document.querySelector(`.pop-up.${type}`).style.display = "flex";
    document.querySelector(".main-container").style.overflow = "hidden";
}