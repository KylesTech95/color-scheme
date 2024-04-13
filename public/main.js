const spots = document.querySelectorAll('.choice-spot')
let r,g,b,colour;
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


let arr = []
for(let i=0; i < 1<<12; i++) {
    r = ((i>>8) & 0xf) * 0x11;
    g = ((i>>4) & 0xf) * 0x11;
    b = (i & 0xf) * 0x11;
    colour = "rgb("+r+","+g+","+b+")";
    // console.log(colour)
    arr.push(colour)
    
}
spots[0].addEventListener('click', e => {
    postfetch('/colors',{color:[...arr]}).then((data)=>{
        return data.color
    })
})

