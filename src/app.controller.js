import express from 'express'
import dotenv from "dotenv"
dotenv.config ({path:"./src/config/.env"})

import { userRouter , blogRouter } from "./modules/index.js"


const bootstrap = ()=>{
const app= express()
const port = process.env.PORT || 5000
    app.use(express.json()) //used for parsing the body

    app.use("/auth", userRouter) //http://localhost:3000/auth
    app.use("/blogs", blogRouter) //http://localhost:3000/blogs 


    app.listen(port, ()=>{
        console.log (`server is running http://localhost:${port} `)
    })
}

export default bootstrap