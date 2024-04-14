const spot = document.querySelector('.choice-spot')
let r,g,b,colour;
const insert_btn = document.getElementById('insert-color')
const scrolls = document.querySelectorAll('#scroll-container>.scroll')
let idCount = 0;

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
        },1750)
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
            clickInput(input)
            
            makeWhiteColor(data.current_color,input)
        })
    })
    window.addEventListener('keydown',e=>{
        if(/ArrowRight/.test(e.key)){
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
            makeWhiteColor(data.current_color,input)
        })
    })
    window.addEventListener('keydown',e=>{
        if(/ArrowLeft/.test(e.key)){
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