/**
 * 
 * @param {HTMLElement} a 
 * @param {string} b 
 */
function lol(a, b) {
    a.style.color = b;
}

const body = document.querySelector('tbody');

for (let i = 0; i < 10; i++) {
    body.innerHTML += `<tr><td>proj1</td><td>nasr</td><td>js320 prog</td><td>pract</td><td>completed</td><td>20</td><td>1.5</td><td>2 weeks</td><td><button><svg class="icon" viewBox="0 0 16 16"><circle cx="8" cy="7.5" r="1.5"></circle><circle cx="1.5" cy="7.5" r="1.5"></circle><circle cx="14.5" cy="7.5" r="1.5"></circle></svg></button></td></tr>`
}