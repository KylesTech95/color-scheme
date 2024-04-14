const spot = document.querySelector('.choice-spot')
let r,g,b,colour;
const insert_btn = document.getElementById('insert-color')
const insert_color = '/colors-insert'
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
const rotateRight = (arr) => {
    // arr[arr.length-1].classList.remove('swoosh-left')
    let take = arr.pop();
    arr.unshift(take)
    // arr[arr.length-1].classList.add('swoosh-left')
    arr[0].classList.add('z-index')
    
}
const rotateLeft = (arr) => {
    let take = arr.shift();
    arr.push(take)
    arr[0].classList.add('z-index')
}
const left_scroll = document.querySelectorAll('#scroll-container>.scroll')

const api_colors = `/colors`

let arr = []
for(let i=0; i < 1<<12; i++) {
    r = ((i>>8) & 0xf) * 0x11;
    g = ((i>>4) & 0xf) * 0x11;
    b = (i & 0xf) * 0x11;
    colour = "rgb("+r+","+g+","+b+")";
    // console.log(colour)
    arr.push(colour)
    
}

// insert_btn.style.left = `${document.body.clientWidth/2}px`
// insert_btn.addEventListener('click', e => {
//     postfetch(insert_color,{color:[...arr]}).then((data)=>{
//         return data.color
//     })
// })



window.onload=()=>{    
    fetch(api_colors).then(res=>res.json()).then(data=>{
            let arg = [...data.colors]
            for(let i = 0; i < arg.length; i++){
                const li = document.createElement('li')
                li.style = `background:${arg[i].color};
                            position:absolute;
                            height:100%;
                            width:100%;
                            display:flex;
                            flex-direction:column;
                            align-items:center;
                            justify-content:center;
                            `
                    spot.appendChild(li)
                
            }
            let items = document.querySelectorAll('.choice-spot>li')
            let arr = [...items]

            left_scroll.forEach((sc,index)=>{
                
                    sc.addEventListener('click',e=>{
                        arr.forEach(a=>a.classList.remove('z-index'))
                        // console.log(e.target)
                        if(index%2!==0)rotateRight(arr)
                        if(index%2===0)rotateLeft(arr)

                    })
                
                
            })
        })
}

        