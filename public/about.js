import {animateControlParts} from './components/control.js'
import { closeNavWindowClick } from './components/closenav.js'

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
const mediaArr = ['keyboard-vid.mp4','hex-vid.mp4','mobile-vid.mp4','desktop-view.mp4']
// remove controls for ios
const videos = document.querySelectorAll('.video-feature')
videos.forEach(vid=>{
    vid.controls=false
})



const toggle = (e) => {
    if(e.paused) {
        e.play();
        e.classList.remove('video-paused');
        e.parentElement.style='z-index:999;opacity:1; border:.25rem double lime; transition:.25s;';
        e.controls=false;

    }
    else{
        e.pause();
        e.classList.add('video-paused');
        e.parentElement.style='z-index:999;opacity:.75;border:.25rem double red; transition:.75s;';
        e.controls=false;

    }
}
//_____________________________________
const handleMobileClick = e =>{ 
    if(/mp4/.test(e.target.src.slice(-3))){
        // e.target.play();
        // e.target.classList.remove('video-paused');
        toggle(e.target)
    }
}
const mobileEvents = (ev) => {
    if(ev){
        ev.addEventListener('touchstart',handleMobileClick)
   }
    
}
media_features.forEach((feat,index)=>{
    const directory = 'media/'
    let path = directory + mediaArr[index];
    let ext = mediaArr[index].slice(-3)
    feat.src = path;

    // videos in array
    if(/mp4/.test(ext)){
        feat.loop=true;
        feat.muted=true;
    }
    //result 
    feat.src = path;
    // if device width is graeater than 1000px
    if(window.innerWidth > 1000){
        feat.onclick=e=>{
            console.log('video touched')
            console.log(ext)
            if(/mp4/.test(ext)&&e.target.paused){
                e.target.play();
                e.target.controls=false;
                e.target.classList.remove('video-paused');
                e.target.parentElement.style='z-index:999;opacity:1; border:.25rem double lime; transition:.25s;';
                e.target.style=`${'transform:scale(1.5)'};`
            }
        }
        feat.onmouseover=e=>{
            if(/mp4/.test(ext)){
                e.target.parentElement.style.opacity = .75;
            }
        }
        feat.onmouseout=e=>{
            if(/mp4/.test(ext) && !feat.paused){
                e.target.pause();
                e.target.controls=false;
                e.target.classList.add('video-paused')
                e.target.parentElement.style='z-index:998;opacity:1; border:.25rem double red; transition:.25s;';
                e.target.style='transform:scale(1);'
    
            }
            else{
                e.target.parentElement.style.opacity = 1;
            }
        }  
    }   
    // if the device width is less than 1000px
    else{
        // detect mobile events
        mobileEvents(feat)
    } 
})

const controlParts = document.querySelectorAll('.control-part')

animateControlParts(controlParts)


// nav config
let btn_top = document.querySelector('.nav-btn-top')
const nav = document.querySelector('#nav-container')
const navActual = nav.children[0]
closeNavWindowClick(nav,navActual,btn_top)
function toggleFn(){
    if(nav.classList.contains('base')){
        nav.classList.remove('base')
        nav.classList.add('full')
        navActual.classList.remove('hidden-item')
        btn_top.classList.remove('hidden-item')
    }
}
nav.addEventListener('click',toggleFn)
function closeNav(){
    nav.classList.add('base')
    nav.classList.remove('full')
    navActual.classList.add('hidden-item');
    btn_top.classList.add('hidden-item')
}
btn_top.addEventListener('click',closeNav)
const navArr = document.querySelectorAll('.nav-item>a')
navArr.forEach((item,i)=>{
    if(i==0){
        item.addEventListener('click',e=>{
            blink(fingers[0])
        })
    }
    if(i==1){
        item.addEventListener('click',e=>{
            blink(fingers[1])
        })
    }
})

// scroll window to top of webpage on load
if(window.location.href==window.location.origin+'/about'){
    window.onbeforeunload = function () {
        window.scrollTo(0,0);
    };
}


// scroll & shift'
const features_container = document.querySelector('.feature-div-container')
window.onload = e =>{
    features_container.parentElement.scrollTo(0,0)
}