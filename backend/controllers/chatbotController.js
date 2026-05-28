import { getAIResponse } from "../services/aiService.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await getAIResponse(message);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI error",
    });
  }
};