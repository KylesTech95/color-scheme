const h2s = document.querySelectorAll('.h2-class')
const video = {
    keyboard: document.querySelector('.keyboard-video')
}
h2s.forEach((h2,iterate)=>{
    setTimeout(()=>{
        h2.classList.remove('translate-left')
        h2.classList.remove('translate-restore')
    },250*(iterate+1))
})
// const video_location = window.location.origin+'/../media/keyboard-vid.mp4'
// load video statically
// video.keyboard.src = video_location
// console.log(video.keyboard)

// load text as a blob
let URL = window.URL
// let data = 'testing data here'

// let text = new Blob([data],{type: 'text/plain'})
// let value = URL.createObjectURL(text)

//http://127.0.0.1:5500/media/keyboard-vid.mp4
let url = window.location.origin+'/media/keyboard-vid.mp4';
fetch(url).then(res=>res.blob()).then(blob=>{
    readFile(blob)
    const file = new File([blob],'image',{type:blob.type})
    console.log(file)
})

function readFile(input){
    const fr = new FileReader();
    fr.readAsDataURL(input)

    fr.addEventListener('load',e=>{
        const res = fr.result;
        console.log(res)
    })
}


