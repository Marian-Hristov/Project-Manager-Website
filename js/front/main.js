'use strit';
// EventListener for when the page's content is laoded
window.addEventListener("DOMContentLoaded", setup);
/**
 * This function calls all the necessary functions when the page loads up
 */
function setup() {
    changePageEvent();
    windowEvents();
    popupEvents();
    createProjectEvent();
    showTable(1);
    actionMenuEvent();
    searchEvent();
    confirmEditEvent();
    clearStorageEvent();
}