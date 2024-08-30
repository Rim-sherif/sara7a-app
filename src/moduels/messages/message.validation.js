import Joi from "joi";

const addMessage = Joi.object({
  messagetext:Joi.string().min(3).max(100).required(),
  receivedId:Joi.string().hex().length(24).required()
})


export {addMessage}