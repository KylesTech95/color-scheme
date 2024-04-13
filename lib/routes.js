module.exports = function(app){

app.route('/hello').get((req,res)=>{
    console.log("route to homepage")
    res.send({message:'hello'})
})


app.route('/colors').post((req,res)=>{
    const { color } = req.body
    console.log(color)
})

app.route('/colors').get((req,res)=>{
   
})



}   