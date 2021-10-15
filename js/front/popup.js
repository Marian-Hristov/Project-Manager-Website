'use strit';
/**
 * This function adds EventListeners for the close button
 */
function enablePopUpClose() {
    let types = ["action", "add"]
    types.forEach(type => {
        document.querySelector(`svg.${type}`).addEventListener("click", () => {
            closePopUp(type);
        });
    })
}
/**
 * This function closes the given popup
 * @param {string} type the type of the popup
 */
function closePopUp(type) {
    document.querySelector(`.pop-up.${type}`).style.display = "none";
    document.body.style.overflow = "auto";
}
/**
 * This function opens the given popup
 * @param {string} type the type of the popup
 */
function openPopUp(type) {
    document.querySelector(`.pop-up.${type}`).style.display = "flex";
    document.body.style.overflow = "hidden";
}