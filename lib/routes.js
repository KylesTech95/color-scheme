const SumFn = require('./addition.js')
module.exports = function(app,pool){

// peek at all colors (rest API)
    app.route('/colors').get(async(req,res)=>{
        const colors = await pool.query('select * from colors')
        res.json({colors:colors.rows.map(c=>{
            return c
        })})
    })
// get a color from id param
    app.route('/colors/:id').get(async(req,res)=>{
        const rgb2Hex = (n) => {
            const hex = n.toString(16)
            return hex.length < 1 ?  `0${hex}`:hex
        }
        // function that converts number to hex with 3 arguments (r,g,b)
        const rgbToHex = (r, g, b) => {
            // // console.log(`#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`)
            return `#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`;
        }
        const { id } = req.params
        try{
            if(id < 1 || id > 4096){
                res.json({message:'invaid number'})
            }
            else{

                const getColor = await pool.query('select color from colors where id=$1',[id])
                let hexVal = getColor.rows[0].color.replace(/\(|\)|rgb/g,'').split(",")
                let hex = rgbToHex(hexVal[0],hexVal[1],hexVal[2])
                console.log(hex)
                res.json({current_color:getColor.rows[0].color, hex:hex})
            }
        }
        catch(err){
            console.log(err)
        }
    })
// delete all colors
app.route('/colors/del').get(async(req,res)=>{
    await pool.query('truncate colors;alter sequence colors_id_seq restart with 1;')
    res.redirect("/")
})
// insert colors into db
app.route('/colors-insert').post(async(req,res)=>{
    const { rgb } = req.body

    for(let i = 0; i < rgb.length; i++){
        const insertColors = await pool.query('insert into colors(color) values($1)',[rgb[i]])
    }


    res.redirect('/')
})

// Testing requests with class-based Functions

    // post sum to the database
    app.route('/post-sum-fn').post(async (req,res)=>{
        let {a,b} = req.body
        if(!a||!b){
            console.log('no data entered')
            res.json({result:'Enter numbers'})
        }
        else{
            const sum = new SumFn(a,b)
            const insertData = await pool.query('insert into numbers(result) values($1)',[sum.add()])
            console.log(a,b)
            res.json({result:sum.add()}) // function should return a + b
        }
    }) 
    // get data from db
    app.route('/get-sum-fn').get(async (req,res)=>{
        let currentID = await pool.query('select * from numbers')
        let count = currentID.rows.length
        console.log(count)
        const getLatest = await pool.query('select result from numbers where id=$1',[count])
        res.json({count:count,result:getLatest.rows[0].result})
    })
    // get total list of sums
    app.route('/numbers').get(async(req,res)=>{
        const allNums = await pool.query('select * from numbers')
        let arr = allNums.rows;
        console.log(arr)
        const mapped_arr = [...arr].map(r=>r)
        res.json({sums:mapped_arr})
    })
    // clear numbers table in colors db
    app.route('/cleared').get(async(req,res)=>{
        await pool.query('truncate numbers; alter sequence numbers_id_seq restart with 1;');
        console.log('db cleared')
        res.redirect('/')
    })
    const insertDataIntoInventory = async(color) => {
        await pool.query('insert into color_inventory(color) values($1)',[color])
        console.log('color inserted by function')
    }
    // insert into color_inventroy
    app.route('/color-inventory-insert').post(async(req,res)=>{
        const { color } = req.body;
        try{
            let inventory = await pool.query('select * from color_inventory')
            let inventory_arr = inventory.rows
            let len = [...inventory_arr].filter((col,i)=>{
                        return col.color==color }).length
                        if(len > 0){
                            console.log('this is already in db')
                            res.redirect('/')
                        }
                        else{
                            await pool.query('insert into color_inventory(color) values($1)',[color])
                            console.log('color inserted!')
                            res.redirect('/')
                        }
        }
        catch(err){
            console.log(err)
            res.redirect('/')
        }
    })
    // get all colors from inventory
    app.route('/color-inventory').get(async(req,res)=>{
        let inventory = await pool.query('select * from color_inventory')
        let invent = inventory.rows;
        res.json({inventory:invent.map(inv => {
            return {
            id:inv.id,
            color:inv.color
            }
        })})
    })
    app.route('/color-inventory-del').get(async(req,res)=>{
        const { id, color } = req.body;
        //notes:
        //delete all
        // truncate color_inventory;alter sequence color_inventory_id_seq restart with 1
        await pool.query('truncate color_inventory;alter sequence color_inventory_id_seq restart with 1')
        console.log('color deleted in color_inventory table')
        res.redirect('/')

        
    })


}   

