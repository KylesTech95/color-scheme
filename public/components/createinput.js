
export default function createInput(input,data,id,bool){
    if(!bool){
        // console.log(data)
        input.style.background = data.current_color;
        input.classList.add('color-input')
        input.setAttribute('type','text')
        // input.setAttribute('disabled','true')
            input.setAttribute('autocomplete','off')
            input.setAttribute('spellcheck','false')
            input.setAttribute('id','choice-spot-input')
        input.setAttribute('value',data.current_color)
        input.setAttribute('disabled',true)
    }
    else{
        // console.log(data)
        input.style.background = data.color;
        input.classList.add('color-input')
        input.setAttribute('type','text')
        // input.setAttribute('disabled','true')
        input.setAttribute('autocomplete','off')
        input.setAttribute('spellcheck','false')
        input.setAttribute('value',data.color)
        input.setAttribute('disabled',true)
        }
}