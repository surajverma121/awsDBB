import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
  senderId:{
    type:mongoose.Schema.Types.ObjectId,ref:'User'
  },
  receiverId:{
    type:mongoose.Schema.Types.ObjectId,ref:'User'
  },
  message:{
    type:String,
    required:true
  }
})
export const Message=mongoose.model('Message',messageSchema)




const CollegeSchema = new mongoose.Schema({
  collegeName: { type: String },
  pincode: { type: String },
  university: { type: String },
  location: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  image:{type:String},

  courses: [{
    name: { type: String },
    fees: { type: Number }
  }]
});
export const collegeS=mongoose.model('college',CollegeSchema)

const CollegeSchema1 = new mongoose.Schema({
  collegeName: { type: String },
  pincode: { type: String },
  university: { type: String },
  location: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  image:{type:String},

  courses: [{
    name: { type: String },
    fees: { type: Number }
  }]
});
export const collegeSs=mongoose.model('college',CollegeSchema)