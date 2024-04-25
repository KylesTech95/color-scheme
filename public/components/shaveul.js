// Isolate all children within spot-container, and remove the child(input)
export default function shaveUl(spot){
     let arr = [...spot.children].filter(child=>child.type==='text')    // filter all inputs for type = text
     let cp = document.querySelector('.choice-spot')     // select choice spot div
     let cparr = [...cp.children].filter(child=>child.type==='text')  // filter all inputs for type = text
     for(let i = 0; i < cparr.length; i++){
        if(cparr[i]==arr[i]){   // if items in cparr == arr   
            if(i!==cparr.length-1){//if i is -ne (not equal) to last item in cparr
                spot.removeChild(arr[i])// remove the child
            }
        }
     }
}