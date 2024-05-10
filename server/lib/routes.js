require('dotenv').config()
let fs = require('fs')
const path = require('path')
module.exports = function(app,pool,sequelize,router){
    // functions
    const rgb2Hex = (n) => {
        const hex = n.toString(16)
        return hex.length < 1 ?  `0${hex}`:hex
    }
    const rgbToHex = (r, g, b) => {
        // // console.log(`#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`)
        return `#${rgb2Hex(+r)}${rgb2Hex(+g)}${rgb2Hex(+b)}`;
    }
    const validateColor = (color) => {
        for(let i in color){
            if( !/^search$/.test(i) ){ 
                return false;
            } 
            if(/^([A-Fa-f0-9]{6}|[a-fA-F0-9]{3})$/.test(color[i]) || 
                /rgb\((\d{1,3})(\s{0,5})?,(\s{0,5})?(\d{1,3})(\s{0,5})?,(\s{0,5})?(\d{1,3})(\s{0,5})?\)/i.test(color[i])){
                return true
            }
            else{
                return false;
            }
        }
    }
    const colorsAvailable = async(query) => {
        let colors = await fetch(`http://localhost:${process.env.PORT}/colors`)
        let r = await colors.json()
        let d = r.colors;
        let tmp = []
        if(typeof(query.search)!=='string'){
        query.search.forEach((s,i)=>{
         tmp.push(s.replace(/\s/g,''))
            })
            console.log(tmp)
        return d.filter(col=>{
            let rgb = col.color.match(/\d+/g)
            let hex = rgbToHex(rgb[0],rgb[1],rgb[2]).slice(1,-1)
            return (tmp.includes(col.color)||tmp.includes(hex))
        })||[]
        }
        else{
            query.search.replace(/\s/g,'')
            return d.filter(col=>{
                let rgb = col.color.match(/\d+/g)
                let hex = rgbToHex(rgb[0],rgb[1],rgb[2]).slice(1,-1)
                return (col.color == query.search || hex == query.search)
            })||[]
        }
    }

// lookup a valid color via rgb/hex
    app.route("/colors/lookup").get(async(req,res)=>{
       try{
        if(validateColor(req.query)){
            let availableColors = await colorsAvailable(req.query)
            res.json({colors:availableColors.map(x=>x.color)})
           }
           else{
            res.json({message:'color not validated'})
           }
       }
       catch(err){
        console.log(err)
       }
})
// lookup all colors
    app.route('/colors').get(async(req,res)=>{
        //http://localhost:7671/colors/
        let colors;
        colors = await pool.query('select * from colors')
        res.json({colors:colors.rows.map(c=>{
            return c
        })})
    })
// about message
    app.route('/about').get((req,res)=>{
        res.sendFile(path.resolve('public/about.html'))
    })
// get a color from id param
    app.route('/colors/:id').get(async(req,res)=>{
        const { id } = req.params
        try{
            // console.log(id)
            if(id < 1 || id > 4096){
                res.json({message:'invaid number'})
            }
            else{

                const getColor = await pool.query('select color from colors where id=$1',[id])
                let hexVal = getColor.rows[0].color.replace(/\(|\)|rgb/g,'').split(",")
                let hex = rgbToHex(hexVal[0],hexVal[1],hexVal[2])
                res.json({current_color:getColor.rows[0].color, hex:hex})
            }
        }
        catch(err){
            // console.log(err)
        }
    })
// delete all colors
    app.route('/colors/del').get(async(req,res)=>{
        await pool.query('truncate colors;alter sequence colors_id_seq restart with 1;')
        res.redirect("/")
    })
// insert colors into db
// app.route('/colors-insert').post(async(req,res)=>{
//     let { rgb } = req.body
//     rgb_rest = [...rgb].slice(2784);
//     for(let i = 0; i < rgb_rest.length; i++){
//         // const insertColors = await pool.query('insert into colors(color) values($1)',[rgb_rest[i]])
//     }


//     res.redirect('/')
// })

// Testing requests with class-based Functions

    // post sum to the database
    // app.route('/post-sum-fn').post(async (req,res)=>{
    //     let {a,b} = req.body
    //     if(!a||!b){
    // //         console.log('no data entered')
    //         res.json({result:'Enter numbers'})
    //     }
    //     else{
    //         const sum = new SumFn(a,b)
    //         const insertData = await pool.query('insert into numbers(result) values($1)',[sum.add()])
    // //         console.log(a,b)
    //         res.json({result:sum.add()}) // function should return a + b
    //     }
    // }) 
    // // get data from db
    // app.route('/get-sum-fn').get(async (req,res)=>{
    //     let currentID = await pool.query('select * from numbers')
    //     let count = currentID.rows.length
    // //     console.log(count)
    //     const getLatest = await pool.query('select result from numbers where id=$1',[count])
    //     res.json({count:count,result:getLatest.rows[0].result})
    // })
    // // get total list of sums
    // app.route('/numbers').get(async(req,res)=>{
    //     const allNums = await pool.query('select * from numbers')
    //     let arr = allNums.rows;
    // //     console.log(arr)
    //     const mapped_arr = [...arr].map(r=>r)
    //     res.json({sums:mapped_arr})
    // })
    // // clear numbers table in colors db
    // app.route('/cleared').get(async(req,res)=>{
    //     await pool.query('truncate numbers; alter sequence numbers_id_seq restart with 1;');
    // //     console.log('db cleared')
    //     res.redirect('/')
    // })


}   

