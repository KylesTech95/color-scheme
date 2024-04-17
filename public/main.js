let r,g,b,colour;
const spot = document.querySelector('.choice-spot')
const insert_btn = document.getElementById('insert-color')
const scrolls = document.querySelectorAll('#scroll-container>.scroll')
const inputs = document.querySelectorAll(".num-input")
const resActual = document.querySelector('.result-actual')
const submit_btn = document.getElementById('submit-btn')
const pal_container = document.querySelector('.color-pal-list-container')
const pal_spot = document.querySelector('.color-pal-spot-container');
const palID = document.getElementById('color-pal-container')
let copy = document.querySelector('.copy-icon')
const copy_message = document.querySelector('#copy-message')
const midline = document.getElementById('mid-line');
const mid_obj = {
    width:`100%`,
    border: `3px solid red`,
    top:`top: ${screen.height/2}px`,
    position:`fixed`
}
let idCount = 0;
let click = 0;
const post = '/post-sum-fn'
const get = '/get-sum-fn'
const res = {
    color: document.querySelector(".result-color>h4"),
    hex: document.querySelector(".result-hex>h4")
}
const configureMidLine = (mid) => {
console.log(mid)
mid.style = `width:${mid_obj.width};position:${mid_obj.position};border:${mid_obj.border};top:${mid_obj.top};`
}
configureMidLine(midline)

    let destination = palID.clientHeight-105
    let scroll_arr=[]
    let scroll_dir;
    window.addEventListener('scroll',e=>{
    // compare current scroll and previous scroll

        let current = window.scrollY;
            scroll_arr.push(current)
            // if current scroll is less than array's 2nd-to-last index, GO UP
            if(current < scroll_arr[scroll_arr.length-2]){
                console.log('going up')
                scroll_dir = true
            }
            // if current scroll is less than array's 2nd-to-last index, GO DOWN
            if(current > scroll_arr[scroll_arr.length-2]){
                console.log('going down')
                scroll_dir = false
            }
            
            // force scroll
            if(!scroll_dir && midline.getBoundingClientRect().y < spot.getBoundingClientRect().y && midline.getBoundingClientRect().y > spot.getBoundingClientRect().y-spot.clientHeight){
                window.scrollTo(palID.offsetLeft,destination)
                
            }
            if(scroll_dir && midline.getBoundingClientRect().y > spot.clientHeight + spot.getBoundingClientRect().y){
                window.scrollTo(0,0)      
            }
    })

// create input function
const createInput = (input,data,bool) => {
    if(!bool){
        console.log(data)
        input.style.background = data.current_color;
        input.classList.add('color-input')
        input.setAttribute('type','text')
        // input.setAttribute('disabled','true')
            input.setAttribute('autocomplete','off')
            input.setAttribute('spellcheck','false')
        input.setAttribute('value',data.current_color)
    }
    else{
        console.log(data)
        input.style.background = data.color;
        input.classList.add('color-input')
        input.setAttribute('type','text')
        // input.setAttribute('disabled','true')
        input.setAttribute('autocomplete','off')
        input.setAttribute('spellcheck','false')
        input.setAttribute('value',data.color)
        }
    
}
// post request helper
const postFn = async (post,d) => {
        let response = await fetch(post,{
            method:'POST',
            mode:"cors",
            cache:"no-cache",
            credentials: "same-origin",
            headers:{"Content-Type":"application/json"},
            redirect:"follow",
            referrerPolicy:"no-referrer",
            body:JSON.stringify(d)
        })
        return response.json();
}
// Isolate all children within spot-container, and remove the child(input)
const shaveUl = (spot) => {
     let arr = [...spot.children].filter(child=>child.type==='text')    // filter all inputs for type = text
     let cp = document.querySelector('.choice-spot')     // select choice spot div
     let cparr = [...cp.children].filter(child=>child.type==='text')  // filter all inputs for type = text
     for(let i = 0; i < cparr.length; i++){
        if(cparr[i]==arr[i]){   // if items in cparr == arr   
            if(i!==cparr.length-1){//if i is -ne (not equal) to last item in cparr
                spot.removeChild(arr[i])// remove the child
            }
        }
     }
}
// helper function formats number to hex
const rgb2Hex = (n) => {
const hex = n.toString(16)
return hex.length < 1 ?  `0${hex}`:hex
}
// function that converts number to hex with 3 arguments (r,g,b)
const rgbToHex = (r, g, b) => {
    // // console.log(`#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`)
    return `#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`;
}
// executive function to set html elements style attributes
const setRGBAndHex = (res,data,rgbColor,bool) => {
    if(!bool){
    // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
    res.color.textContent = data.current_color
    res.hex.textContent = rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2]);
    res.color.style.color = data.current_color
    res.hex.style.color = data.current_color
    }
    else{
        res.color.textContent = data.style.background
        res.hex.textContent = rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2]);
        res.color.style.color = data.style.background
        res.hex.style.color = data.style.background
    }
}
const hoverEffect = (scroll) => {
    scroll.classList.add('hover-effect')
    setTimeout(()=>{
        scroll.classList.remove('hover-effect')
    },250)
}
const appear = (input) => {
    input.classList.remove('hidden')
}
// copy color with navigatior's clipboard.writeText() function
const copyColor = async(inp) => {
        try {
          await navigator.clipboard.writeText(inp.value);
        //   console.log('Content copied to clipboard');
        } catch (err) {
        //   console.error('Failed to copy: ', err);
        }
      
} 
// copy message appears when new color is clicked(in spot-container)
const copyMessagePop = () => {
    copy_message.classList.remove('coppied-message-hidden')
    copy_message.classList.add('coppied-message')
    setTimeout(()=>{
    copy_message.classList.add('coppied-message-hidden')
    copy_message.classList.remove('coppied-message')
    },750)
}
// input click event
const clickInput = (input) => {
    input.onclick=e=>{
        // // console.log(e.target)
        input.setAttribute('onclick',"return false;")
        input.setAttribute('onkeydown',"return false;")
        copyColor(input)
    }
}   
// spot-container: add event listener (click) to show "coppied!" consistently
window.addEventListener('click',e=>{
    if(e.target.classList.contains('color-input')) copyMessagePop()
})
// turn input's color white 
// turn copy-icon white
const makeWhiteColor = (data,input) => {
    // if r & g are less-than or equal to 100
    if(/[0-100],[0-100]|[0-100],/.test(data)){
        input.classList.add('light-color');
        copy.classList.remove('copy-dark')
        copy.classList.add('copy-white')
        copy.classList.remove('hidden')

    }
    else{
        input.classList.remove('light-color');
        copy.classList.add('copy-dark')
        copy.classList.remove('copy-white')
        copy.classList.remove('hidden')
    }
}
// post fetch Fn
const postfetch = async(api,d) => {
    const response = await fetch(api,
    {
      method:'POST',
      mode:"cors",
      cache:"no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: { "Content-Type": "application/json"},
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body:JSON.stringify(d),
    })
    // testing postFetch
    return response.json()
}
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
    createInput(input,data)
    sp.append(input)
            // disappear(input)
    appear(input)
    clickInput(input)
    makeWhiteColor(data.current_color,input)
    shaveUl(sp)
    // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
    // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
    let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
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
        createInput(input,data)
        sp.append(input)
        clickInput(input)
        makeWhiteColor(data.current_color,input)
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
    createInput(input,data)
    sp.append(input)
    clickInput(input)
    // disappear(input)
    appear(input)
    makeWhiteColor(data.current_color,input)
    shaveUl(sp)

    // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
    let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
    // // console.log(rgbColor)
    // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
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
            createInput(input,data)
            sp.append(input)
            clickInput(input)
            makeWhiteColor(data.current_color,input)
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


//________________________________________

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
fetch('/colors').then(res=>res.json()).then(data=>{
// // console.log(data.colors)
let arr = []
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
    li.addEventListener('mouseover',e=>{
        let rgbColor = e.target.style.background.replace(/\(|\)|rgb/g,'').split(",")
        // console.log(rgbColor)
        idCount=index+1
        // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
            setRGBAndHex(res,e.target,rgbColor,true)
        // identify rgb input
        const input = document.createElement('input')
        input.style.background = col.color;
        createInput(input,col,true)
        spot.append(input)
        clickInput(input)
        shaveUl(spot)
        makeWhiteColor(col.color,input)
            
    })
})
// append items in pallette container
for(let i in arr){
    pal_container.append(arr[i])
}
})
//___________________________
// spot-container event listeners 
spot.addEventListener('mouseover',e=>{
    // console.log(copy)
    copy.classList.remove('copy-current')
    copy.classList.add('copy-hover')
})
spot.addEventListener('mouseout',e=>{
    // console.log(copy)
    copy.classList.add('copy-current')
    copy.classList.remove('copy-hover')
})

//___________________________________________
//API - combine numbers (sum)
// send/receive requests from server
submit_btn.addEventListener('click',e=>{
    e.preventDefault();
    // post request
    postFn(post,{a:inputs[0].value,b:inputs[1].value}).then(data=>{
        // // console.log(data.result)
        resActual.textContent = data.result;
    })
    // settimeout for get request
   setTimeout(()=>{
     //get request
     fetch(get).then(res=>res.json()).then(data=>{
        // console.log(data)
    })
   },500)

    return [...inputs].forEach(inp=>{
        inp.value = ''
    })
})
// clear database function
async function clearFn(){
    let ft = await fetch('/cleared')
    // console.log('db cleared!')
    resActual.textContent = 0;
}