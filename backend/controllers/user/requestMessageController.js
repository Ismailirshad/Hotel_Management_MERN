import RequestMessage from "../../schema/requestMessageSchema.js";

export const createRequestMessage = async (req, res) => {
  try {
    const userId = req.user._id; // logged-in user
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const newRequest = await RequestMessage.create({
      user: userId,
      message,
    });

    return res.status(201).json({
      message: "Request sent successfully",
      request: newRequest,
    });
  } catch (error) {
    console.log("Error in createRequest controller", error);
    return res.status(500).json({ message: "Failed to send request" });
  }
};