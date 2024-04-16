let r,g,b,colour;
const spot = document.querySelector('.choice-spot')
const insert_btn = document.getElementById('insert-color')
const scrolls = document.querySelectorAll('#scroll-container>.scroll')
const inputs = document.querySelectorAll(".num-input")
const resActual = document.querySelector('.result-actual')
const submit_btn = document.getElementById('submit-btn')
const pal_container = document.querySelector('.color-pal-list-container')
const pal_spot = document.querySelector('.color-pal-spot-container');

let idCount = 0;
let click = 0;
const post = '/post-sum-fn'
const get = '/get-sum-fn'
const res = {
    color: document.querySelector(".result-color>h4"),
    hex: document.querySelector(".result-hex>h4")
}
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
async function clearFn(){
    let ft = await fetch('/cleared')
    console.log('db cleared!')
    resActual.textContent = 0;
 }
submit_btn.addEventListener('click',e=>{
    e.preventDefault();
    // post request
    postFn(post,{a:inputs[0].value,b:inputs[1].value}).then(data=>{
        console.log(data.result)
        resActual.textContent = data.result;
    })
    // settimeout for get request
   setTimeout(()=>{
     //get request
     fetch(get).then(res=>res.json()).then(data=>{
        console.log(data)
    })
   },500)

    return [...inputs].forEach(inp=>{
        inp.value = ''
    })
})
const rgb2Hex = (n) => {
const hex = n.toString(16)
return hex.length < 1 ?  `0${hex}`:hex
}
const rgbToHex = (r, g, b) => {
    console.log(`#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`)
    return `#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`;
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
const disappear = (input) => {
}
const copyColor = async(inp) => {
        try {
          await navigator.clipboard.writeText(inp.value);
          console.log('Content copied to clipboard');
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      
} 
const clickInput = (input) => {
    input.onclick=e=>{
        console.log(e.target)
        input.setAttribute('onclick',"return false;")
        input.setAttribute('onkeydown',"return false;")
        copyColor(input)
    }
}     
const makeWhiteColor = (data,input) => {
    // if r & g are less-than or equal to 100
    if(/[0-100],[0-100]|[0-100],/.test(data)){
        input.classList.add('light-color')
    }
    else{
        input.classList.remove('light-color')
    }
}
const failSafe = {
    scroll: (scroll) => {
        scroll.classList.add('no-pointer')
        setTimeout(()=>{
            scroll.classList.remove('no-pointer')
        },50)
    }
}
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
    let sp = scroll.parentElement.parentElement;
    scroll.addEventListener('click', e => {
        failSafe.scroll(scroll);
        idCount+=1;
        if(idCount>4096)idCount=1;
            console.log(idCount)
        // create input
        const input = document.createElement('input')
              input.classList.add('color-input')
              fetch(`/colors-insert/${idCount}`).then(res=>res.json()).then(data=>{
            input.style.background = data.current_color;
            input.classList.add('color-input')
            input.setAttribute('type','text')
            input.setAttribute('value',data.current_color)
            sp.append(input)
            // disappear(input)
            appear(input)
            clickInput(input)
            makeWhiteColor(data.current_color,input)
            // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
            // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
            let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
            console.log(rgbColor)

            // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                res.color.textContent = data.current_color
                res.hex.textContent = rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2]);
                res.color.style.color = data.current_color
                res.hex.style.color = data.current_color
        })
    })
    window.addEventListener('keydown',e=>{
        if(/ArrowRight/.test(e.key)){
        hoverEffect(scroll)

            failSafe.scroll(scroll);
                idCount+=1;
                if(idCount>4096)idCount=1;
                console.log(idCount)
                const input = document.createElement('input')
                      input.classList.add('color-input')
                      fetch(`/colors-insert/${idCount}`).then(res=>res.json()).then(data=>{
                input.style.background = data.current_color;
                input.classList.add('color-input')
                input.setAttribute('type','text')
                input.setAttribute('value',data.current_color)
                sp.append(input)
                clickInput(input)
                makeWhiteColor(data.current_color,input)
                // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
                    let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
                console.log(rgbColor)
                // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                res.color.textContent = data.current_color
                res.hex.textContent = rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2]);
                res.color.style.color = data.current_color
                res.hex.style.color = data.current_color
            })
        }
    })
}
// 2) Rotate Left
const rotateLeft = (scroll) => {
    let sp = scroll.parentElement.parentElement;
    scroll.addEventListener('click', e => {
        failSafe.scroll(scroll);
        idCount-=1;
        if(idCount<1)idCount=4096;
        console.log(idCount)
        const input = document.createElement('input')
        input.classList.add('color-input')
        fetch(`/colors-insert/${idCount}`).then(res=>res.json()).then(data=>{
            input.style.background = data.current_color;
            input.classList.add('color-input')
            input.setAttribute('type','text')
            input.setAttribute('value',data.current_color)
            sp.append(input)
            clickInput(input)
            // disappear(input)
            appear(input)
            makeWhiteColor(data.current_color,input)
            // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
        let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
            console.log(rgbColor)
            // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                res.color.textContent = data.current_color
                res.hex.textContent = rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2]);
                res.color.style.color = data.current_color
                res.hex.style.color = data.current_color
        })
    })
    window.addEventListener('keydown',e=>{
        if(/ArrowLeft/.test(e.key)){
        hoverEffect(scroll)

            failSafe.scroll(scroll);
            idCount-=1;
            if(idCount<1)idCount=4096;
            console.log(idCount)
            const input = document.createElement('input')
            input.classList.add('color-input')
            fetch(`/colors-insert/${idCount}`).then(res=>res.json()).then(data=>{
                input.style.background = data.current_color;
                input.classList.add('color-input')
                input.setAttribute('type','text')
                input.setAttribute('value',data.current_color)
                sp.append(input)
                clickInput(input)
                makeWhiteColor(data.current_color,input)
                // let rgbColor = data.current_color.match(/(\d+)/g).join`,`.split`,`;
            let rgbColor = data.current_color.replace(/\(|\)|rgb/g,'').split(",")
                console.log(rgbColor)
                // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                res.color.textContent = data.current_color
                res.hex.textContent = rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2]);
                res.color.style.color = data.current_color
                res.hex.style.color = data.current_color
            })
        }
    })
}
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
                console.log(undefined);
            break;
        }
    })

}
clickScrolls()

// test sumFn
//________________________________________

// let arr = []
// for(let i=0; i < 1<<12; i++) {
//     r = ((i>>8) & 0xf) * 0x11;
//     g = ((i>>4) & 0xf) * 0x11;
//     b = (i & 0xf) * 0x11;
//     colour = "rgb("+r+","+g+","+b+")";
//     // console.log(colour)
//     arr.push(colour)
    
// }
// console.log(arr)

// insert_btn.style.left = `${document.body.clientWidth/2}px`
// insert_btn.addEventListener('click', e => {
//     postfetch('/colors-insert',{rgb:[...arr]}).then((data)=>{
//         return data.color
//     })
// })


// fill color palette
fetch('/colors').then(res=>res.json()).then(data=>{
// console.log(data.colors)
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
            console.log(rgbColor)
            idCount=index+1

            // rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2])
                res.color.textContent = e.target.style.background
                res.hex.textContent = rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2]);
                res.color.style.color = e.target.style.background
                res.hex.style.color = e.target.style.background

            // identify rgb input
            const input = document.createElement('input')
              input.classList.add('color-input')
              input.style.background = col.color;
                input.classList.add('color-input')
                input.setAttribute('type','text')
                input.setAttribute('value',col.color)
                makeWhiteColor(col.color,input)
                spot.append(input)
              
        })
})
// append items in pallette container
for(let i in arr){
    pal_container.append(arr[i])
}





})
