
// ! WORKING ON THE EDITING OF A PROJECT
function startEditingProject(index){
    currentEditedProject = index;
}

function stopEditingProject(index){
    currentEditedProject = undefined;
}

function deleteProject(index){
    projects.splice(index, 1);
    const projectsPerPage = 8;
    const pageNumber = ((index - (index % projectsPerPage))/projectsPerPage);
    showTable(pageNumber);
}
// ! WORKING ON THE EDITING OF A PROJECT

function createActionMenu(index){
    // Td holding the whole action menu
    let box = document.createElement("td");
    box.classList.add("action-box")

    // The action-menu button
    let button = document.createElement("button");
    // Button SVG
    let svg = document.createElement("svg");
    svg.classList.add("icon");
    svg.setAttribute("viewBox", "0 0 16 16");
    // SVG CIRCLES
    let arr = ["8", "1.5", "14.5"];
    arr.forEach(elem => {
        let circle = document.createElement("circle");
        circle.setAttribute("cx", elem);
        circle.setAttribute("cy", "7.5");
        circle.setAttribute("r", "1.5");
        svg.appendChild(circle);
    })
    button.appendChild(svg);
    box.appendChild(button);

    // Action-menu
    // div
    let menu = document.createElement("div");
    menu.classList.add("action-menu");
    // ul
    let ul = document.createElement("ul");
    // li Edit
    let li = document.createElement("li");
    li.classList.add("option");
    li.setAttribute("index", `${index}`);
    svg = document.createElement("svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("data-prefix", "far");
    svg.setAttribute("data-icon", "edit");
    svg.setAttribute("class", "svg-inline--fa fa-edit fa-w-18");
    svg.setAttribute("role", "img");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 576 512");
    let path = document.createElement("path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", "M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z")

    svg.appendChild(path);
    let p = document.createElement("p")
    p.textContent = "Edit";

    li.appendChild(svg);
    li.appendChild(p);

    ul.appendChild(li)

    //li Delete
    li = document.createElement("li");
    li.classList.add("option");
    li.addEventListener("click", function (){
        deleteProject(index);
    })
    svg = document.createElement("svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("data-prefix", "fas");
    svg.setAttribute("data-icon", "trash-alt");
    svg.setAttribute("class", "svg-inline--fa fa-trash-alt fa-w-14");
    svg.setAttribute("role", "img");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 448 512");
    path = document.createElement("path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", "M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z")

    svg.appendChild(path);
    p = document.createElement("p")
    p.textContent = "Delete";

    li.appendChild(svg);
    li.appendChild(p);

    ul.appendChild(li)

    menu.appendChild(ul);
    box.appendChild(menu);

    console.log(box);
    return box;
}