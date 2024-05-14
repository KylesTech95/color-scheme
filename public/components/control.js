export const animateControlParts = (controlParts) => {
    controlParts.forEach((part,index)=>{
        // icons appear
        setTimeout(()=>{
            part.classList.remove('part-hidden')
        },750*(index+1))
    
        // icons appear at a set interval
        setInterval(()=>{
            // remove icons before timeout
            part.classList.add('part-hidden')
            // set timeout to have icons appear
            setTimeout(()=>{
                part.classList.remove('part-hidden')
            },750*(index+1))
        
        },3250)
    })
}