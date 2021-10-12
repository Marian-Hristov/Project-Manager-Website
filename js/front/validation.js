function toggleValidationSVG(id, type, valid) {
    if (valid) {
        document.querySelector(`label[for="${id}-${type}"] svg.valid-svg`).style.display = "initial";
        document.querySelector(`label[for="${id}-${type}"] svg.invalid-svg`).style.display = "none";
    } else {
        document.querySelector(`label[for="${id}-${type}"] svg.valid-svg`).style.display = "none";
        document.querySelector(`label[for="${id}-${type}"] svg.invalid-svg`).style.display = "initial";
    }
}

function toggleValidationMode(selector, valid) {
    let elem = document.querySelector(selector);
    if (valid) {
        elem.classList.remove("invalid");
        elem.classList.add("valid");
    } else {
        elem.classList.remove("valid");
        elem.classList.add("invalid");
    }
}

function showFeedback(id, type, selector, valid, show) {
    if (show) {
        toggleValidationMode(selector, valid);
        toggleValidationSVG(id, type, valid);
    }
}

function startValidationAll(start) {
    if (start) {
        validateAll();
    }
}

function validateString(id, type, feedBackShown, allValidation) {
    let value = document.querySelector(`#${id}-${type}`).value;
    // Checking if the string is a string or if it is empty
    if (value != "" || typeof id != 'string') {
        showFeedback(id, type, `#${id}-${type}`, true, feedBackShown);
        startValidationAll(allValidation);
        return true;
    }
    showFeedback(id, type, `#${id}-${type}`, false, feedBackShown);
    if (allValidation) {
        validateAll();
    }
    return false;
}

// TODO Define a default value of undefined for max
function validateNumber(id, type, min, max, feedBackShown, allValidation) {
    let value = document.querySelector(`#${id}-${type}`).value;
    min = Number(min);
    if (max == "") {
        max = undefined;
    } else {
        max = Number(max);
    }
    if (typeof min == "number" && typeof max == "undefined" && value >= min) {
        showFeedback(id, type, `#${id}-${type}`, true, feedBackShown);
        startValidationAll(allValidation);
        return true;
    }
    if (typeof min == "number" && typeof max == "number" && value >= min && value <= max) {
        showFeedback(id, type, `#${id}-${type}`, true, feedBackShown);
        startValidationAll(allValidation);
        return true;
    }
    showFeedback(id, type, `#${id}-${type}`, false, feedBackShown);
    return false;
}

function validateList(id, type, feedBackShown, allValidation) {
    let value = document.querySelector(`input[list="${id}-${type}"]`).value;
    let optionElems = document.querySelectorAll(`#${id}-${type} option`);
    let found = false;
    let options = [];
    optionElems.forEach(option => {
        options.push(option.value);
    });

    options.forEach(option => {
        if (value == option && !found) {
            showFeedback(id, type, `input[list="${id}-${type}"]`, true, feedBackShown);
            found = true;
        }
    })

    if (!found) {
        showFeedback(id, type, `input[list="${id}-${type}"]`, false, feedBackShown);
        return false;
    } else {
        startValidationAll(allValidation);
        return true;
    }
}

function validateAll() {
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
    let types = ["action", "add"];

    types.forEach(type => {    
        strings.forEach(id => {
            for (let k of Object.keys(flag)) {
                if (k == id && validateString(id, type, false, false)) {
                    flag[k] = true;
                }
            }
        })

        numbers.forEach(id => {
            for (let k of Object.keys(flag)) {
                let min = document.querySelector(`#${id}-${type}`).min;
                let max = document.querySelector(`#${id}-${type}`).max;
                if (k == id && validateNumber(id, type, min, max, false, false)) {
                    flag[k] = true;
                }
            }
        })

        lists.forEach(id => {
            for (let k of Object.keys(flag)) {
                if (k == id && validateList(id, type, false, false)) {
                    flag[k] = true;
                }
            }
        })

        for (let k of Object.values(flag)) {
            if (!k) {
                document.querySelector(`.pop-up-action-container input#action-${type}`).setAttribute("disabled", "true");
                return;
            }
        }

        document.querySelector(`.pop-up-action-container input#action-${type}`).removeAttribute("disabled");
    })

}