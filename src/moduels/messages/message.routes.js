import express  from "express";
import * as messageController from './message.controller.js'
import {auth} from '../../middelware/auth.js'
import { validation } from "../../middelware/validation.js";
import { addMessage } from "./message.validation.js";
const messageRoutes= express.Router()


messageRoutes.post("/",validation(addMessage),messageController.addmessage)
messageRoutes.get("/getmessages",auth,messageController.getmessages)



export default messageRoutes