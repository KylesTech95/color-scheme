export default function blink(finger){
    finger.classList.add('finger-glow')
    finger.parentElement.classList.add('finger-border-active')
    setTimeout(()=>{
        finger.classList.remove('finger-glow')
        finger.parentElement.classList.remove('finger-border-active')
    },250)
}