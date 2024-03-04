const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signUpSchema, signInSchema, forgotPasswordSchema, resetPasswordSchema } = require('../utils/zodSchema');

const Realtor = require("../models/realtorModel");
const realtorMiddleware = require("../middleware/realtorMiddleware");
const sendEmail = require("../utils/sendEmail");

// Sign Up Route
router.post("/signup",async (req, res) => {
    try {
        // Validate request body against the schema
        const { username, email, password, cPassword } = signUpSchema.parse(req.body);

        // Password match validation
        if (password !== cPassword) {
            return res.json({ msg: "Passwords do not match" });
        }

        // Check if realtor already exists
        const existingUser = await Realtor.findOne({ email });
        if (existingUser) {
            return res.json({ msg: "Realtor already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the realtor
        const createdUser = await Realtor.create({
            username,
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = jwt.sign({ email: createdUser.email }, process.env.SECRET, { expiresIn: "1d" });
        res.cookie('token', token, { httpOnly: true });
        return res.json({ msg: "Realtor created Successfully" });
    } catch (error) {
        // If validation fails, return error message
        const message = error.errors[0].message;
        return res.json({ msg: message });
    }
});

// Sign In Route
router.post("/signin", async (req, res) => {
    try {
        // Validate request body against the schema
        const { email, password } = signInSchema.parse(req.body);

        // Basic validation
        if (!email || !password) {
            return res.json({ msg: "Please enter all fields" });
        }

        // Find realtor by email
        const existingUser = await Realtor.findOne({ email });
        if (!existingUser) {
            return res.json({ msg: "Realtor-Email already registered" });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.json({ msg: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ email: existingUser.email }, process.env.SECRET, { expiresIn: "1d" });
        res.cookie('token', token, { httpOnly: true });
        return res.json({ msg: "Signin successful" });
    } catch (error) {
        // If validation fails, return error message
        const message = error.errors[0].message;
        return res.json({ msg: message });
    }
});

// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
    try {
        // Validate request body against the schema
        const { email } = forgotPasswordSchema.parse(req.body);

        // Basic validation
        if (!email) {
            return res.json({ msg: "Please enter your registered email" });
        }

        // Find realtor by email
        const existingUser = await Realtor.findOne({ email });
        if (!existingUser) {
            return res.json({ msg: "Realtor not found" });
        }

        // Generate token
        const token = jwt.sign({ email: existingUser.email }, process.env.SECRET, { expiresIn: "1d" });
        const text = `'http://localhost:5173/admin/resetPassword/${token}`;
        const emailResult = await sendEmail(email, "Reset password", text);

        // Send email
        if (emailResult.success) {
            return res.json({ msg: "Email sent successfully" });
        } else {
            return res.json({ msg: emailResult.error });
        }
    } catch (error) {
        console.error(error);
        res.json({ msg: "Server error" });
    }
});

// Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { password, cPassword } = resetPasswordSchema.parse(req.body);

        // Decode token to get email
        const decode = jwt.verify(token, process.env.SECRET);
        const email = decode.email;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password in MongoDB
        await Realtor.findOneAndUpdate({ email }, { password: hashedPassword });

        return res.json({ msg: "Password updated" });
    } catch (error) {
        const message = error.errors[0].message;
        return res.json({ msg: message });
    }
});

// Profile Route (Protected)
router.get('/profile', realtorMiddleware, async (req, res) => {
    try {
        // Get realtor information from middleware
        const realtor = req.realtor;
        const userProfile = await Realtor.findOne({ email: realtor.email });

        // Return realtor profile
        return res.json({
            username: userProfile.username,
            email: userProfile.email,
        });
    } catch (error) {
        console.error('Error fetching realtor profile:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Logout Route
router.post("/logout", (req, res) => {
    // Clear token cookie
    res.clearCookie('token');
    return res.json({ msg: "Logged out successfully" });
});

module.exports = router;