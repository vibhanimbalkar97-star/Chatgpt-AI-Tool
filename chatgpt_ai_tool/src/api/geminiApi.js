import axios from "axios";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
 const API_KEY = "AIzaSyDUtF9tOQKynRWW1_JZeHltGhnxvzzRDZ4";


//  create an axios instance
const geminiInstance = axios.create({
    baseURL: API_URL,
    params: { key: API_KEY },
});

// Function to get Gemini response
export const generateGeminiResponse = async (promptText) => {
  try {
    const res = await geminiInstance.post("", {
      contents: [
        {
          parts: [{ text: promptText }],
        },
      ],
    });
  
    
    // Extract text from the response 
    let dataString = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());
    // console.log(dataString)
    return (
      dataString || "No response generated."
    );
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    throw err;
  }
  
};