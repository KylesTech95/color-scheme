const spot = document.querySelector('.choice-spot')
let r,g,b,colour;
const insert_btn = document.getElementById('insert-color')
const scrolls = document.querySelectorAll('#scroll-container>.scroll')
let idCount = 0;

const failSafe = {
    scroll: (scroll) => {
        scroll.classList.add('no-pointer')
        setTimeout(()=>{
            scroll.classList.remove('no-pointer')
        },2500)
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
const rotateRight = (scroll) => {
    scroll.addEventListener('click', e => {
        failSafe.scroll(scroll);
        idCount+=1;
        if(idCount>4096)idCount=1;
        console.log(idCount)
        fetch(`/colors-insert/${idCount}`).then(res=>res.json()).then(data=>{
            console.log(data.current_color)
        })
    })
}
const rotateLeft = (scroll) => {
    scroll.addEventListener('click', e => {
        failSafe.scroll(scroll);
        idCount-=1;
        if(idCount<1)idCount=4096;
        console.log(idCount)
        
        fetch(`/colors-insert/${idCount}`).then(res=>res.json()).then(data=>{
            console.log(data.current_color)
        })
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
        