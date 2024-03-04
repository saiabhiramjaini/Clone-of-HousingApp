const express = require("express");
const router = express.Router();

const cloudinary = require("../utils/cloudinary");
const Properties = require("../models/propertyModel");
const Realtor = require("../models/realtorModel");
const User = require("../models/userModel")
const realtorMiddleware = require("../middleware/realtorMiddleware");

router.post("/uploadProperty", realtorMiddleware, async (req, res) => {
  const { image, title, description, location, city, state, price, dimensions, realtorMobile, realtorEmail } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image);
      const uploaderEmail = req.realtor.email;
      if (uploadRes) {
        const property = new Properties({
          image: uploadRes.url,
          title,
          description,
          location,
          city,
          state,
          price,
          dimensions,
          realtorEmail: uploaderEmail,
          realtorMobile,
        });

        await property.save();

        const realtorDocs = await Realtor.findOne({ email: uploaderEmail });
        realtorDocs.properties.push(property);
        await realtorDocs.save();

        // Update the notifications array for all users with the same location
        await User.updateMany(
          { location },
          { $push: { notifications: {
            "notification": "A new property has been listed near you",
            "propertyId": property._id,
            "timeStamp": new Date(),
            "status": false
          }, } }
        );

        res.status(200).json({ msg: "Property uploaded successfully" });
      } else {
        res.json({ msg: "Error uploading image" });
      }
    } else {
      res.json({ msg: "Image data is required" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});
  

router.get("/getAllProperties", async (req, res) => {
    try {
        const allProperties = await Properties.find();
        res.json(allProperties);
    } catch (error) {
        console.error("Error getting all properties:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/getProperty/:propertyId", async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await Properties.findById(propertyId);
    if (!property) {
      return res.json({ msg: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error("Error getting property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;