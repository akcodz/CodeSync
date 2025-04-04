import { generateContent } from "../services/ai.service.js"

export const getReview = async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).send("code is required");
    }

    const response = await generateContent(code);
    return res.send(response);
  } catch (error) {
    return res.status(500).send("Error processing request");
  }
};
