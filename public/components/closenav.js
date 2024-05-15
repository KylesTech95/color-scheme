export const closeNavWindowClick = (nav,actual,top) => {
    window.onclick=e=>{
        let xPosition = e.pageX
        if(nav.classList.contains('full') && xPosition < window.innerWidth-90){
            nav.classList.add('base')
            nav.classList.remove('full')
            actual.classList.add('hidden-item');
            top.classList.add('hidden-item')
        }
    }
}