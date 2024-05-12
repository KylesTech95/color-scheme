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
console.log(media_features)
console.log(mediaArr)
media_features.forEach((feat,index)=>{
    let path = 'media/'+ mediaArr[index];
    let ext = mediaArr[index].slice(-3)

    // videos in array
    if(/mp4/.test(ext)){
        feat.autoplay=true;
        feat.look=true;
        feat.muted=true;
    }
    //result 
    feat.src = path;
    if(/mp4/.test(ext)&&feat.muted){
        feat.play()
    }
    
})
