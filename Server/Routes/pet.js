const express = require('express');
const petModel = require("../Model/pet");
const userModel = require("../Model/user"); 

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
      const { userId, ...petData } = req.body;

      // Validate userId
      if (!userId) {
          return res.status(400).json({ message: 'userId is required' });
      }

      // Create a new pet
      const newPet = await petModel.create({ ...petData, userId });

      // Find the user and update their posts
      const user = await userModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.posts.push(newPet._id);
      await user.save();

      res.status(201).json(newPet);
  } catch (error) {
      if (error.name === 'ValidationError') {
          return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

 
router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.filter; 
    let query = {};

    if (filter && filter !== "All") {
      query = { species: filter };
    }

    const data = await petModel.find(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
