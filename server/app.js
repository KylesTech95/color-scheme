require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const PORT = !process.env.PORT ? 3000 : process.env.PORT
const routes = require('./../lib/routes.js')
const middleware = require('./../lib/middleware.js')

routes(app)
middleware(app,express,cors,path,bodyParser)




app.listen(PORT,()=>{
    console.log('Buddy, you are listening on port ' + PORT)
})