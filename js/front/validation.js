'use strit';
/**
 * This function displays or not the approriate validation SVG for each input of each type of popup
 * @param {string} id the id of the input linked to the label without the type of the popup
 * @param {string} type The type of the popup which contains the input linked to the label
 * @param {boolean} valid If the label is supposed to show the valid/invalid SVG
 */
function toggleValidationSVG(id, type, valid) {
    // Toggles the right and wrong SVG's on labels to inputs depending on inputs' validity
    if (valid) {
        document.querySelector(`label[for="${id}-${type}"] svg.valid-svg`).style.display = "initial";
        document.querySelector(`label[for="${id}-${type}"] svg.invalid-svg`).style.display = "none";
    } else {
        document.querySelector(`label[for="${id}-${type}"] svg.valid-svg`).style.display = "none";
        document.querySelector(`label[for="${id}-${type}"] svg.invalid-svg`).style.display = "initial";
    }
}

/**
 * This function adds/removes the valid/invalid class according to if the input is valid or not
 * @param {string} selector css selector for the input
 * @param {boolean} valid if the input is valid or not
 */
function toggleValidationMode(selector, valid) {
    let elem = document.querySelector(selector);
    // Toggles valid and invalid classes on an element depending of its validity
    if (valid) {
        elem.classList.remove("invalid");
        elem.classList.add("valid");
    } else {
        elem.classList.remove("valid");
        elem.classList.add("invalid");
    }
}

/**
 * This functions calls the functions that show the feedback of the input depending if we want it to be shown or not
 * @param {string} id the id of the input without the type of the popup
 * @param {sting} type the type of the popup
 * @param {string} selector the selector for the input
 * @param {boolean} valid if the input is valid or not
 * @param {boolean} show if we want or not to show the feedback
 */
function showFeedback(id, type, selector, valid, show) {
    if (show) {
        toggleValidationMode(selector, valid);
        toggleValidationSVG(id, type, valid);
    }
}

/**
 * This functions starts the validation for all inputs for each popup
 * @param {boolean} start If the validation should start or not
 */
function startValidationAll(start) {
    if (start) {
        validateAll();
    }
}

/**
 * This function validates text inputs
 * @param {string} id the id of the input without the type of the popup
 * @param {string} type the type of the popup
 * @param {boolean} feedBackShown if feedback should be shown or not
 * @param {boolean} allValidation if validation should start or not
 * @return {boolean} Returns if the input is valid or not
 */
function validateString(id, type, feedBackShown, allValidation) {
    let value = document.querySelector(`#${id}-${type}`).value;
    // Checking if the string is a string or if it is empty
    if (value != "" || typeof id != 'string') {
        showFeedback(id, type, `#${id}-${type}`, true, feedBackShown);
        startValidationAll(allValidation);
        return true;
    }
    showFeedback(id, type, `#${id}-${type}`, false, feedBackShown);
    startValidationAll(allValidation);
    return false;
}

/**
 * This function validates number inputs
 * @param {string} id the id of the input without the type of the popup
 * @param {string} type the type of the popup
 * @param {string} min the min value of the input
 * @param {string} max the max value of the input
 * @param {boolean} feedBackShown if feedback should be shown or not
 * @param {boolean} allValidation if validation should start or not
 * @return {boolean} Returns if the input is valid or not
 */
// TODO Define a default value of undefined for max
function validateNumber(id, type, min, max, feedBackShown, allValidation) {
    let value = document.querySelector(`#${id}-${type}`).value;
    min = Number(min);
    // Checking if max param has a value or not
    if (max == "") {
        max = undefined;
    } else {
        max = Number(max);
    }
    // Checking value when max isn't defined and showing feedback and starting validation if condition is true
    if (typeof min == "number" && typeof max == "undefined" && value >= min) {
        showFeedback(id, type, `#${id}-${type}`, true, feedBackShown);
        startValidationAll(allValidation);
        return true;
    }
    // Checking value when max is defined and showing feedback and starting validation if condition is true
    if (typeof min == "number" && typeof max == "number" && value >= min && value <= max) {
        showFeedback(id, type, `#${id}-${type}`, true, feedBackShown);
        startValidationAll(allValidation);
        return true;
    }
    // Showing feedback for when the 
    showFeedback(id, type, `#${id}-${type}`, false, feedBackShown);
    return false;
}
/**
 * This function validates input with a datalist
 * @param {string} id the id of the input without the type of the popup
 * @param {string} type the type of the popup
 * @param {boolean} feedBackShown if feedback should be shown or not
 * @param {boolean} allValidation if validation should start or not
 * @return {boolean} Returns if the input is valid or not
 */
function validateList(id, type, feedBackShown, allValidation) {
    let value = document.querySelector(`input[list="${id}-${type}"]`).value;
    let optionElems = document.querySelectorAll(`#${id}-${type} option`);
    let found = false;
    let options = [];
    // Getting all the options of the datalist
    optionElems.forEach(option => {
        options.push(option.value);
    });
    // Checking if the value of the input matches any options
    options.forEach(option => {
        if (value == option && !found) {
            showFeedback(id, type, `input[list="${id}-${type}"]`, true, feedBackShown);
            found = true;
        }
    })
    // Showing feedback or starting validation depending if the value was found among the options
    if (!found) {
        showFeedback(id, type, `input[list="${id}-${type}"]`, false, feedBackShown);
        return false;
    } else {
        startValidationAll(allValidation);
        return true;
    }
}
/**
 * This function validates all the inputs in the right 
 */
function validateAll() {
    // validation booleans for each input
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
    // Input types
    let strings = ["project-id", "project-owner", "project-title", "project-description"];
    let numbers = ["project-hours", "project-rate"];
    let lists = ["project-category", "project-status"];
    // Popup types
    let types = ["action", "add"];

    // Looping through types
    types.forEach(type => {
        // Looping through text inputs   
        strings.forEach(id => {
            for (let k of Object.keys(flag)) {
                // Validating and not showing feedback
                if (k == id && validateString(id, type, false, false)) {
                    flag[k] = true;
                }
            }
        })

        // Looping through number inputs
        numbers.forEach(id => {
            for (let k of Object.keys(flag)) {
                let min = document.querySelector(`#${id}-${type}`).min;
                let max = document.querySelector(`#${id}-${type}`).max;
                // Validating and not showing feedback
                if (k == id && validateNumber(id, type, min, max, false, false)) {
                    flag[k] = true;
                }
            }
        })

        // Looping through inputs with datalist
        lists.forEach(id => {
            for (let k of Object.keys(flag)) {
                // Validating and not showing feedback
                if (k == id && validateList(id, type, false, false)) {
                    flag[k] = true;
                }
            }
        })

        // Disabling the confirmation button if one input's validation flag is false
        for (let k of Object.values(flag)) {
            if (!k) {
                document.querySelector(`.pop-up-action-container input#action-${type}`).setAttribute("disabled", "true");
                return;
            }
        }

        // Enabling the confirmation button
        document.querySelector(`.pop-up-action-container input#action-${type}`).removeAttribute("disabled");
    })

}