const SumFn = require('./addition.js')
module.exports = function(app,pool){

    app.route('/hello').get((req,res)=>{
        console.log("route to homepage")
        res.send({message:'hello'})
    })

    app.route('/colors/del').get(async(req,res)=>{
        await pool.query('truncate colors;alter sequence colors_id_seq restart with 1;')
        res.redirect("/")
})
    app.route('/colors').get(async(req,res)=>{
        const colors = await pool.query('select * from colors')
        res.json({colors:colors.rows.map(c=>{
            return c
        })})
    })

    app.route('/colors-insert/:id').get(async(req,res)=>{
        const { id,color } = req.params

        const getColor = await pool.query('select color from colors where id=$1',[id])
        res.json({current_color:getColor.rows[0].color})
    })
// Testing requests with class-based Functions
    app.route('/post-sum-fn').post(async (req,res)=>{
        let {a,b} = req.body
        if(!a)a=0
        if(!b)b=0
        console.log(a,b)
        const sum = new SumFn(a,b)
        const insertData = await pool.query('insert into numbers(result) values($1)',[sum.add()])
        const currentID = await pool.query('select count(id) as current_count from numbers')
        const currentCount = currentID.rows[0].current_count
        const getData = await pool.query('select id,result from numbers where id=$1',[currentCount])
        console.log(getData.rows[0]['result'])
        res.json({result:sum.add()}) // function should return a + b
    })
    
    app.route('/get-sum-fn').get(async (req,res)=>{
        const currentID = await pool.query('select count(id) as current_count from numbers')
        let count = currentID.rows[0].current_count

        count++
        console.log(count)
    })

}   

