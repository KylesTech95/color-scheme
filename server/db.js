require('dotenv').config()
const { Pool } = require('pg')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.URI,{
    dialect:'pool'

})

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };
  testDbConnection()
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

module.exports = { pool };