const Topic = require("../models/Topic");
const { generateContentByStyle } = require("../services/aiService");

// ADMIN: Create Topic
exports.createTopic = async (req, res) => {
  const { title, description } = req.body;

  try {
    const topic = await Topic.create({ title, description });
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LEARNER: Start Topic
exports.startTopic = async (req, res) => {
  const { topicId, style } = req.body;

  try {
    const topic = await Topic.findById(topicId);
    if (!topic)
      return res.status(404).json({ message: "Topic not found" });

    // If content already exists, reuse it
    if (topic.contents && topic.contents[style]) {
      return res.json({
        topic: topic.title,
        style,
        content: topic.contents[style]
      });
    }

    // Generate content using GenAI
    const generatedContent = await generateContentByStyle(
      topic.title,
      style
    );

    topic.contents = {
      ...topic.contents,
      [style]: generatedContent
    };

    await topic.save();

    res.json({
      topic: topic.title,
      style,
      content: generatedContent
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({}, "title description");
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

