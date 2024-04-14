
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

}   

