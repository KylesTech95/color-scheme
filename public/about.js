import {animateControlParts} from './components/control.js'
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
const labels = document.querySelectorAll('.label-container')
const media_features = document.querySelectorAll('.feat')
const mediaArr = ['keyboard-vid.mp4','hex-vid.mp4','mobile-vid.mp4','desktop-view.png']
// console.log(media_features)
// console.log(mediaArr)
media_features.forEach((feat,index)=>{
    const directory = 'media/'
    let path = directory + mediaArr[index];
    let ext = mediaArr[index].slice(-3)
    feat.src = path;

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
            e.target.style=`z-index:999;opacity:1;${'transform:scale(1.5)'};`
            // console.log(labels[index])
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
            e.target.style='z-index:998;opacity:.5;transform:scale(1)';

        }
    }      
})


const controlParts = document.querySelectorAll('.control-part')

animateControlParts(controlParts)