require('dotenv').config()
const pool = require('./db.js').pool
const sequelize = require('./seq.js').sequelize
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const router = express.Router()

const PORT = !process.env.PORT ? 3000 : process.env.PORT
const routes = require('./lib/routes.js')
const middleware = require('./lib/middleware.js')

middleware(app,express,cors,bodyParser)
routes(app,pool,sequelize,router)

app.listen(PORT,()=>{
    console.log('Buddy, you are listening on port ' + PORT)
})