const h2s = document.querySelectorAll('.h2-class')

h2s.forEach((h2,iterate)=>{
    setTimeout(()=>{
        h2.classList.remove('translate-left')
        h2.classList.remove('translate-restore')
    },250*(iterate+1))
})

let xml = new XMLHttpRequest()
xml.open('GET','/read-video',true)

xml.onload = (d) => {
console.log(d)
}

xml.send();