let allProjects = [];
function addNewProject(id, owner, title, category, status, hours, rate, description){
    if(!id || !owner || !title || !category || !status || !hours || !rate || !description){
        throw new Error("One of the keys for the objects is null when adding a new project.");
    }
    const newProject = {
        id: id,
        owner: owner,
        title: title,
        category: category,
        status: status,
        hours: hours,
        rate: rate,
        description: description
    }
    allProjects.push(newProject);
    localStorage.setItem(localStorage.length+1, JSON.stringify(newProject));
}

(function(){
    addNewProject('1', 'm3', 'my title', 'this one', 'completed', 12, 'keep it 100', 'descriptive');
    console.log(getProjects());
}());

function getProjects(key){
    if(key){
        return JSON.parse(localStorage.getItem(key));
    }
    let projects = []; 
    for (let i=0;i<localStorage.length;i++) {
        projects.push(getProjects(i+1+''));
    }
    return projects;
}


