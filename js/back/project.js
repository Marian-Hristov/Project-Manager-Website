// Global variables
let allProjects = getProjects();
let currentEditedProject;
/**
 * This functions adds a new project
 * @param {Object} projectObject The new project object to be added
 */
function addNewProject(projectObject) {
    // Validatoin of all the values of the project
    for (const key in projectObject) {
        if (!projectObject[key]) {
            throw new Error("One of the keys for the objects is null when adding a new project.");
        }
    }
    // Adding the project to array and storage
    allProjects.push(projectObject);
    localStorage.setItem(0, JSON.stringify(allProjects));
}
/**
 * Shows a specific page of the table in the table element. Doesn't show page if that page is empty
 * @param {number} pageNumber the page of the table to show
 */
function showTable(pageNumber) {
    // Getting the projects
    allProjects = getProjects();
    // Validating the page number
    if (!pageNumber || pageNumber < 1) {
        throw new Error("The page number cannot be undefined or less than 1");
    }
    // Variables for calculating which project from the array is to be shown
    const projectsPerPage = 8;
    const firstShown = (projectsPerPage * (pageNumber - 1));
    const toShow = allProjects.slice(firstShown, firstShown + projectsPerPage);
    // Updates the table
    addRowsToTable(projectsToRows(toShow));
    // Updates the info
    const totalPages = toShow.length != 0 ? Math.ceil(allProjects.length / projectsPerPage) : 1;
    const isDisabled = totalPages == 1;
    updateTableInfo(toShow.length, pageNumber, totalPages, isDisabled);
    // Adding the action menu events for each shown project
    actionMenuEvent();
    actionMenuOptionsEvent();
}
/**
 * This functoion shows the projects according to the query in the search bar
 * @param {number} pageNumber The number of the current page
 */
function showSearch(pageNumber) {
    // Getting the value of the search bar
    let toSearch = document.querySelector(".table-search-box input").value;
    // Getting the results of the query
    const searchResult = findAmongAttributes(toSearch);
    // Updating the status bar according to the number of results from query
    if (toSearch != "") {
        updateStatusBar(`Your query for "${toSearch}" gave ${searchResult.length} results`);
    } else {
        updateStatusBar("");
    }
    // Validating page number
    if (!pageNumber || pageNumber < 1) {
        throw new Error("The page number cannot be undefined or less than 1");
    }
    // Variables for calculating which project from the array is to be shown
    const projectsPerPage = 8;
    const firstShown = (projectsPerPage * (pageNumber - 1));
    const toShow = searchResult.slice(firstShown, firstShown + projectsPerPage);
    // Updates the table
    addRowsToTable(projectsToRows(toShow));
    // Updates the info
    const totalPages = toShow.length != 0 ? Math.ceil(searchResult.length / projectsPerPage) : 1;
    const isDisabled = totalPages == 1;
    updateTableInfo(toShow.length, pageNumber, totalPages, isDisabled);
    // Adding the action menu events for each shown project
    actionMenuEvent();
    actionMenuOptionsEvent();
}

/**
 * Gets the project from local storage
 * @returns the array of the projects in the local storage
 */
function getProjects() {
    // Reading from local storage
    const allProjects = JSON.parse(localStorage.getItem(0));
    // Updating status bar
    updateStatusBar(`Loaded ${allProjects.length} projects from Local Storage`);
    // Return the array
    if (allProjects) {
        return allProjects;
    }
    return [];
}


/**
 * Transforms a project object to a row
 * @param {Array} projectObject an array of object containing the information for each project
 * @returns returns an HTMLCollection of rows containing all the information of the objects and the the action button
 */
function projectsToRows(projectObject) {
    // Action menu html
    const action = `<td class="action-box"><button class="action-button"><svg class="icon" viewBox="0 0 16 16"><circle cx="8" cy="7.5" r="1.5"></circle><circle cx="1.5" cy="7.5" r="1.5"></circle><circle cx="14.5" cy="7.5" r="1.5"></circle></svg></button><div class="action-menu"><ul><li class="option"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit"class="svg-inline--fa fa-edit fa-w-18" role="img"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor"d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg><p>Edit</p></li><li class="option"><svg aria-hidden="true" focusable="false" data-prefix="fas"data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14"role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor"d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg><p>Delete</p></li></ul></div> </td>`
    // Validating that a project was sent
    if (!projectObject) {
        throw new Error("Project not initialized");
    }
    // Creating an empty array that holds the projects
    let allRows = [];

    // Creating rows with the values of the project
    for (let i = 0; i < projectObject.length; i++) {
        const row = document.createElement('tr');
        for (const key in projectObject[i]) {
            const td = document.createElement('td');
            // Limit the length of the text is the length of the value is bigger than 15
            const value = String(projectObject[i][key]).length <= 15 ? String(projectObject[i][key]) : String(projectObject[i][key]).slice(0, 15) + "...";
            td.innerText = value;
            row.appendChild(td);
        }
        row.innerHTML += action;
        allRows.push(row);
    }
    return allRows;
}
/**
 * Adds a row to the projects table
 * @param {HTMLTableRowElement[]} row the row to add to the table
 */
function addRowsToTable(rows) {
    const body = document.querySelector('tbody');
    body.innerHTML = "";
    for (let i = 0; i < rows.length; i++) {
        body.innerHTML += rows[i].innerHTML;
    }
}

/**
 * This function updates the table info container based on what is currently displayed on the table
 * @param {number} results the number representing the results shown on the page
 * @param {number} pageNumber the number representing the pageNumber
 * @param {number} totalPages the total number of pages to display
 * @param {boolean} disabled optional, represents in the input should be disabled
 */
function updateTableInfo(results, pageNumber, totalPages, disabled) {
    // Validating disabled
    if (disabled == undefined) {
        disabled = false;
    }
    // Updating the number of results
    const resultsElem = document.querySelector(".results-number span");
    resultsElem.textContent = `${results} results`;
    // Updating the page changer
    const pageInput = document.querySelector(".table-page-change-input input");
    const pageTotalDisplay = document.querySelector(".table-page-change-input span");
    // Updating the input used for changing pages according to the number of pages
    if (disabled) {
        pageInput.setAttribute("disabled", disabled);
    } else {
        pageInput.removeAttribute("disabled");
    }
    pageInput.setAttribute("max", totalPages);
    pageInput.value = pageNumber;
    pageTotalDisplay.textContent = "of " + totalPages;
}
/**
 * This function gets the values of the appropriate form and returns a project object containing the values
 * @param {string} type the type of the form to get values from
 * @return {Object} the project object formed by the values of the form
 */
function getFormToProject(type) {
    if (type == "add" || type == "action") {
        return {
            id: document.querySelector(`#project-id-${type}`).value,
            owner: document.querySelector(`#project-owner-${type}`).value,
            title: document.querySelector(`#project-title-${type}`).value,
            category: document.querySelector(`input[list="project-category-${type}"]`).value,
            status: document.querySelector(`input[list="project-status-${type}"]`).value,
            hours: document.querySelector(`#project-hours-${type}`).value,
            rate: document.querySelector(`#project-rate-${type}`).value,
            description: document.querySelector(`#project-description-${type}`).value
        }
    } else {
        throw new Error("Form type doesn't exist");
    }
}
/**
 * This function takes the value from a given project and sets them to the values of the inputs in the editing form
 * @param {Object} project
 */
function getProjectToForm(project) {
    const type = "action";
    document.querySelector(".pop-up.action .pop-up-title p").textContent = project.title;
    document.querySelector(`#project-id-${type}`).value = project.id;
    document.querySelector(`#project-owner-${type}`).value = project.owner;
    document.querySelector(`#project-title-${type}`).value = project.title;
    document.querySelector(`input[list="project-category-${type}"]`).value = project.category;
    document.querySelector(`input[list="project-status-${type}"]`).value = project.status;
    document.querySelector(`#project-hours-${type}`).value = project.hours;
    document.querySelector(`#project-rate-${type}`).value = project.rate;
    document.querySelector(`#project-description-${type}`).value = project.description;
}
/**
 * This function adds a new project to the global array
 */
function createNewProject() {
    addNewProject(getFormToProject("add"));
}
/**
 * This function sorts the project array and returns a sorted version
 * @return {Array} array of project objects sorted by their ID
 */
function sortByAttributeLowToHigh(attribute) {
    return allProjects.sort(function (a, b) {
        if (a[attribute] < b[attribute]) {
            return -1;
        }
        if (a[attribute] > b[attribute]) {
            return 1;
        }
        return 0;
    });
}
/**
 * This function searches if a string is contained inside any proprety of 
 * any project and returns the project(s) in which the string was found
 * @param {string} searchItem The string for which we want to search
 * @return {Array} Array containing the projects where the string was found in
 */
function findAmongAttributes(searchItem) {
    return allProjects.filter(project => {
        let hasKey = false;
        for (let k of Object.values(project)) {
            if (String(k).toLocaleLowerCase().includes(searchItem.toLocaleLowerCase())) {
                hasKey = true;
            }
        }
        return hasKey;
    });
}