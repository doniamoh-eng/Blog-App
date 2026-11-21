import mysql from 'mysql2' 
import dotenv from 'dotenv'
dotenv.config({path:"./src/config/.env"})


// define connection
const connection = mysql.createConnection({
    host:process.env.HOSTNAME,
    password:process.env.DATABASE_PASSWORD,
    port:process.env.DATABASE_PORT,
    user:process.env.DATABASE_USER,
    database:process.env.DATABASE_NAME, // table name in the database
})


// test connection
connection.connect((err)=>{
   
    if (err){
        console.log(`error connecting database:${err.message}`)
        return
    }
    console.log(`connected to mysql database`)
})

export default connection

