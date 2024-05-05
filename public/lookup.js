// form vars
let subBtn = document.getElementById('lookup-submit')
const addBtn = document.querySelectorAll('.add')
const input = document.getElementById('search')
const input_container = document.querySelector('.input-div')
const append_container = document.querySelector('.append-div')
const inputs = document.querySelectorAll('.search-input')
let val;
let prefix = 'http://'
let host = window.location.host;
let api = '/colors/lookup/?search='
let query = []
function setCursorPosition(inputElem, position) {
    if (inputElem.setSelectionRange) {
      inputElem.focus();
      inputElem.setSelectionRange(position, position);
    }
}
const handleKeydown = e => {
    if(!/[0-9]|ArrowLeft|ArrowRight|\,|Backspace|Alt|Control|[rgb\(\)]/ig.test(e.key)){
        e.preventDefault()
    }
    else{
        console.log(e.key)
    }
}
input.addEventListener('keydown',handleKeydown)

setCursorPosition(input,4)

// fetch lookup colors api
// fetch('/colors/lookup')
subBtn.onsubmit = e => {
    e.preventDefault();
}
subBtn.onclick = e => {
    e.preventDefault();
    const inputs = document.querySelectorAll('.search-input')
    query =[...inputs].map(x=>x.value).join`&search=`
    fetch(api+query).then(res=>res.json()).then(d=>console.log(d))

}
const addInput = e => {
    const newDiv = document.createElement('div')
    const n_input = document.createElement('input')
    const newAdd = document.createElement('span')
    n_input.setAttribute('type','text')
    n_input.setAttribute('value','rgb()')
    n_input.classList.add('search-input')
    newDiv.classList.add('input-div')
    newAdd.classList.add('add')
    newAdd.classList.add('add-input')
    newAdd.textContent='+'
    newDiv.appendChild(n_input)
    newDiv.appendChild(newAdd)
    append_container.appendChild(newDiv)
    const inputs = document.querySelectorAll('.search-input')
    newAdd.addEventListener('click',addInput)
    let parent = e.target.parentElement
    parent.removeChild(e.target)
    parent.style = 'width:100%;'
    setCursorPosition(n_input, 4 )
    const inputHandle = e =>{
        setCursorPosition(e.target,4)
    }   
    inputs.forEach(inp=>inp.addEventListener('click',inputHandle))
    inputs.forEach(inp=>inp.addEventListener('keydown',handleKeydown))

}


addBtn.forEach(btn=>btn.addEventListener('click',addInput))

