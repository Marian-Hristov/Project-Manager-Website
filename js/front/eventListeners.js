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
    document.querySelector(".table-new-project svg").addEventListener("click", () => {
        openPopUp("add");
    });
    enableValidationEvents();
    enablePopUpClose();
}

function enableValidationEvents() {
    let strings = ["project-id", "project-owner", "project-title", "project-description"];
    let numbers = ["project-hours", "project-rate"];
    let lists = ["project-category", "project-status"];
    let types = ["action", "add"];

    types.forEach(type => {
        strings.forEach(id => {
            document.querySelector(`#${id}-${type}`).addEventListener("input", () => {
                validateString(id, type, true, true);
            })
        })

        numbers.forEach(id => {
            document.querySelector(`#${id}-${type}`).addEventListener("input", () => {
                let min = document.querySelector(`#${id}-${type}`).min;
                let max = document.querySelector(`#${id}-${type}`).max;
                validateNumber(id, type, min, max, true, true);
            })
        })

        lists.forEach(id => {
            document.querySelector(`input[list="${id}-${type}"]`).addEventListener("input", () => {
                validateList(id, type, true, true);
            })
        })
    })
}