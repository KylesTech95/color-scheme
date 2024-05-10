const h2s = document.querySelectorAll('.h2-class')

h2s.forEach((h2,iterate)=>{
    setTimeout(()=>{
        h2.classList.remove('translate-left')
        h2.classList.remove('translate-restore')
    },250*(iterate+1))
})

fetch('/media/keyboard-vid.mp4').then(res=>res.json()).then(data=>{
    console.log(data.message)
})