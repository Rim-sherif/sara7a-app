import userModel from "../../../DataBase/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../../email/sendEmail.js";
import {handelError} from '../../middelware/handelAsyncError.js'
import { AppError } from "../../../utiltis/appError.js";
import { signupSchema , signinSchema } from "./user.validation.js";




//sign up ( email must be unique )
const signup =  handelError(async (req, res,next) => {
    let { email, password, userName } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return next(new AppError(`user already exsist`,409)) 
    let hashedpassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALTROUNDS)
    );
    const user = await userModel.insertMany({
      userName,
      email,
      password: hashedpassword,
    });
    let verfiyToken = jwt.sign({id:user[0]._id},process.env.VERFIY_TOKEN)
    sendMail({email,api:`http://localhost:3001/api/v1/user/verifiy/${verfiyToken}`})
    res.json({ message: "success", user });
 
})



//log in
const signin = handelError( async (req, res,next) => {
  let { email, password } = req.body;
 
  const user = await userModel.findOne({ email });
  if (user){
    if(user.verified){
    let matched = await bcrypt.compare(password,user.password)
    if(matched ){
      let token = jwt.sign({id:user._id},process.env.SECRET_KEY)
      res.json({ message: "welcome",token});
    }else{
      next(new AppError(`password is uncorrect`,400))
    }
  }else{
    next(new AppError(`please verfiy`,401))
  }
  }else{
    next(new AppError(`user not exsist ,please go to register`,400))
  }
});

//verify email
const verifiyEmail = handelError((req,res) => {
  let {token} = req.params;
  jwt.verfiy(token,process.env.VERFIY_TOKEN,async(err,decoded)=>{
    if(err) return res.json({message:"err",err})
   let updatedUser = await userModel.findByIdAndUpdate(decoded.id,{verified:true},{new:true})
  res.json({message:"sucsess" ,updatedUser })
  })


})



export { signup , signin, verifiyEmail};
