import configureMidLine from './components/midline.js'
import createInput from './components/createinput.js'
import shaveUl from './components/shaveul.js';
import blink from './components/blink.js';
import { rgbToHex, setRGBAndHex } from './components/rgbconversions.js';
import { copyColor,copyMessagePop } from './components/copymachine.js';
import { clickInput } from './components/clickinput.js';
import { makeWhiteColor } from './components/makewhite.js';
// import {postFn,postfetch} from './components/post.js'

const spot = document.querySelector('.choice-spot')
const insert_btn = document.getElementById('insert-color')
const scrolls = document.querySelectorAll('#scroll-container>.scroll')
const pal_container = document.querySelector('.color-pal-list-container')
const palID = document.getElementById('color-pal-container')
let copy = document.querySelector('.copy-icon')
const copy_message = document.querySelector('#copy-message')
const midline = document.getElementById('mid-line');
const fingers = document.querySelectorAll('.hover-span')
let idCount = 0;
let destination = palID.clientHeight-115
let scroll_arr=[]
let scroll_dir;

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
// spot-container: add event listener (click) to show "coppied!" consistently
window.addEventListener('click',e=>{
    if(e.target.classList.contains('color-input')){
        console.log('you clicked input')
        copyMessagePop(midline,spot,copy_message)
    } 
})
// give HR element some attributes (midline)
configureMidLine(mid_obj,midline)

// rotate colors process:
// 1) Rotate Right
const rotateRight = (scroll) => {
    let sp = spot;
    scroll.addEventListener('click', e => {
    idCount+=1;
    if(idCount>4096)idCount=1;
    // // console.log(idCount)
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
    
    // // console.log(rgbColor)

    setRGBAndHex(res,data,rgbColor)
        })
    })
    window.addEventListener('keydown',e=>{
        if(/ArrowRight/.test(e.key)){
        hoverEffect(scroll)
        idCount+=1;

        if(idCount>4096)idCount=1;
        // // console.log(idCount)
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
        // // console.log(rgbColor)
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
    // // console.log(idCount)

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
    // // console.log(rgbColor)
    rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
    setRGBAndHex(res,data,rgbColor)
        })
    })
    window.addEventListener('keydown',e=>{
        if(/ArrowLeft/.test(e.key)){
        hoverEffect(scroll)

        idCount-=1;
        if(idCount<1)idCount=4096;
        // // console.log(idCount)
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
            // // console.log(rgbColor)
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
                // console.log(undefined);
                return undefined;
            break;
        }
    })

}
clickScrolls()

//____________________________
// post fetch Fn
// const postfetch = async(api,d) => {
//     const response = await fetch(api,
//     {
//       method:'POST',
//       mode:"cors",
//       cache:"no-cache",
//       credentials: "same-origin", // include, *same-origin, omit
//       headers: { "Content-Type": "application/json"},
//       redirect: "follow", // manual, *follow, error
//       referrerPolicy: "no-referrer",
//       body:JSON.stringify(d),
//     })
//     // testing postFetch
//     return response.json()
// }
// let r,g,b,colour;
// let arr = []
// for(let i=0; i < 1<<12; i++) {
//     r = ((i>>8) & 0xf) * 0x11;
//     g = ((i>>4) & 0xf) * 0x11;
//     b = (i & 0xf) * 0x11;
//     colour = "rgb("+r+","+g+","+b+")";
// //     // console.log(colour)
//     arr.push(colour)
    
// }
// // console.log(arr)

// insert_btn.style.left = `${document.body.clientWidth/2}px`
// insert_btn.addEventListener('click', e => {
//     postfetch('/colors-insert',{rgb:[...arr]}).then((data)=>{
//         return data.color
//     })
// })


// fill color palette
fetch('/colors').then(res=>res.json()).then(data=>{ // data
// // console.log(data.colors)
let arr = [], arr_inv = [];
data.colors.forEach((col,index) => {

    const li = document.createElement('li')
    li.classList.add('.color-pal-list-item')
    li.setAttribute('style',`
            background:${col.color};
            opacity:.9;
            height:25px;
            width:25px;
            border:.5px solid #fff;
            transition:.25s;
            z-index:999;
            `)
    li.classList.add('hover-li')
    // push li into arrow
        arr.push(li)
    if(detectMob()){
        li.addEventListener('mouseover',e=>{
            let rgbColor = e.target.style.background.replace(/\(|\)|rgb/g,'').split(",")
            // console.log(rgbColor)
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
// append items in pallette container
for(let i in arr){
    pal_container.append(arr[i])
}
})
//___________________________
// spot-container event listeners 
if(detectMob()){
    spot.addEventListener('mouseover',e=>{
        // console.log(copy)
        copy.classList.remove('copy-current')
        copy.classList.add('copy-hover')
    })
}
spot.addEventListener('mouseout',e=>{
    // console.log(copy)
    copy.classList.add('copy-current')
    copy.classList.remove('copy-hover')
})
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
//         // // console.log(data.result)
//         resActual.textContent = data.result;
//     })
//     // settimeout for get request
//    setTimeout(()=>{
//      //get request
//      fetch(get).then(res=>res.json()).then(data=>{
//         // console.log(data)
//     })
//    },500)

//     return [...inputs].forEach(inp=>{
//         inp.value = ''
//     })
// })
// clear database function
// async function clearFn(){
//     let ft = await fetch('/cleared')
//     // console.log('db cleared!')
//     resActual.textContent = 0;
// }

// scroll event listener
let noClick = false;
window.addEventListener('scroll',e=>{
// compare current scroll and previous scroll
    noClick = true;
    let current = window.scrollY;
        scroll_arr.push(current)
        // if current scroll is less than array's 2nd-to-last index, GO UP
        if(current < scroll_arr[scroll_arr.length-2]){
            // console.log('going up')
            scroll_dir = true
        }
        // if current scroll is less than array's 2nd-to-last index, GO DOWN
        if(current > scroll_arr[scroll_arr.length-2]){
            // console.log('going down')
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
