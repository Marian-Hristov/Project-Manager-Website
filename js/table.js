function showSearchBar(){
    console.log('this searchbar is shown')
}

function showActionMenu(event){

    if(event.type=="click" && eventPathHasClass(event.path, "action-button")){
        if(this.classList != undefined){
            this.classList.toggle('active');
            return;
        }else{
            return;
        }
    } else if(event.type == "scroll"){
        removeClass('active');
        return;
    }
    removeClass('active');
    
}

function removeClass(className){
    const hasElement = document.getElementsByClassName(className);
    for(const element of hasElement){
        element.classList.remove(className);
    }
}

function eventPathContains(event, string){
    for(const key of event.path){
        if((key+'').includes(string)){
            return true;
        }
    }
    return false;
}

function eventPathHasClass(path, className){
    let hasClass = false;
    for(const key of path){
        if((key.classList+'').includes(className)){
            return true;
        }
    }
    return false;
}