import { Conversation } from "../models/conversation.model.js";
import { collegeS, collegeSs, Message } from "../models/message.model.js";
import cloudinary from "../utils/cloudinary.js";

//for chatting
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    //establish the conversation if not started yet
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) conversation.message.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    // implement socket io for real time data transfer

    return res.status(200).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.find({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation)
      return res.status(200).json({
        success: true,
        message: [],
      });
    return res.status(200).json({
      success: true,
      messages: conversation?.messages,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const collge=async(req,res)=>{

//     try {
//       const newCollege = new college(req.body);
//       await newCollege.save();
//       res.status(201).json({ message: 'College data saved successfully', data: newCollege });
//     } catch (error) {
//       res.status(500).json({ message: 'Error saving college data', error });
//     }

// }

export const collegeaa = async (req, res) => {
  try {
    const newCollege = new collegeS(req.body);
    await newCollege.save();
    res
      .status(201)
      .json({ message: "College data saved successfully", data: newCollege });
  } catch (error) {
    res.status(500).json({ message: "Error saving college data", error });
  }
};



// Start the server

export const collges = async (req, res) => {
  try {
    const colleges = await collegeS.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Error fetching colleges", error });
  }
};

/// delete college
export const deleteCollege = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCollege = await collegeS.findByIdAndDelete(id);
    if (!deletedCollege) {
      return res.status(404).json({ message: "College not found" });
    }
    res
      .status(200)
      .json({ message: "College deleted successfully", data: deletedCollege });
  } catch (error) {
    res.status(500).json({ message: "Error deleting college", error });
  }
};

// Update a college by ID
export const updateCollege = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCollege = await collegeS.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCollege) {
      return res.status(404).json({ message: "College not found" });
    }
    res
      .status(200)
      .json({ message: "College updated successfully", data: updatedCollege });
  } catch (error) {
    res.status(500).json({ message: "Error updating college data", error });
  }
};
