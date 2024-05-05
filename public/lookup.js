// form vars
let subBtn = document.getElementById('lookup-submit')
const addBtn = document.querySelectorAll('.add')
const input = document.getElementById('search')
const input_container = document.querySelector('.input-div')
const append_container = document.querySelector('.append-div')
const inputs = document.querySelectorAll('.search-input')
const inv_container = document.querySelector('.color-inv-list-container')
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
setCursorPosition(input,4)
let index = 0;
const handleKeydown = e => {
    if(!/[0-9]|ArrowLeft|ArrowRight|\,|Backspace|Alt|Control|[rgb\(\)]/ig.test(e.key)){
        e.preventDefault()
    }
    else{
        // console.log('passing key')
    }
}
const handleClick = e => {
    setCursorPosition(e.target,4)
}
input.addEventListener('click',handleClick)
input.addEventListener('keydown',handleKeydown)

// fetch lookup colors api
// fetch('/colors/lookup')
subBtn.onsubmit = e => {
    e.preventDefault();
}
subBtn.onclick = e => {
    e.preventDefault();
    const inputs = document.querySelectorAll('.search-input')
    query =[...inputs].map(x=>x.value).join`&search=`
    fetch(api+query).then(res=>res.json()).then(d=>{
        let data = d.colors;
        let arr = []
        // iterate through the data(rest api)
        for(let i = 0; i < data.length; i++){
            const li = document.createElement('div')
            li.classList.add('inventory-div')
            li.style.background = data[i]
            arr.push(li)
            
        }
        arr.filter((a,i)=>{
            let sty = a.style.background;
            console.log(sty)
        })
        arr.forEach(el=>{
            console.log(el)
            inv_container.appendChild(el)
        })
    // console.log('heyy')

})
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

