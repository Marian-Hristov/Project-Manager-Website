/**
 *
 *
 */
function enableValudationEvents() {
    let strings = ["project-id", "project-owner", "project-title", "project-description"];
    let numbers = ["project-hours", "project-rate"];
    let lists = ["project-category", "project-status"];
    strings.forEach(id => {
        document.querySelector(`#${id}`).addEventListener("input", () => {
            validateString(id);
        })
    })

    numbers.forEach(id => {
        document.querySelector(`#${id}`).addEventListener("input", () => {
            let min = document.querySelector(`#${id}`).min;
            let max = document.querySelector(`#${id}`).max;
            validateNumber(id, min, max);
        })
    })

    lists.forEach(id => {
        document.querySelector(`input[list="${id}"]`).addEventListener("input", () => {
            validateList(id);
        })
    })
}
/**
 *
 *
 * @param {*} id
 * @param {*} valid
 */
function toggleValidationSVG(id, valid) {
    if (valid) {
        document.querySelector(`label[for="${id}"] svg.valid-svg`).style.display = "initial";
        document.querySelector(`label[for="${id}"] svg.invalid-svg`).style.display = "none";
    } else {
        document.querySelector(`label[for="${id}"] svg.valid-svg`).style.display = "none";
        document.querySelector(`label[for="${id}"] svg.invalid-svg`).style.display = "initial";
    }
}
/**
 *
 *
 * @param {*} selector
 * @param {*} valid
 */
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
/**
 *
 *
 * @param {*} id
 * @return {*} 
 */
function validateString(id) {
    let value = document.querySelector(`#${id}`).value;
    // Checking if the string is a string or if it is empty
    if (value != "" || typeof id != 'string') {
        toggleValidationMode(`#${id}`, true);
        toggleValidationSVG(id, true);
        return true;
    }
    toggleValidationMode(`#${id}`, false);
    toggleValidationSVG(id, false);
    return false;
}

/**
 *
 *
 * @param {*} id
 * @param {*} min
 * @param {*} max
 * @return {*} 
 */
// TODO Define a default value of undefined for max
function validateNumber(id, min, max) {
    let value = document.querySelector(`#${id}`).value;
    min = Number(min);
    if (max == "") {
        max = undefined;
    } else {
        max = Number(max);
    }
    if (typeof min == "number" && typeof max == "undefined" && value >= min) {
        toggleValidationMode(`#${id}`, true);
        toggleValidationSVG(id, true);
        return true;
    }
    if (typeof min == "number" && typeof max == "number" && value >= min && value <= max) {
        toggleValidationMode(`#${id}`, true);
        toggleValidationSVG(id, true);
        return true;
    }
    toggleValidationMode(`#${id}`, false);
    toggleValidationSVG(id, false);
    return false;
}
/**
 *
 *
 * @param {*} id
 * @return {*} 
 */
function validateList(id) {
    let value = document.querySelector(`input[list="${id}"]`).value;
    let optionElems = document.querySelectorAll("#project-status option");
    let found = false;
    let options = [];
    optionElems.forEach(option => {
        options.push(option.value);
    });

    options.forEach(option => {
        if (value == option && !found) {
            console.log(value == option);
            toggleValidationMode(`input[list="${id}"]`, true);
            toggleValidationSVG(id, true);
            found = true;
        }
    })
    if (!found) {
        toggleValidationMode(`input[list="${id}"]`, false);
        toggleValidationSVG(id, false);
        return false;
    } else {
        return true;
    }
}
/**
 * 
 *
 * @return {*} 
 */
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

    strings.forEach(id => {
        for (let k of Object.keys(flag)) {
            if (k == id && validateString(id)) {
                flag[k] = true;
            }
        }
    })

    numbers.forEach(id => {
        for (let k of Object.keys(flag)) {
            let min = document.querySelector(`#${id}`).min;
            let max = document.querySelector(`#${id}`).max;
            if (k == id && validateNumber(id, min, max)) {
                flag[k] = true;
            }
        }
    })

    lists.forEach(id => {
        for (let k of Object.keys(flag)) {
            if (k == id && validateList(id)) {
                flag[k] = true;
            }
        }
    })

    for (let k of Object.values(flag)) {
        console.log(k);
        if (!k) {
            document.querySelector(".pop-up-action-container input").setAttribute("disabled", "true");
            return;
        }
    }

    document.querySelector(".pop-up-action-container input").removeAttribute("disabled");
}