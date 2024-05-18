const express = require("express");
const router = express.Router();
const Conversation = require("../Model/chat");

router.post("/", async (req, res) => {
  try {
    const { participants, messages } = req.body;

    const sortedParticipants = [...participants].sort();

    const existingConversation = await Conversation.findOne({
      $or: [
        { participants: sortedParticipants },
        { participants: sortedParticipants.reverse() },
      ],
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const conversation = new Conversation({
      participants: sortedParticipants,
      messages: messages || [],
    });

    await conversation.save();

    return res.status(201).json(conversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/", async (req, res) => {
  try {
    const { participants, messages } = req.body;

    // Find the conversation by its participants
    const conversation = await Conversation.findOne({
      participants: { $all: participants },
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Update the messages field of the conversation
    conversation.messages = messages;

    // Save the updated conversation to the database
    await conversation.save();

    // Return success response with the updated conversation
    return res.status(200).json(conversation);
  } catch (error) {
    // Handle errors
    console.error("Error updating conversation messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    // Retrieve all conversations from the database
    const conversations = await Conversation.find();
    // Return the conversations as a JSON response
    return res.status(200).json(conversations);
  } catch (error) {
    // Handle errors
    console.error("Error retrieving conversations:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
