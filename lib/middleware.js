const bodyParser = require("body-parser")

module.exports = function(app,express,cors,path,bodyParser){
// middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

}