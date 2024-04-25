import { copyColor } from "./copymachine.js"
// input click event
 export const clickInput = (input) => {
    input.onclick=e=>{
        // // console.log(e.target)
        input.setAttribute('onclick',"return false;")
        input.setAttribute('onkeydown',"return false;")
        copyColor(input)
    }
}  