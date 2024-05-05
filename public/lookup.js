// form vars
let subBtn = document.getElementById('lookup-submit')
const addBtn = document.querySelectorAll('.add')
const input_container = document.querySelector('.input-div')
const append_container = document.querySelector('.append-div')
let val;
let input = document.getElementById('search')
let prefix = 'http://'
let host = window.location.host;
let api = '/colors/lookup/?search='
let query;
const constructURL = () => {

}
// fetch lookup colors api
// fetch('/colors/lookup')
subBtn.onsubmit = e => {
    e.preventDefault();
}
subBtn.onclick = e => {
    e.preventDefault();
    query = input.value;
    fetch(api+query).then(res=>res.json()).then(d=>console.log(d.colors))

}
const addInput = e => {
    const newDiv = document.createElement('div')
    const n_input = document.createElement('input')
    const newAdd = document.createElement('span')
    newDiv.classList.add('input-div')
    newAdd.classList.add('add')
    newAdd.classList.add('add-input')
    newAdd.textContent='+'
    newDiv.appendChild(n_input)
    newDiv.appendChild(newAdd)
    append_container.appendChild(newDiv)
}
addBtn.forEach(btn=>btn.addEventListener('click',addInput))

