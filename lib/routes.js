module.exports = function(app){

app.route('/hello').get((req,res)=>{
    console.log("route to homepage")
    res.send({message:'hello'})
})
}