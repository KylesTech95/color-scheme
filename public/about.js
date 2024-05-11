const h2s = document.querySelectorAll('.h2-class')
const daddys = document.querySelectorAll('.daddy-container')
const video = {
    keyboard: document.querySelector('.keyboard-video'),
    all:document.querySelectorAll('video')
}
h2s.forEach((h2,iterate)=>{
    setTimeout(()=>{
        h2.classList.remove('translate-left')
        h2.classList.remove('translate-restore')
    },250*(iterate+1))
})

// show daddy-containers
const showDaddyContainers = (array) => {
return [...array].map(daddy=>daddy.classList.remove('hidden'))
}

setTimeout(()=>{
    showDaddyContainers(daddys)
},1250)
