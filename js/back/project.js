let allProjects = [];
/**
 * adds a new project to local storage
 * @param {string} id the id of the project
 * @param {string} owner the owner of the project
 * @param {string} title the title of the project
 * @param {string} category the cateogry of the project
 * @param {string} status the status of the project
 * @param {number} hours the number of hours that the project should take
 * @param {number} rate rate of the project
 * @param {string} description the description of the project
 */
function addNewProject(id, owner, title, category, status, hours, rate, description){
    if(!id || !owner || !title || !category || !status || !hours || !rate || !description){
        throw new Error("One of the keys for the objects is null when adding a new project.");
    }
    const newProject = {
        id: id,
        owner: owner,
        title: title,
        category: category,
        status: status,
        hours: hours,
        rate: rate,
        description: description
    }
    allProjects.push(newProject);
    clearStorage();
    localStorage.setItem(0, JSON.stringify(allProjects));
}
// ! FOR TESTING ONLY DELETE AFTER
(function(){
    addNewProject('1', 'm3', 'my title', 'this one', 'completed', 12, 'keep it 100', 'descriptive');
    console.log(getProjects());
    addRowToTable(projectToRow(getProjects()[0]))
}());

/**
 * gets the project from local storage
 * @returns the array of the projects in the local storage
 */
function getProjects(){
    return JSON.parse(localStorage.getItem(0));
}

/**
 * clears the storage
 */
function clearStorage(){
    localStorage.clear();
}

/**
 * transforms a project object to a row
 * @param {object} projectObject the object containing all the project information
 * @returns returns a row containing all the information of the object and the the action button
 */
function projectToRow(projectObject){
    const action = `<td class="action-box"><button class="action-button"><svg class="icon" viewBox="0 0 16 16"><circle cx="8" cy="7.5" r="1.5"></circle><circle cx="1.5" cy="7.5" r="1.5"></circle><circle cx="14.5" cy="7.5" r="1.5"></circle></svg></button><div class="action-menu"><ul><li class="option"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="edit"class="svg-inline--fa fa-edit fa-w-18" role="img"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor"d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg><p>Edit</p></li><li class="option"><svg aria-hidden="true" focusable="false" data-prefix="fas"data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14"role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor"d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg><p>Delete</p></li></ul></div> </td>`
    if(!projectObject){
        throw new Error("bro why is there project not initialized?");
    }
    const row = document.createElement('tr');
    for(const key in projectObject){
        const td = document.createElement('td');
        td.innerText = projectObject[key];
        row.appendChild(td);
    }
    row.innerHTML += action;
    return row;
}
/**
 * Adds a row to the projects table
 * @param {HTMLTableRowElement} row the row to add to the table
 */
function addRowToTable(row){
    const body = document.querySelector('tbody');
    body.innerHTML += row.innerHTML;
}


// ! Verify type of the param of JSDocs
/**
 * This function updates the table info container based on what is currently displayed on the table
 * @param {array} projects
 * @param {number} pageNumber
 */
function updateTableInfo(projects, pageNumber){
    // Updating the number of results
    let resultsElem = document.querySelector(".results-number span");
    resultsElem.textContent = `${projects.length} results`;
    // Updating the page changer
    let pageInput = document.querySelector(".table-page-change-input input");
    let pageTotalDisplay = document.querySelector(".table-page-change-input span");
    if((projects.length / 10) <= 1){
        pageInput.value = 1;
        pageInput.setAttribute("disabled", "true");
        pageTotalDisplay.textContent = "of 1";
    } else {
        pageInput.value = pageNumber;
        pageInput.removeAttribute("disabled");
        pageTotalDisplay.textContent = `of ${Math.ceil(projects.length/10)}`
        // TODO: find a rule that from the page number selects each block of 10 projects in the array
        for(let i = 10*pageNumber - 10; i < 10*pageNumber; i++){
            console.log(i);
            addRowToTable(projects[i]);
        }
    }
}