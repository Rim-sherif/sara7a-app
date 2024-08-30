import messageModel from "../../../DataBase/models/message.model.js";
import userModel from "../../../DataBase/models/user.model.js";
import {handelError} from '../../middelware/handelAsyncError.js'


//add message
const addmessage = handelError(async(req, res) => {
  
    let { messagetext,receivedId } = req.body;
    let existUser = await userModel.findById(receivedId);
    if (!existUser) return res.json({ message: "user not found" });
    let added = await messageModel.insertMany({
      messagetext,receivedId
    });
    res.json({ message: "sucsess", added });
});

//getall messages
const getmessages = handelError(async (req,res) => {
      let allmessages = await messageModel.find({receivedId:req.userId})  
      res.json({ message: "sucsess",allmessages });
  })




export { addmessage ,getmessages};
