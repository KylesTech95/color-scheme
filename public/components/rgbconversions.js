// helper function formats number to hex
export const rgb2Hex = (n) => {
    const hex = n.toString(16)
    return hex.length < 1 ?  `0${hex}`:hex
    }
    // function that converts number to hex with 3 arguments (r,g,b)
export const rgbToHex = (r, g, b) => {
    // // console.log(`#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`)
    return `#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`;
}
// executive function to set html elements style attributes
export const setRGBAndHex = (res,data,rgbColor,bool) => {
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