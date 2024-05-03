require('dotenv').config()
const SumFn = require('./addition.js')
const dir_pre = `http//localhost:`
const port = !process.env.PORT ? 3000 : process.env.PORT

let quarter
module.exports = function(app,pool,sequelize,router){
const validateColor = (color) => {
    return color.match(/rgb/g)
}

    app.route("/colors/choice/:cc").get(async(req,res)=>{
        const color = req.params.cc;
        modColor = validateColor(color)
        console.log(modColor)
        let colors = '/colors'
        let col_api=(`http://localhost:7671`+colors)
        // console.log(col_api)
        let getColors = await fetch(col_api)
        let r = await getColors.json();
        let data = r.colors;
    })
    // app.route("/colors-fetch").get(async(req,res)=>{
    //     let colors = '/colors'
    //     let col_api=(`http://localhost:7671`+colors)
    //     // console.log(col_api)
    //     let getColors = await fetch(col_api)
    //     let r = await getColors.json();
    //     let data = r.colors;
    //     console.log(data)
    // })
// peek at all colors (rest API)
app.route('/colors').get(async(req,res)=>{
    //http://localhost:7671/colors/
    let colors;
    colors = await pool.query('select * from colors')
    res.json({colors:colors.rows.map(c=>{
        return c
    })})
})

    app.route('/about').get((req,res)=>{
        res.json({message:'about-page'})
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

