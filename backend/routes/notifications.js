const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/userModel");

router.get("/getNotifications",  async (req, res) => {
    const user = "abhiramjaini28@gmail.com"; // Assuming you're using a fixed user email for testing purposes
    try {
        const userDoc = await User.findOne({ email: user });
        if (userDoc) {
            const notifications = userDoc.notifications;
            return res.json({ notifications });
        } else {
            return res.json({ msg: "User not found" });
        }
    } catch (e) {
        console.log(e);
        return res.json({ msg: "Internal server error" });
    }
});


router.post("/addNotifications",  async (req, res) => {
    const user = "abhiramjaini28@gmail.com";
    try {
        const { notification } = req.body;
        const userDoc = await User.findOne({ email: user });
        if (userDoc) {
            userDoc.notifications.push({ notification, status: false });
            await userDoc.save(); 
            return res.json({ msg: "Notification added successfully" });
        } else {
            return res.json({ msg: "User not found" });
        }
    } catch (e) {
        console.log(e);
        return res.json({ msg: "Internal server error" });
    }
});

router.post("/markAllAsRead", async (req, res) => {
    const user = "abhiramjaini28@gmail.com";
    try {
        const userDoc = await User.findOne({ email: user });
        if (userDoc) {
            const updatedNotifications = userDoc.notifications.map(notification => ({
                ...notification,
                status: true,
            }));

            await User.updateOne(
                { email: user },
                { $set: { notifications: updatedNotifications } }
            );

            const updatedUserDoc = await User.findOne({ email: user });
            return res.json({ msg: updatedUserDoc });
        } else {
            return res.json({ msg: "User not found" });
        }
    } catch (e) {
        console.log(e);
        return res.json({ msg: "Internal server error" });
    }
});


module.exports = router;
