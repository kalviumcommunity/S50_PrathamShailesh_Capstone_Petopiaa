const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../Model/user');
const authenticateToken = require('./authenticateToken');
require('dotenv').config();

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
      const { User_Name, Email, Password } = req.body;

      const existingUser = await userModel.findOne({ Email });
      if (existingUser) {
          return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(Password, 10);

      const newUser = await userModel.create({ User_Name, Email, Password: hashedPassword });

      const token = jwt.sign({ userId: newUser._id, username: newUser.User_Name, email: newUser.Email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

      res.status(201).json({ user: newUser, token });
  } catch (error) {
      next(error);
  }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ Email: email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.Password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id, email: user.Email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.json({ user, token });
    } catch (error) {
        next(error);
    }
});

router.get("/", authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
});

router.put("/", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { User_Name, Email, Address } = req.body;

    // Find user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data
    user.User_Name = User_Name;
    user.Email = Email;
    user.Address = Address;

    // Save updated user data
    await user.save();

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
