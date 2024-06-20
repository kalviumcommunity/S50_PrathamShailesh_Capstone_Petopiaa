const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi'); 
const userModel = require('../Model/user');
const authenticateToken = require('./authenticateToken');
require('dotenv').config();

const router = express.Router();

const signupSchema = Joi.object({
    User_Name: Joi.string().required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().required(),
    ConfirmPassword: Joi.string().valid(Joi.ref('Password')).required().strict()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

router.post('/signup', async (req, res, next) => {
    try {
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { User_Name, Email, Password } = req.body;

        const existingUser = await userModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await userModel.create({ User_Name, Email, Password: hashedPassword });

        const token = jwt.sign({ userId: newUser._id,
             username: newUser.User_Name,
              email: newUser.Email }, 
             "process.env.JWT_SECRET_KEY", { expiresIn: '8h' });

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json(err);
    }
});


router.post('/login', async (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

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

        const token = jwt.sign({ userId: user._id, email: user.Email }, "process.env.JWT_SECRET_KEY", { expiresIn: '1h' });

        res.json({ user, token });
    } catch (error) {
        return res.status(500).json(err);
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
        return res.status(500).json(err);
    }
});

router.get("/seller/:id", authenticateToken, async (req, res, next) => {
    try {
        const sellerId = req.params.id; // Use the seller ID from the URL parameter
        const user = await userModel.findById(sellerId); // Find the seller by the seller ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        return res.status(500).json(err);
    }
});

const updateUserSchema = Joi.object({
    User_Name: Joi.string(),
    Email: Joi.string().email(),
    Address: Joi.string()
});

router.put("/", authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const { error } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { User_Name, Email, Address } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (User_Name) user.User_Name = User_Name;
        if (Email) user.Email = Email;
        if (Address) user.Address = Address;

        await user.save();

        res.json(user);
    } catch (error) {
        return res.status(500).json(err);
    }
});

module.exports = router;
