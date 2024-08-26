const Chatbot = require('../models/Chatbot');

// Save chat interaction to the database
module.exports.saveChat = async (req, res) => {
  const { email, userMessage, apiResponse } = req.body;

  try {
    const chatInteraction = new Chatbot({
      email,
      userMessage,
      apiResponse,
      sentAt: new Date(), // Automatically set to current date and time
      sentTime: new Date().toLocaleTimeString('en-IN', { hour12: false }), // Automatically set to current time in IST
    });

    await chatInteraction.save();
    res.status(200).json({ message: 'Chat interaction saved successfully' });
  } catch (error) {
    console.error('Error saving chat interaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve chat history by email
module.exports.sendChat = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const chatHistory = await Chatbot.find({ email }).sort({ sentAt: 1 });
    res.json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports.clearChat = async (req, res) => {
  try {
    await Chatbot.deleteMany({});
    res.status(200).json({ message: 'Chatbot collection cleared successfully' });
  } catch (error) {
    console.error('Error clearing Chatbot collection:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
