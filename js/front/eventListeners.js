let isSearching = false;
/**
 * This functions adds an EventListener for the search input of the table
 */
function searchEvent() {
    document.querySelector(".table-search-box input").addEventListener("input", function(){
        const currentPage = Number(document.getElementById("table-page-number").value);
        const toSearch = document.querySelector(".table-search-box input").value.length;
        if(toSearch == 0){
            isSearching = false;
        } else {
            isSearching = true;
        }
        showSearch(currentPage);
    })
}

/**
 * This function adds EventListeners for the action menu of each project
 */
function actionMenuEvent() {
    let buttons = document.getElementsByClassName('action-button');
    for (const element of buttons) {
        element.addEventListener('click', showActionMenu);
    }
}

/**
 * This function adds Eventlisteners for the window
 */
function windowEvents() {
    window.addEventListener('scroll', showActionMenu);
    window.addEventListener('click', showActionMenu);
}

// Popup
/**
 * This function adds EventListeners for the elements of the popups and the button to add a project
 */
function popupEvents() {
    document.querySelector(".table-new-project svg").addEventListener("click", () => {
        openPopUp("add");
    });
    enableValidationEvents();
    enablePopUpClose();
}
/**
 * This function adds EventListeners for each input of both types of popups
 */
function enableValidationEvents() {
    // Purposes of inputs
    let strings = ["project-id", "project-owner", "project-title", "project-description"];
    let numbers = ["project-hours", "project-rate"];
    let lists = ["project-category", "project-status"];
    // Types of popups
    let types = ["action", "add"];

    // looping through types
    types.forEach(type => {
        // Adding EventListener for each input of type text
        strings.forEach(id => {
            document.querySelector(`#${id}-${type}`).addEventListener("input", () => {
                validateString(id, type, true, true);
            })
        })
        // Adding Eventlistener for each input of type number
        numbers.forEach(id => {
            document.querySelector(`#${id}-${type}`).addEventListener("input", () => {
                let min = document.querySelector(`#${id}-${type}`).min;
                let max = document.querySelector(`#${id}-${type}`).max;
                validateNumber(id, type, min, max, true, true);
            })
        })
        // Adding Eventlistener for each input with a datalist
        lists.forEach(id => {
            document.querySelector(`input[list="${id}-${type}"]`).addEventListener("input", () => {
                validateList(id, type, true, true);
            })
        })
    })
}

/**
 * Creates the event listener for adding a new project
 */
function createProjectEvent() {
    document.getElementById("action-add").addEventListener("click", function () {
        createNewProject();
        showTable(1);
        closePopUp("add");
    });
}

function changePageEvent() {
    document.getElementById("previous-page").addEventListener("click", () => {
        const currentPage = Number(document.getElementById("table-page-number").value);
        if (currentPage > 1) {
            if(isSearching){
                showSearch(currentPage - 1)
            } else {
                showTable(currentPage - 1); 
            }
        }
    });
    document.getElementById("next-page").addEventListener("click", () => {
        const currentPage = Number(document.getElementById("table-page-number").value);
        const maxPageCount = Number(document.querySelector(".table-page-change-input span").textContent.slice(3));
        if (currentPage < maxPageCount) {
            if(isSearching){
                showSearch(currentPage + 1)
            } else {
                showTable(currentPage + 1); 
            }
        }
    });
    document.querySelector(".table-page-change-input input").addEventListener("change", function () {
        const currentPage = Number(document.getElementById("table-page-number").value);
        const maxPageCount = Number(document.querySelector(".table-page-change-input span").textContent.slice(3));
        if (currentPage >= 1 && currentPage <= maxPageCount) {
            if(isSearching){
                showSearch(currentPage)
            } else {
                showTable(currentPage); 
            }
        }
    })
}

function actionMenuOptionsEvent() {
    const currentPage = Number(document.getElementById("table-page-number").value);
    const rows = document.querySelectorAll(".table-container tbody tr");
    rows.forEach(row => {
        let options = row.querySelectorAll(".option");
        let index = ((currentPage - 1) * 8) + row.rowIndex - 1;
        options[0].addEventListener("click", function () {
            startEditingProject(index);
        })
        options[1].addEventListener("click", function () {
            deleteProject(index, currentPage);
        })
    })
}

function confirmEditEvent(){
    const currentPage = Number(document.getElementById("table-page-number").value);
    document.querySelector("#action-action").addEventListener("click", function(){
        stopEditingProject(currentPage);
    })
}