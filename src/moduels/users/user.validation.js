import Joi from 'joi';

const signupSchema = Joi.object({
  body:{
    userName:Joi.string().min(3).max(10).required(),
    email:Joi.string().email({tlds:{allow:['com','net']}}).required(),
    password:Joi.string().pattern(/^[A-Z][a-z]{3,6}$/).required(),
    repassword:Joi.ref("password"),
    age:Joi.number().min(16).max(50).required()
  }
  })


const signinSchema = Joi.object({
  body:{
    email:Joi.string().email({tlds:{allow:['com','net']}}).required(),
    password:Joi.string().pattern(/^[A-Z][a-z]{3,6}$/).required()
  }
  })


  export {signinSchema,signupSchema}