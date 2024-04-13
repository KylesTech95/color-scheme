const spots = document.querySelectorAll('.choice-spot')
const rgb = {r:0,g:0,b:0};
let timer = 100
let start = 0, turnup, stopper, currentval;



// retrieve keys & values from obj
const obj = {
    keys: Object.keys(rgb),
    values: Object.values(rgb),
    names: Object.getOwnPropertyNames(rgb)
}
// iterate from 0 to 2 && plug in object
for(let i = 0; i < 3;i++){
    // rgb[obj.names[i]]
    if(start===i && start < 254){ // if start = starting index (0)
        setInterval(()=>{
            rgb[obj.names[i]]++
            console.log(rgb)

            if(rgb[obj.names[i]] === 255){
                rgb[obj.names[i+1]]+=1;
                rgb[obj.names[i]] = 0;
            }
        },50)
    }

    
}