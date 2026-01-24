const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate topic content using GenAI
 * @param {string} topic
 * @param {string} style - V | A | R | K
 */
exports.generateContentByStyle = async (topic, style) => {
  const stylePromptMap = {
    V: `Explain "${topic}" using diagrams, flowcharts, and visual explanations.`,
    A: `Explain "${topic}" like an audio lecture, conversational and clear.`,
    R: `Explain "${topic}" in detailed textual form with examples.`,
    K: `Explain "${topic}" using hands-on activities and real-world examples.`
  };

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an expert educational content creator."
      },
      {
        role: "user",
        content: stylePromptMap[style]
      }
    ],
    temperature: 0.7
  });

  return response.choices[0].message.content;
};
