import configureMidLine from './components/midline.js'
import createInput from './components/createinput.js'
import shaveUl from './components/shaveul.js';
import blink from './components/blink.js';
import { rgbToHex, setRGBAndHex } from './components/rgbconversions.js';
import { copyColor,copyMessagePop } from './components/copymachine.js';
import { clickInput } from './components/clickinput.js';
import { makeWhiteColor } from './components/makewhite.js';
import {postFn,postfetch} from './components/post.js'

const newHR = document.createElement('hr')
const wrapper = document.getElementById('wrapper')
const spot = document.querySelector('.choice-spot')
const ch_container = document.getElementById('choice-container')
const scrolls = document.querySelectorAll('#scroll-container>.scroll')
const pal_container = document.querySelector('.color-pal-list-container')
const allContainers = document.querySelectorAll('.color-pal-list-container')
const palID = document.getElementById('color-pal-container')
const hashPal = document.getElementById('color-pal')
const copy = document.querySelector('.copy-icon')
const copy_message = document.querySelector('#copy-message')
const midline = document.getElementById('mid-line');
const fingers = document.querySelectorAll('.hover-span')
const btnPal = document.querySelector('.option-2')
const allBtns = document.querySelectorAll('.pal-btn')
const mainTitle = document.getElementById('title-main')

let idCount = 0;
let destination = palID.clientHeight-115
let scroll_arr=[]
let arr_of_arrs = []
let noClick = false;
let scroll_dir;


mainTitle.style.left = document.body.clientWidth/2+"px"
function detectMob() {
    return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
  }
//____________________________
// objects
const mid_obj = {
    width:`100%`,
    border: `3px solid transparent`,
    top:`top: ${screen.height/2}px`,
    position:`fixed`,
    z_index:1
}
const res = {
    color: document.querySelector(".result-color>h4"),
    hex: document.querySelector(".result-hex>h4")
}
//____________________________
//functions
const hoverEffect = (scroll) => {
    scroll.classList.add('hover-effect')
    setTimeout(()=>{
        scroll.classList.remove('hover-effect')
    },250)
}
const appear = (input) => {
    input.classList.remove('hidden')
} 
// give HR element some attributes (midline)
configureMidLine(mid_obj,midline)

// rotate colors process:
// 1) Rotate Right
const rotateRight = (scroll) => {
    let sp = spot;
    scroll.addEventListener('click', e => {
    idCount+=1;
    if(idCount>4096)idCount=1;
    // // // console.log(idCount)
    // create input
    const input = document.createElement('input')
    input.classList.add('color-input')
    fetch(`/colors/${idCount}`).then(res=>res.json()).then(data=>{
    createInput(input,data,idCount,false)
    // listenValue(input)
    sp.append(input)
            // disappear(input)
    appear(input)
    clickInput(input)
    makeWhiteColor(data.current_color,input,copy)
    shaveUl(sp)
    let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
    rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
    // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
    
    // // // console.log(rgbColor)

    setRGBAndHex(res,data,rgbColor)
        })
    })
    window.addEventListener('keydown',e=>{
        if(/ArrowRight/.test(e.key)){
        hoverEffect(scroll)
        idCount+=1;

        if(idCount>4096)idCount=1;
        // // // console.log(idCount)
        const input = document.createElement('input')
        input.classList.add('color-input')
        fetch(`/colors/${idCount}`).then(res=>res.json()).then(data=>{
        createInput(input,data,idCount,false)
        // listenValue(input)
        sp.append(input)
        clickInput(input)
        makeWhiteColor(data.current_color,input,copy)
        shaveUl(sp)
        // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
            let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
        // // // console.log(rgbColor)
        setRGBAndHex(res,data,rgbColor)
        })
      }
    })
}
// 2) Rotate Left
const rotateLeft = (scroll) => {
    let sp = spot;
    scroll.addEventListener('click', e => {
    idCount-=1;
    if(idCount<1)idCount=4096;
    // // // console.log(idCount)

    const input = document.createElement('input')
    input.classList.add('color-input')
    fetch(`/colors/${idCount}`).then(res=>res.json()).then(data=>{
    createInput(input,data,idCount,false)
    // listenValue(input)
    sp.append(input)
    clickInput(input)
    // disappear(input)
    appear(input)
    makeWhiteColor(data.current_color,input,copy)
    shaveUl(sp)

    // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
    let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
    // // // console.log(rgbColor)
    rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
    setRGBAndHex(res,data,rgbColor)
        })
    })
    window.addEventListener('keydown',e=>{
        if(/ArrowLeft/.test(e.key)){
        hoverEffect(scroll)

        idCount-=1;
        if(idCount<1)idCount=4096;
        // // // console.log(idCount)
        const input = document.createElement('input')
        input.classList.add('color-input')
        fetch(`/colors/${idCount}`).then(res=>res.json()).then(data=>{
            createInput(input,data,idCount,false)
            // listenValue(input)
            sp.append(input)
            clickInput(input)
            makeWhiteColor(data.current_color,input,copy)
            shaveUl(sp)
            // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
            let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
            // // // console.log(rgbColor)
            setRGBAndHex(res,data,rgbColor)
        })
      }
  })
}
// switch statement when clicking left and right arrows
const clickScrolls = () => {
    scrolls.forEach((scroll,index)=>{
        switch(true){
            case index%2==0:
                return rotateLeft(scroll);
            break;
            case index%2!==0:
                return rotateRight(scroll);
            break;
            default:
                // // console.log(undefined);
                return undefined;
            break;
        }
    })

}

// XML HTTP REQUEST
const xml = new XMLHttpRequest;
const method = 'GET'
const url = '/colors'
let last_index = 0;
let rang = []
let current_index;
let percentage = .25
let control = .5;
let deviceTypeControl = .5

// open xml & send
xml.open(method,url,true)
xml.send()
// parse xml data
function parse(){
    // console.log('you are parsing data!')
    const data = JSON.parse(xml.responseText)
    const myData = (data.colors)
    current_index = [...myData].length * percentage
    let d1 = [...myData].slice(last_index,current_index)
    // // console.log(d1)
    last_index = current_index;
    percentage+=deviceTypeControl
    d1.forEach((col,index) => {
        const li = document.createElement('li')
        li.classList.add('.color-pal-list-item')
        li.setAttribute('style',`
                background:${col.color};
                --webkit-background:${col.color};
                height:25px;
                width:25px;
                border:.5px solid #fff;
                transition:.25s;
                z-index:999;
                `)
        li.classList.add('hover-li')
        // push li into arrow
            rang.push(li)
        if(!detectMob()){
            li.addEventListener('mouseover',e=>{
                let rgbColor = e.target.style.background.replace(/\(|\)|rgb/g,'').split(",")
                // // console.log(rgbColor)
                idCount=index+1
                // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                    setRGBAndHex(res,e.target,rgbColor,true)
                // identify rgb input
                const input = document.createElement('input')
                input.style.background = col.color;
                createInput(input,col,idCount,true)
                // listenValue(input)
                spot.append(input)
                clickInput(input)
                shaveUl(spot)
                makeWhiteColor(col.color,input,copy)
                    
            })
        }
        else{
            li.addEventListener('touchstart',e=>{
                let rgbColor = e.target.style.background.replace(/\(|\)|rgb/g,'').split(",")
                // // console.log(rgbColor)
                idCount=index+1
                // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                    setRGBAndHex(res,e.target,rgbColor,true)
                // identify rgb input
                const input = document.createElement('input')
                input.style.background = col.color;
                createInput(input,col,idCount,true)
                // listenValue(input)
                spot.append(input)
                clickInput(input)
                shaveUl(spot)
                makeWhiteColor(col.color,input,copy)
                    
            })
        }
        
        li.addEventListener('click',async e=>{
            // identify rgb input
            const input = document.createElement('input')
            input.style.background = col.color;
            createInput(input,col,idCount,true)
            // listenValue(input)
            spot.append(input)
            clickInput(input)
            shaveUl(spot)
            makeWhiteColor(col.color,input,copy)
            copyColor(input)
            copyMessagePop(midline,spot,copy_message)
        })
    
    }) 
    for(let i in rang){
        pal_container.append(rang[i])
    }
    rang = []
}
const restoreTile = elem => {
    elem.classList.remove('no-pointer')
    elem.style.opacity=1;
}
const bringTilesBack =  (container) => {
    let allLi = [...container.children]
    if(allLi){
        allLi.reduce((a,b)=>b.classList.contains('no-pointer') && (b.getBoundingClientRect().y <= newHR.getBoundingClientRect().y) ? restoreTile(b) : null)
        control+=.01
    }
}


const partialParse = arr => {
    let containers = [...arr];
    const data = JSON.parse(xml.responseText)
    let myData = (data.colors)
    myData = myData.sort((a,b)=>{
        let aColor = a.color.split(/\(|\)/).filter(x=>x&&x!=='rgb')
        let bColor = b.color.split(/\(|\)/).filter(x=>x&&x!=='rgb')
        if(aColor[0]==bColor[0]&&aColor[1]==bColor[1]){
            return 1;
        }
        else{
            return -1;
        }
    })
    // console.log(myData)
    
    let quotient = myData.length/4
    for(let i = 0; i < myData.length; i+=quotient){
        arr_of_arrs.push(myData.slice(i,i+quotient))
    }

    containers.forEach((container,index) => {
        for(let j = 0; j < arr_of_arrs.length; j++){
            if(j==index){
                let array = []
                let data = arr_of_arrs[j];
                // console.log(data)
                data.forEach((col,index) => {
                    const li = document.createElement('li')
                    li.classList.add('.color-pal-list-item')
                    li.setAttribute('style',`
                            background:${col.color};
                            --webkit-background:${col.color};
                            height:50px;
                            width:50px;
                            border:.5px solid #fff;
                            transition:.25s;
                            z-index:999;
                            `)
                    // push li into arrow
                        array.push(li)
                    if(!detectMob()){
                        li.addEventListener('mouseover',e=>{
                            let rgbColor = e.target.style.background.replace(/\(|\)|rgb/g,'').split(",")
                            // // console.log(rgbColor)
                            idCount=index+1
                            // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                                setRGBAndHex(res,e.target,rgbColor,true)
                            // identify rgb input
                            const input = document.createElement('input')
                            input.style.background = col.color;
                            createInput(input,col,idCount,true)
                            // listenValue(input)
                            spot.append(input)
                            clickInput(input)
                            shaveUl(spot)
                            makeWhiteColor(col.color,input,copy)
                                
                        })
                    }
                    else{
                        li.addEventListener('touchstart',e=>{
                            let rgbColor = e.target.style.background.replace(/\(|\)|rgb/g,'').split(",")
                            // // console.log(rgbColor)
                            idCount=index+1
                            // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                                setRGBAndHex(res,e.target,rgbColor,true)
                            // identify rgb input
                            const input = document.createElement('input')
                            input.style.background = col.color;
                            createInput(input,col,idCount,true)
                            // listenValue(input)
        
                            spot.append(input)
                            clickInput(input)
                            shaveUl(spot)
                            makeWhiteColor(col.color,input,copy)
                                
                        })
                    }
                    
                    li.addEventListener('click',async e=>{
                        // identify rgb input
                        const input = document.createElement('input')
                        input.style.background = col.color;
                        createInput(input,col,idCount,true)
                        // listenValue(input)
                        spot.append(input)
                        clickInput(input)
                        shaveUl(spot)
                        makeWhiteColor(col.color,input,copy)
                        copyColor(input)
                        copyMessagePop(midline,spot,copy_message)
                    })
                
                }) 
                // console.log(array)
                for(let k=0;k<array.length;k++){
                    container.appendChild(array[k])
                }
            }
        }        
    })
}
if(window.innerWidth >= 1000){
    xml.onload = () => parse()   
}
else{
    xml.onload = () => partialParse(allContainers)
}
pal_container.onscroll = (e) => {
    let top = e.target.scrollTop;
    let height = e.target.scrollHeight;
    let palHeight = e.target.clientHeight;
    scroll_arr.push(top)
    scroll_arr = scroll_arr.slice(-2)
    let copy = [...scroll_arr].map(String)
    const upward = () => top < scroll_arr[scroll_arr.length-2]
    const downward = () => top > scroll_arr[scroll_arr.length-2]
    // if current scroll is less than array's 2nd-to-last index, GO UP
    if(upward()&&top>10){
        if((copy[0].length) > 2 && (copy[1].length) < 2){
            return null;
        }
        else{
            control-=.1
        }
    
    }
    // if top scroll is less than array's 2nd-to-last index, GO DOWN
    if(downward()){
        if(((top) >= height*(control))){
            if(window.innerWidth >= 1000){parse()}
            bringTilesBack(pal_container)
        }
    }
}

//___________________________
// spot-container event listeners 
if(!detectMob()){
    spot.addEventListener('mouseover',e=>{
        // // console.log(copy)
        copy.classList.remove('copy-current')
        copy.classList.add('copy-hover')
    })
    spot.addEventListener('mouseout',e=>{
        // // console.log(copy)
        copy.classList.add('copy-current')
        copy.classList.remove('copy-hover')
    })
}
//___________________________________________
//API - combine numbers (sum)
//sum api
// const inputs = document.querySelectorAll(".num-input")
// const resActual = document.querySelector('.result-actual')
// const submit_btn = document.getElementById('submit-btn')
// const post = '/post-sum-fn'
// const get = '/get-sum-fn';

// send/receive requests from server
// submit_btn.addEventListener('click',e=>{
//     e.preventDefault();
//     // post request
//     postFn(post,{a:inputs[0].value,b:inputs[1].value}).then(data=>{
// //         // // console.log(data.result)
//         resActual.textContent = data.result;
//     })
//     // settimeout for get request
//    setTimeout(()=>{
//      //get request
//      fetch(get).then(res=>res.json()).then(data=>{
// //         // console.log(data)
//     })
//    },500)

//     return [...inputs].forEach(inp=>{
//         inp.value = ''
//     })
// })
// clear database function
// async function clearFn(){
//     let ft = await fetch('/cleared')
// //     // console.log('db cleared!')
//     resActual.textContent = 0;
// }

// scroll event listener
window.addEventListener('scroll',e=>{
// compare current scroll and previous scroll
    noClick = true;
    let current = window.scrollY;
        scroll_arr.push(current)
        // if current scroll is less than array's 2nd-to-last index, GO UP
        if(current < scroll_arr[scroll_arr.length-2]){
            // // console.log('going up')
            scroll_dir = true
        }
        // if current scroll is less than array's 2nd-to-last index, GO DOWN
        if(current > scroll_arr[scroll_arr.length-2]){
            // // console.log('going down')
            scroll_dir = false
        }
        // force scroll
        if(!scroll_dir && (midline.getBoundingClientRect().y < spot.getBoundingClientRect().y && midline.getBoundingClientRect().y > spot.getBoundingClientRect().y-10)){
            window.scrollTo(palID.offsetLeft,destination)
            blink(fingers[1])
            
        }
        if(scroll_dir && (midline.getBoundingClientRect().y > spot.getBoundingClientRect().y&&midline.getBoundingClientRect().y < spot.getBoundingClientRect().y+2) ){
            window.scrollTo(0,0)   
            blink(fingers[0])   
        }
})
let btn_top = document.querySelector('.nav-btn-top')
const nav = document.querySelector('#nav-container')
const navActual = nav.children[0]
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
const result_container = document.getElementById('result-container')
if(window.innerWidth < 1000){
    btnPal.classList.remove('no-item')
    wrapper.removeChild(palID)
     ch_container.appendChild(palID)
     percentage = .125;
     deviceTypeControl = .175
     let c = 0;
     function pressBtnPal(event){
        let target = event.target
        allBtns.forEach((bb,i)=>{
            if(bb!==target){
                allContainers[i].classList.add('no-item')
                allContainers[i].classList.remove('flex-item')  
                bb.classList.remove('red-bg')
                bb.classList.add('blk-bg')
                bb.classList.remove('pal-btn-starting-hover')
                bb.textContent='PRESS ME'
            }
            else{
                allContainers[i].classList.remove('no-item')
                allContainers[i].classList.add('flex-item')
                bb.classList.remove('blk-bg')
                bb.classList.add('pal-btn-starting-hover')
                bb.classList.add('red-bg')
                bb.textContent = 'PRESSED'
                window.navigator.vibrate(150) // After touch vibrate for 150ms
            }
        })
     }
     allBtns.forEach(btn=>{
        btn.addEventListener('click',pressBtnPal)
     })
}
else{
    btnPal.classList.add('no-item')
    clickScrolls()
}
// spot-container: add event listener (click) to show "coppied!" consistently
spot.addEventListener('mouseover',e=>{
    const input = document.querySelector('.color-input')
    try{
        if(e.target.classList.contains('color-input')){
            // console.log('you clicked input')
            copyMessagePop(midline,spot,copy_message)
            copyColor(input)
        }
    }
    catch(err){
        err = 'this is not the input you are looking for'
        // console.log(err)
    }
})

