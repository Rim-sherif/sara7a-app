import dotenv from 'dotenv'
dotenv.config({})
import express from 'express';
import { connection } from './DataBase/connection.js';
import userRoutes from './src/moduels/users/user.routes.js';
import messageRoutes from './src/moduels/messages/message.routes.js';
import { AppError } from './utiltis/appError.js';
import { globalError } from './utiltis/globalErrorHandling.js';
const app = express()
const port = 3000
connection()

app.use(express.json())
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/message",messageRoutes)


app.use("*",(req,res,next)=>{
    next(AppError(`invalid url ${req.originalUrl}`,404))
})

app.use(globalError)

app.listen(port,()=> console.log(`server is run ${port}`))