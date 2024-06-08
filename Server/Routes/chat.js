const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Conversation = require("../Model/chat");



router.post("/",  async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { participants, messages } = req.body;

    const sortedParticipants = [...participants].sort();

    const existingConversation = await Conversation.findOne({
      $or: [
        { participants: sortedParticipants },
        { participants: sortedParticipants.reverse() },
      ],
    }).session(session);

    if (existingConversation) {
      await session.commitTransaction();
      session.endSession();
      return res.status(200).json(existingConversation);
    }

    const conversation = new Conversation({
      participants: sortedParticipants,
      messages: messages || [],
    });

    await conversation.save({ session });

    await session.commitTransaction();
    session.endSession();
    return res.status(201).json(conversation);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating conversation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { participants, messages } = req.body;

    const conversation = await Conversation.findOne({
      participants: { $all: participants },
    }).session(session);
    if (!conversation) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Conversation not found" });
    }

    conversation.messages = messages;

    await conversation.save({ session });

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json(conversation);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating conversation messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const conversations = await Conversation.find();
    return res.status(200).json(conversations);
  } catch (error) {
    console.error("Error retrieving conversations:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
