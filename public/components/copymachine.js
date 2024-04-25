// copy color with navigatior's clipboard.writeText() function
export const copyColor = async(inp) => {
    try {
      await navigator.clipboard.writeText(inp.value);
    //   console.log('Content copied to clipboard');
    } catch (err) {
    //   console.error('Failed to copy: ', err);
    }
  
} 
// copy message appears when new color is clicked(in spot-container)
export const copyMessagePop = (midline,spot,copy_message) => {
if(midline.getBoundingClientRect().y < spot.getBoundingClientRect().y+(spot.clientHeight/2)){
    copy_message.classList.remove('coppied-message-hidden')
    copy_message.classList.remove('coppied-message-hidden-down')

    copy_message.classList.add('coppied-message')
    setTimeout(()=>{
    copy_message.classList.add('coppied-message-hidden')
    copy_message.classList.remove('coppied-message')
},750)
console.log('you are over')
}
else{
    copy_message.classList.remove('coppied-message-hidden')
    copy_message.classList.remove('coppied-message-hidden-down')

    copy_message.classList.add('coppied-message-down')
    setTimeout(()=>{
    copy_message.classList.add('coppied-message-hidden-down')
    copy_message.classList.remove('coppied-message-down')
},750)
}
}
