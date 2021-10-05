/**
 * 
 * @param {HTMLElement} a 
 * @param {string} b 
 */
function lol(a, b) {
    a.style.color = b;
}

const body = document.querySelector('tbody');

for (let i = 0; i < 50; i++) {
    body.innerHTML += "<tr><td>proj1</td><td>nasr</td><td>js320 prog</td><td>pract</td><td>completed</td><td>20</td><td>1.5</td><td>2 weeks</td></tr>"
}