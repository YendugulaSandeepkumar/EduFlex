const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const models = await genAI.listModels();

    models.models.forEach((model) => {
      console.log("MODEL:", model.name);
      console.log("  Supported methods:", model.supportedGenerationMethods);
      console.log("----------------------------------");
    });
  } catch (err) {
    console.error("ERROR listing models:", err.message);
  }
}

listModels();
