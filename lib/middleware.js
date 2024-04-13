
module.exports = function(app,express,cors,bodyParser){
// middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

}