function validateString(id){
    let value = document.querySelector(`#${id}`).value;
    // Checking if the string is a string or if it is empty
    if(value != "" || typeof id != 'string') return true;
    return false;
}

// TODO Define a default value of undefined for max
function validateNumber(id, min, max){
    let value = document.querySelector(`#${id}`).value;
    if(typeof min == "number" && typeof max == "undefined" && value > min) return true;
    if (typeof min == "number" && typeof max == "number" && value > min && value < max) return true;
    return false;
}

function validateList(id){
    let value = document.querySelector(`#${id}`).value;
    if(value == "") return false;
    return true;
}

function validateAll(){
    let flag = {
        "project-id": false,
        "project-owner": false,
        "project-title": false,
        "project-description": false,
        "project-hours": false,
        "project-rate": false,
        "project-category": false,
        "project-status": false
    }
    let strings = ["project-id", "project-owner", "project-title", "project-description"];
    let numbers = ["project-hours", "project-rate"];
    let lists = ["project-category", "project-status"];

    strings.forEach(id => {    
        for(let k of Object.keys(flag)){
            if(k == id && validateString(id)) {
                flag.`${k}` = true;
            }
        }
    })

    console.log(flag);
}