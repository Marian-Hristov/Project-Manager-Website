'use strit';

function showActionMenu(event) {
    if (event.type == "click" && eventPathHasClass(event.composedPath(), "action-button")) {
        if (this.classList != undefined) {
            removeClass('active', this);
            this.classList.toggle('active');
            return;
        }
    } else if (event.type == "scroll") {
        removeClass('active');
        return;
    } else if (event.type == "click" && !eventPathHasClass(event.composedPath(), "action-button")) {
        removeClass('active');
    }
}
/**
 * removes a class from all html elements
 * @param {string} className The name of the class that is going to be rmemoved
 * @param {HTMLElement} elementException an optional element that is going to be skipped when removing the classes
 */
function removeClass(className, elementException) {

    const hasElement = document.getElementsByClassName(className);
    for (const element of hasElement) {
        if (elementException != element) {
            element.classList.remove(className);
        }
    }
}

/**
 * Checks if an element in the array has the class classname
 * @param {EventTarget[]} path The path of the element clicked
 * @param {string} className a string containing the name of the class to be found
 * @returns if the className is contained in the path
 */
function eventPathHasClass(path, className) {
    let hasClass = false;
    for (const key of path) {
        if ((key.classList + '').includes(className)) {
            return true;
        }
    }
    return false;
}

//TODO: dynamically position the action menu when the user clicks, we shoulnd't have 36 of them.
function updateStatusBar(msg) {
    document.querySelector(".table-status-bar p").textContent = msg;
}