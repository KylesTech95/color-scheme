const h2s = document.querySelectorAll('.h2-class')
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
// const video_location = window.location.origin+'/../media/keyboard-vid.mp4'
// load video statically
// video.keyboard.src = video_location
// console.log(video.keyboard)

// load text as a blob
let URL = window.URL
// let data = 'testing data here'

// let text = new Blob([data],{type: 'text/plain'})
// let value = URL.createObjectURL(text)


// blob with a video file 
let url = './media/keyboard-vid.mp4';
const xml = new XMLHttpRequest()
const method = 'GET'

xml.open(method,url)
xml.responseType = 'arraybuffer';

// xml.onload = () => {
//     let blob = new Blob([xml.response])
//     let url = URL.createObjectURL(blob)
//     video.keyboard.src=url
//     video.keyboard.play()
    
// }
    xml.onload = () => {
        video.all.forEach(vid=>{
            console.log(vid)
            let blob = new Blob([xml.response])
            let url = URL.createObjectURL(blob)
            console.log(url)
            vid.src=url
            vid.play()
        })
    }

xml.send()


