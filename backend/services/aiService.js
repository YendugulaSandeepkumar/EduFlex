const { GoogleGenerativeAI } = require("@google/generative-ai");

// Move configuration outside the function to prevent re-initialization on every call
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use a stable 2026 model (Flash is faster/cheaper for style-based explanations)
const MODEL_NAME = "gemini-2.5-flash"; 

const STYLE_PROMPTS = {
  V: 'Explain "{topic}" using visual descriptions, diagrams, and structured bullet points.',
  A: 'Explain "{topic}" like an audio lecture in a conversational teaching style.',
  R: 'Explain "{topic}" in detailed written form with examples.',
  K: 'Explain "{topic}" using hands-on activities and real-world examples.'
};

/**
 * Generates content based on a specific learning style.
 * @param {string} topic - The subject to explain.
 * @param {'V'|'A'|'R'|'K'} style - The learning style key.
 */
exports.generateContentByStyle = async (topic, style) => {
  const promptTemplate = STYLE_PROMPTS[style];

  if (!promptTemplate) {
    throw new Error(`Invalid style provided: ${style}`);
  }

  // Inject topic into the template
  const finalPrompt = promptTemplate.replace("{topic}", topic);

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const result = await model.generateContent(finalPrompt);
    // result.response.text() is the standard way to extract the string
    return result.response.text();
    
  } catch (error) {
    // Log internal error for debugging, but throw a clean message for the UI
    console.error("GEMINI SDK ERROR:", error.message);
    throw new Error("Learning content generation failed. Please try again later.");
  }
};


exports.generateQuizQuestions = async (topic) => {
  const prompt = `
Generate 5 multiple-choice questions for the topic "${topic}".

Rules:
- Each question must have exactly 4 options
- Only one option should be correct
- Return response strictly in JSON format like below

{
  "questions": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0
    }
  ]
}
`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // IMPORTANT: Parse JSON safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);

    return JSON.parse(jsonString).questions;
  } catch (err) {
    console.error("QUIZ GEN ERROR:", err.message);
    throw new Error("Quiz generation failed");
  }
};
