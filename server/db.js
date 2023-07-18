require("dotenv").config();
// const Promise = require('pg-promise')();
const { Client } = require('pg')

const connectDb =  new Client({
    host: process.env.PGHOST,
    port: 5432,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  })


connectDb.connect((err)=>{
  if (err) {
    console.log(typeof process.env.PGPORT)
    console.log('i have errr', err)
  } else {
    console.log('successfully connected')
  }
})


module.exports = connectDb;
