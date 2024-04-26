export default function getColorInventory(inventory_container){
    fetch('/color-inventory').then(res=>res.json()).then(data=>{
        // // send color to inventory
        let arr = [...data.inventory];

        arr.forEach((inv,index)=>{
            const iLi = document.createElement('li')
                  iLi.classList.add('color-inventory-list-item')
                  iLi.setAttribute('style', `
                    background:${inv.color};
                    height:45px;
                    width:45px;
                    border:2px solid green
                    `)
                  inventory_container.append(iLi)
        })
    })
}