(function(){
    searchEvent();
    actionMenuEvent();
    windowEvents();
})();

function searchEvent(){
    const btn = document.getElementById('table-search-button');
    // The function handler is defined on the table.js file
    btn.addEventListener('click', showSearchBar)
}

function actionMenuEvent(){
    let buttons = document.getElementsByClassName('action-button');
    for(const element of buttons){
        element.addEventListener('click', showActionMenu);
    }
}

function windowEvents(){
    window.addEventListener('scroll', showActionMenu);
    window.addEventListener('click', showActionMenu);
}