const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.URI,{
    dialect:'postgres',
    dialectOptions:{
      ssl:{
        rejectUnauthorized:true
      }
    }

})


// const testDbConnection = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Connection has been established successfully.");
//     } catch (error) {
//       console.error("Unable to connect to the database:", error);
//     }
//   };
//   testDbConnection()
// const pushVal = async(val) => {
// try{
//   if(!val){
//     console.log('no value placed')
//   }
//   else{
//     const insertVal = await sequelize.query(`insert into colors(color) values(?)`,{
//       replacements: [val]
//     })
//     console.log(insertVal)
//   }
// }
// catch(err){
//   console.log(err)
// }
// }

// pushVal('rgb(0,0,0)')

module.exports = {sequelize}