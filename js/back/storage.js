'use strit';
/**
 * This function adds the current projects array to the local storage
 */
function writeLocal() {
    updateStatusBar(`Saving ${allProjects.length} to Local Storage`);
    localStorage.setItem(0, JSON.stringify(allProjects));
}

/**
 * Clears the storage
 */
function clearStorage() {
    updateStatusBar(`Local Storage has been cleared`);
    localStorage.clear();
}