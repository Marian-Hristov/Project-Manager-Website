function writeLocal() {
    updateStatusBar(`Saving ${allProjects.length} to Local Storage`);
    localStorage.setItem(0, JSON.stringify(allProjects));
}

/**
 * clears the storage
 */
function clearStorage() {
    updateStatusBar(`Local Storage has been cleared`);
    localStorage.clear();
}