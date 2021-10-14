function writeLocal() {
    localStorage.setItem(0, JSON.stringify(allProjects));
}

/**
 * clears the storage
 */
 function clearStorage() {
    localStorage.clear();
}