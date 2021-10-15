/**
 * This function starts editing the current project
 * @param {number} index the index of the edited project
 */
function startEditingProject(index) {
    // Set the current project to the index of the clicked project
    currentEditedProject = index;
    // Opening edit popup
    openPopUp("action");
    // Getting the project and putting in the values on the form
    let project = allProjects[currentEditedProject];
    getProjectToForm(project);
}

/**
 * This function stops the editing of the current project
 * and sends the information to the storage and updates the table
 * @param {number} currentPage The current page of the table
 */
function stopEditingProject(currentPage) {
    // Getting the values in form a project object
    let newProject = getFormToProject("action");
    // Adding the new project at the place of the old project
    allProjects[currentEditedProject] = newProject;
    // Overwriting local storage
    writeLocal();
    // Resetting the current edited project index
    currentEditedProject = undefined;
    // Closing the edit popup
    closePopUp("action");
    // Showing the new updated table
    showTable(currentPage);
}
/**
 * This function deletes a project and updates the table accordingly
 * @param {*} index The index of the project that has be deleted
 * @param {*} currentPage The current page of the table
 */
function deleteProject(index, currentPage) {
    // const projects = getProjects();
    const maxPageCount = Number(document.querySelector(".table-page-change-input span").textContent.slice(3));
    if (allProjects.length > 0 && confirm(`Are you sure you want to delete projet "${allProjects[index].title}" ?`)) {
        allProjects.splice(index, 1);
    }
    // Change the page if the project is the last of its page
    if ((allProjects.length % 8) == 0) {
        currentPage -= 1;
    }
    // Minimum page is 1
    if (currentPage == 0) {
        currentPage = 1;
    }
    // Updating the storage and the table
    writeLocal(allProjects);
    showTable(currentPage);
}