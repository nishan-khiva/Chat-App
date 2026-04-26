import Message from "../models/Message.js";
import User from "../models/User.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    const newMessage = await Message.create({
      senderId: req.user,
      receiverId,
      text,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MESSAGES
export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const messages = await Message.find({
      $or: [
        {
          senderId: req.user,
          receiverId: id,
        },
        {
          senderId: id,
          receiverId: req.user,
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// USERS FOR SIDEBAR
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: {
        $ne: req.user,
      },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};