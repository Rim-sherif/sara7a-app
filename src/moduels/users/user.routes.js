import express  from "express";
import * as userController from './user.controller.js'
import { validation } from "../../middelware/validation.js";
import { signinSchema, signupSchema } from "./user.validation.js";
const userRoutes= express.Router()


userRoutes.post('/signup',validation(signupSchema),userController.signup)
userRoutes.post('/signin',validation(signinSchema),userController.signin)
userRoutes.get("/verifiy/:token",userController.verifiyEmail)

export default userRoutes;