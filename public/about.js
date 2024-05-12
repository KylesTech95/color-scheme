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


// set media src's
const media_features = document.querySelectorAll('.feat')
const mediaArr = ['keyboard-vid.mp4','hex-vid.mp4','mobile-vid.mp4','desktop-view.png']
// console.log(media_features)
// console.log(mediaArr)
media_features.forEach((feat,index)=>{
    const directory = 'media/'
    let path = directory + mediaArr[index];
    let ext = mediaArr[index].slice(-3)
    // let blob = new Blob([path],{type:/mp4/.test(ext) ? 'video/mp4' : 'image/png'})

// const xml = new XMLHttpRequest()
// xml.open('GET',path,true)
// xml.responseType='blob'
// xml.onload = e =>{ 
// let blob = new Blob([xml.response],{type:/mp4/.test(ext) ? 'video/mp4' : 'image/png'})

// // console.log(file)
// // console.log(blob)
// let URL = window.URL||window.webkitURL
// const blobURL = URL.createObjectURL(blob)//replace(/http/,'https')
// console.log(blobURL)
// feat.src = blobURL
    feat.src = path;
// xml.send();
// xml.onreadystatechange = () => {
//     if(xml.readyState == xml.HEADERS_RECEIVED){
//         let contentType = xml.getResponseHeader("Content-Type")
//         console.log(contentType)
//     }
// }
    // videos in array
    if(/mp4/.test(ext)){
        // feat.autoplay=true;
        feat.loop=true;
        feat.muted=true;
    }
    //result 
    feat.src = path;
    feat.onclick=e=>{
        if(/mp4/.test(ext)&&e.target.muted){
            e.target.play();
            e.target.classList.remove('video-paused');
            e.target.style.opacity = 1;
        }
    }
    feat.onmouseover=e=>{
        if(/mp4/.test(ext)){
            e.target.style.opacity = .5;
        }
 
    }
    feat.onmouseout=e=>{
        if(/mp4/.test(ext)){
            e.target.pause();
            e.target.classList.add('video-paused')
            e.target.style.opacity = 1;
        }
    }      
})
