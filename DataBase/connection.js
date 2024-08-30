import mongoose from 'mongoose';

export const connection = () =>{
  mongoose.connect('mongodb://localhost:27017/sara7a').then(()=>{
    console.log('connectd to db')
  }).catch((err)=>{
    console.log("error")
  })
}