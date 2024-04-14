const spots = document.querySelectorAll('.choice-spot')
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
    let take = arr.shift();
    arr.push(take)
    console.log(arr[0])
    arr[0].classList.add('z-index')
}
const rotateLeft = (arr) => {
    let take = arr.pop();
    arr.unshift(take)
    console.log(arr[0])
    arr[0].classList.add('z-index')
}
const left_scroll = document.querySelectorAll('#scroll-container>.scroll')
const right_scroll = document.querySelectorAll('#scroll-container2>.scroll')

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
        spots.forEach(spot=>{
            // console.log(data.colors)
            let arr = [...data.colors]
            for(let i = 0; i < arr.length; i++){
                const li = document.createElement('li')
                li.style = `background:${arr[i].color};
                            position:absolute;
                            height:100%;
                            width:100%;
                            display:flex;
                            flex-direction:column;
                            align-items:center;
                            justify-content:center;
                            `
                    spot.appendChild(li)
                // setTimeout(()=>{
                //     spot.appendChild(li)
                //     console.log(li)
                // },25*(i+1))
                
            }
            })
            let items = document.querySelectorAll('.choice-spot>li')
            let arr = [...items]

            left_scroll.forEach((sc,index)=>{
                
                if(index%2==0){
                    sc.addEventListener('click',e=>{
                        arr.forEach(a=>a.classList.remove('z-index'))
                        // console.log(e.target)
                        rotateRight(arr)
                    })
                }
                else{
                    let items = document.querySelectorAll('.choice-spot>li')
                    sc.addEventListener('click',e=>{
                        arr.forEach(a=>a.classList.remove('z-index'))
                        // console.log(e.target)
                        rotateLeft(arr)
                    })
                }
            })

            right_scroll.forEach((sc,index)=>{
                
                if(index%2==0){
                    sc.addEventListener('click',e=>{
                        arr.forEach(a=>a.classList.remove('z-index'))
                        // console.log(e.target)
                        rotateRight(arr)
                    })
                }
                else{
                    let items = document.querySelectorAll('.choice-spot>li')
                    sc.addEventListener('click',e=>{
                        arr.forEach(a=>a.classList.remove('z-index'))
                        // console.log(e.target)
                        rotateLeft(arr)
                    })
                }
            })


        })
}

        