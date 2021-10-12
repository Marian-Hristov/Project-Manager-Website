// (function () {
//     // searchEvent();
//     actionMenuEvent();
//     windowEvents();
//     popupEvents();
// })();
// above function was removed because this needs to executed in setup

// Table
function searchEvent() {
    const btn = document.getElementById('table-search-button');
    // The function handler is defined on the table.js file
    btn.addEventListener('click', showSearchBar)
}

function actionMenuEvent() {
    let buttons = document.getElementsByClassName('action-button');
    for (const element of buttons) {
        element.addEventListener('click', showActionMenu);
    }
}

function windowEvents() {
    window.addEventListener('scroll', showActionMenu);
    window.addEventListener('click', showActionMenu);
}

// Popup

function popupEvents() {

    enablePopUpClose();
    enableValidationEvents();
}

function enableValidationEvents() {
    let strings = ["project-id", "project-owner", "project-title", "project-description"];
    let numbers = ["project-hours", "project-rate"];
    let lists = ["project-category", "project-status"];
    strings.forEach(id => {
        document.querySelector(`#${id}`).addEventListener("input", () => {
            validateString(id, true, true);
        })
    })

    numbers.forEach(id => {
        document.querySelector(`#${id}`).addEventListener("input", () => {
            let min = document.querySelector(`#${id}`).min;
            let max = document.querySelector(`#${id}`).max;
            validateNumber(id, min, max, true, true);
        })
    })

    lists.forEach(id => {
        document.querySelector(`input[list="${id}"]`).addEventListener("input", () => {
            validateList(id, true, true);
        })
    })
}