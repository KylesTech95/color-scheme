const h2s = document.querySelectorAll('.h2-class')

// window.onload = e => {
//     setTimeout(()=>{
//         h2s.forEach(h2=>{
//             h2.classList.remove('translate-left')
//             h2.classList.remove('translate-restore')
//         })
//     },5000)
// }
h2s.forEach((h2,iterate)=>{
    setTimeout(()=>{
        h2.classList.remove('translate-left')
        h2.classList.remove('translate-restore')
    },250*(iterate+1))
})