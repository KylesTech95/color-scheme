import { copyColor } from "./components/copymachine.js"
// form vars
const typeBtn = document.getElementById('lookup-type')
let subBtn = document.getElementById('lookup-submit')
const addBtn = document.querySelectorAll('.add')
const input = document.getElementById('search')
const append_container = document.querySelector('.append-div')
const inv_container = document.querySelector('.color-inv-list-container')
let api = '/colors/lookup/?search='
let query = []
let lastInput

const oneInput = document.querySelector('.search-input')
    // onchange event listener
oneInput.addEventListener('change',e=>{
        if((/([a-fA-F0-9]{3,6})/.test(e.target.value) || 
        /rgb\((\d{1,3})(\s{0,5})?,(\s{0,5})?(\d{1,3})(\s{0,5})?,(\s{0,5})?(\d{1,3})(\s{0,5})?\)/i.test(e.target.value))){
            lastInput = e.target.value
            console.log(lastInput)
        }
    })
const handleTypeChange = (ev) => {
    let inputsTemp = document.querySelectorAll('.search-input')
        if(ev.target.textContent == 'RGB'){
            ev.target.textContent = 'HEX'
            inputsTemp.forEach(inp=>{
                inp.value=''
                inp.placeholder='Ex: 44550, 000, 99ddcc'
            })
        }
    else{
            ev.target.textContent = 'RGB'
            inputsTemp.forEach(inp=>{
            inp.value='rgb()'
            inp.placeholder='Ex: rgb(255,255,0)'
        })
    }
    }
    typeBtn.addEventListener('click',handleTypeChange)

function setCursorPosition(inputElem, position) {
    if (inputElem.setSelectionRange) {
      inputElem.focus();
      inputElem.setSelectionRange(position, position);
    }
}
setCursorPosition(input,4)
const handleKeydown = e => {
    if(!/[0-9]|\,|Backspace|Alt|Control|[rgbva\(\)]/ig.test(e.key)){
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
        console.log(data)
        let arr = []
        // iterate through the data(rest api)
        for(let i = 0; i < data.length; i++){
            const li = document.createElement('input')
            li.spellcheck=false;
            li.value=data[i]
            li.classList.add('inventory-div')
            li.style.background = data[i]
            arr.push(li)
        }
        let colorDivs = document.querySelectorAll('.inventory-div')

            if(colorDivs.length > 0){
                const updatedInvContainer = document.querySelector('.color-inv-list-container')
                arr.forEach(el=>{
                    updatedInvContainer.appendChild(el)
                })
                colorDivs.forEach(d=>{
                    arr.forEach(item=>{
                        if(item.style.background === d.style.background){
                            inv_container.removeChild(d)
                        }
                    })
                })
            }
            else{
                console.log('div did not exist until now')
                arr.forEach(el=>{
                    inv_container.appendChild(el)
                })
            }
        
            // copy the input within the inventory by click
            const updatedDivs = document.querySelectorAll('.inventory-div')
            const container = document.querySelector('.color-inv-list-container')
                updatedDivs.forEach((d,index)=>{
                    let gen;
                    d.addEventListener('click',e=>{
                        gen = (e.target)
                        copyColor(e.target)
                        if(window.innerWidth > 1000){
                            return [...updatedDivs].map((x,y)=>{
                                if(x!==gen){
                                    x.style.color='transparent';
                                    x.disabled=false;
                                }
                                else{
                                    x.style.color='#333';
                                    x.disabled=true;
                                }
                            })
                        }
                    })
                })
                if(updatedDivs.length > 6){
                    let first = 0;
                    container.removeChild(updatedDivs[first])   
                }
            

            
})
}

const subtractInput = e => {
    const newAdd = document.createElement('span')
    newAdd.classList.add('add')
    newAdd.classList.add('add-input')
    newAdd.textContent='+'
    
    const subtract = document.createElement('div')
    subtract.classList.add('subtract')
    subtract.textContent='-'
    // e.target.parentElement.removeChild(e.target.previousSibling)
    // e.target.parentElement.removeChild(e.target)
    const inputs = document.querySelectorAll('.search-input')
    const appendDiv = document.querySelector('.append-div')
    let dfk = [inputs.length-1]
    for(let i=0;i<inputs.length;i++){
        if(lastInput == inputs[i].value)console.log('matched!')
        if(inputs[i] == inputs[dfk] && i > 0){
            appendDiv.removeChild(inputs[dfk].parentElement)
            e.target.parentElement.removeChild(inputs[dfk])
            if(i < 2){
                e.target.parentElement.removeChild(e.target.previousSibling)
            }
            e.target.parentElement.removeChild(e.target);
            if((dfk-1) > 0){
                inputs[dfk-1].parentElement.appendChild(newAdd)
                inputs[dfk-1].parentElement.appendChild(subtract)
                subtract.addEventListener('click',subtractInput)
            }
            else{
                inputs[dfk-1].parentElement.appendChild(newAdd)
            }
            newAdd.addEventListener('click',addInput)
            
        }


    }
}
// add new input
const addInput = e => {
    const newDiv = document.createElement('div')
    const n_input = document.createElement('input')
    const newAdd = document.createElement('span')
    const subtract = document.createElement('div')
    subtract.classList.add('subtract')
    subtract.textContent='-'
    n_input.setAttribute('type','text')
    n_input.setAttribute('value','rgb()')
    n_input.classList.add('search-input')
    n_input.placeHolder = /RGB/.test(typeBtn.textContent) ? 'Ex: rgb(255,255,0)' : 'Ex: 44550, 000, 99ddcc'
    newDiv.classList.add('input-div')
    newAdd.classList.add('add')
    newAdd.classList.add('add-input')
    newAdd.textContent='+'
    newDiv.appendChild(n_input)
    const inputs = document.querySelectorAll('.search-input')
    newDiv.appendChild(newAdd)
    newDiv.appendChild(subtract)

    let parent = e.target.parentElement
    let grandparent = parent.parentElement
    if(grandparent.children.length > 1) parent.removeChild(e.target.nextSibling)
    parent.removeChild(e.target)

    append_container.appendChild(newDiv)
    const inputsUpdated = document.querySelectorAll('.search-input')

    // handle type change on btn click
    typeBtn.addEventListener('click',handleTypeChange)
    // const inputsUpdated = document.querySelectorAll('.search-input')
    // onchange event listener
    inputsUpdated.forEach((inp,index)=>{
        // console.log(inp)
        inp.addEventListener('change',e=>{
            console.log(e.target.value)
            console.log(e.target.value.length)
            if(index==inputsUpdated.length-1 && (/([a-fA-F0-9]{3,6})/.test(e.target.value) || 
            /rgb\((\d{1,3})(\s{0,5})?,(\s{0,5})?(\d{1,3})(\s{0,5})?,(\s{0,5})?(\d{1,3})(\s{0,5})?\)/i.test(e.target.value))){
                lastInput = e.target.value
            }
        })
    })


    if(inputs.length==2) newDiv.removeChild(newDiv.children[1])
    // const inputs = document.querySelectorAll('.search-input')
    newAdd.addEventListener('click',addInput)
    subtract.addEventListener('click',subtractInput)
    
    parent.style = 'width:100%;'
    const inputHandle = e =>{
        setCursorPosition(e.target,4)
    }   
    inputsUpdated.forEach(inp=>inp.addEventListener('click',inputHandle))
    inputsUpdated.forEach(inp=>inp.addEventListener('keydown',handleKeydown))

}
addBtn.forEach(btn=>btn.addEventListener('click',addInput))


window.addEventListener("keydown", function(e) {    
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1){
            e.preventDefault()
        }  
}, 
false);


// adjust the window to scroll to the top onload
// change inputs to blur() (not focus) onload
const inputs = document.querySelectorAll('.search-input');
window.onload = e =>{
    inputs.forEach(inp=>inp.blur());
    window.scrollTo(0,0)
    
}

// const inps = document.querySelectorAll('.search-input')
// inps.forEach((inp,index)=>{
//     console.log(inp)
//     inp.addEventListener('change',e=>{
//         console.log(e.target.value)
//         console.log(e.target.value.length)
//         if(index==inps.length-1 && (/([a-fA-F0-9]{3,6})/.test(e.target.value) || 
//         /rgb\((\d{1,3})(\s{0,5})?,(\s{0,5})?(\d{1,3})(\s{0,5})?,(\s{0,5})?(\d{1,3})(\s{0,5})?\)/i.test(e.target.value))){
//             lastInput = e.target.value
//             console.log(lastInput)
//         }
//     })
// })
