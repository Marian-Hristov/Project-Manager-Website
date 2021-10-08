function enablePopUpClose(){
    document.querySelector(".pop-up-close svg").addEventListener("click", closePopUp);
}

function closePopUp(){
    document.querySelector(".pop-up").style.display = "none";
}

function openPopUp(){
    document.querySelector(".pop-up").style.display = "flex";
}