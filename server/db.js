require('dotenv').config()
const { Pool } = require('pg')


const pool = new Pool({
    user: process.env.DBU,
    database: process.env.DB,
    password: process.env.PD,
    port: process.env.DBP,
    host: process.env.DBH,

})
// const getRows = async (pool) => {
//     const rows = await pool.query('select * from colors')
//     console.log(rows.rows);
// }
// getRows(pool)

module.exports = {pool}