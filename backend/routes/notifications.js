const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const User = require("../models/userModel");

router.get("/getNotifications",  userMiddleware, async (req, res) => {
    const user = req.user.email; 
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


router.post("/addNotifications",  userMiddleware, async (req, res) => {
    const user = req.user.email;
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

router.post("/markAllAsRead", userMiddleware,async (req, res) => {
    const user = req.user.email;
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
