function closePopUp() {
    document.querySelector(".pop-up").style.display = "none";
    document.querySelector(".main-container").style.overflow = "auto";
}

function openPopUp() {
    document.querySelector(".pop-up").style.display = "flex";
    document.querySelector(".main-container").style.overflow = "hidden";
}
