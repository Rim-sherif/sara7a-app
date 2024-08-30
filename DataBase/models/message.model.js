import {Schema,model} from 'mongoose';
import mongoose from 'mongoose';

const messageSchema = new Schema({
  messagetext:{
    type:String,
    required:true,
  },
  receivedId:{
    type: mongoose.Types.ObjectId,
    ref:"User"
  }

},{
  timestamps:true
})

const messageModel = model("Message",messageSchema);

export default messageModel;