import { chatClient } from "../utils/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = chatClient.createToken(req.user._id);

     res.status(200).json({
      token,
      userId: req.user._id.toString(),
      userName: req.user.username,
    });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}