function enableValudationEvents(){
    let strings = ["project-id", "project-owner", "project-title", "project-description"];
    let numbers = ["project-hours", "project-rate"];
    let lists = ["project-category", "project-status"];
    strings.forEach( id => {
        document.querySelector(`#${id}`).addEventListener("change", () => {
            validateString(id);
        } )
    })

    numbers.forEach( id => {
        document.querySelector(`#${id}`).addEventListener("change", () => {
            let min = document.querySelector(`#${id}`).min;
            let max = document.querySelector(`#${id}`).max;
            validateNumber(id, min, max);
        })
    })

    lists.forEach(id => {
        document.querySelector(`input[list="${id}"]`).addEventListener("change", () => {
            validateList(id);
        })
    })
}

function toggleValidationSVG(id, valid){
    if(valid){
        document.querySelector(`label[for="${id}"] svg.valid-svg`).style.display = "initial";
        document.querySelector(`label[for="${id}"] svg.invalid-svg`).style.display = "none";
    } else {
        document.querySelector(`label[for="${id}"] svg.valid-svg`).style.display = "none";
        document.querySelector(`label[for="${id}"] svg.invalid-svg`).style.display = "initial";
    }
}

function toggleValidationMode(selector, valid){
    let elem = document.querySelector(selector);
    if(valid){
        elem.classList.remove("invalid");
        elem.classList.add("valid");
    } else {
        elem.classList.remove("valid");
        elem.classList.add("invalid");
    }
}

function validateString(id){
    let value = document.querySelector(`#${id}`).value;
    // Checking if the string is a string or if it is empty
    if(value != "" || typeof id != 'string'){
        toggleValidationMode(`#${id}`, true);
        toggleValidationSVG(id, true);
        return true;
    }
    toggleValidationMode(`#${id}`, false);
    toggleValidationSVG(id, false);
    return false;
}

// TODO Define a default value of undefined for max
function validateNumber(id, min, max){
    let value = document.querySelector(`#${id}`).value;
    min = Number(min);
    if(max == "") {
        max = undefined;
    } else {
        max = Number(max);
    }
    if (typeof min == "number" && typeof max == "undefined" && value >= min){
        toggleValidationMode(`#${id}`, true);
        toggleValidationSVG(id, true);
        return true;
    }
    if (typeof min == "number" && typeof max == "number" && value >= min && value <= max){
        toggleValidationMode(`#${id}`, true);
        toggleValidationSVG(id, true);
        return true;
    }
    toggleValidationMode(`#${id}`, false);
    toggleValidationSVG(id, false);
    return false;
}

function validateList(id){
    let value = document.querySelector(`input[list="${id}"]`).value;
    console.log(id, value);
    if(value == ""){
        toggleValidationMode(`input[list="${id}"]`, false);
        toggleValidationSVG(id, false);
        return false;
    }
    toggleValidationMode(`input[list="${id}"]`, true);
    toggleValidationSVG(id, true);
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
                flag[k] = true;
            }
        }
    })

    numbers.forEach(id => {
        for(let k of Object.keys(flag)){
            let min = document.querySelector(`#${id}`).min;
            let max = document.querySelector(`#${id}`).max;
            if(k == id && validateNumber(id, min, max)) {
                flag[k] = true;
            }
        }
    })

    lists.forEach(id => {
        for(let k of Object.keys(flag)){
            if(k == id && validateList(id)) {
                flag[k] = true;
            }
        }
    })

    console.log(flag);
}