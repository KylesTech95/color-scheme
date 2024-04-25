// turn input's color white 
// turn copy-icon white
export const makeWhiteColor = (data,input,copy) => {
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