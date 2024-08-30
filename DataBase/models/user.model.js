import {Schema,model} from 'mongoose';

const userSchema = new Schema({
  userName:{
    type:String,
    required:true,
    minLength:[3,"name is too short"],
  },
  email:{
    type:String,
    unique:true,
    required:true,
  },
  password:{
    type:String,
    minLength:[4,"password is too short"],
    maxLength:[100,"password is too long"],
  },
  verified:{
    type:Boolean,
    default:false,
  }
},{
  timestamps:true
})

const userModel = model("User",userSchema);

export default userModel;